import { db } from '@/db'
import { testStripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.text()

    const signature = headers().get('stripe-signature')
    if (!signature) {
      return new Response('Invalid signature', { status: 400 })
    }
    const event = testStripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )

    // the stripe event checked from the stripe webhook page
    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email')
      }

      // const session = event.data.object as Stripe.Checkout.Session
      const session = event.data.object

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      }

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata')
      }

      const billingAddress = session.customer_details!.address
      const shippingAddress = session.shipping_details!.address

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            },
          },
        },
      })
    }

    return NextResponse.json({ result: event, ok: true })
  } catch (err) {
    console.log(`🔎 🔍 ~ POST ~ err:`, err)
    return NextResponse.json({ message: 'Something went wrong', ok: false }, { status: 500 })
  }
}

// to get my STRIPE_WEBHOOK_SECRET, deploy to vercel to prepare my url for webhook endpoint
