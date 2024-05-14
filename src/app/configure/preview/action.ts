'use server'

import { BASE_PRICE, PRODUCT_PRICES } from '@/constants/product'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Order } from '@prisma/client'
import { testStripe } from '@/lib/stripe'

export const createCheckoutSession = async ({ configurationId }: { configurationId: string }) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configurationId },
  })
  if (!configuration) {
    throw new Error('No such configuration found')
  }

  const { getUser } = getKindeServerSession()
  const kindeUser = await getUser()
  if (!kindeUser) {
    throw new Error('You need to be logged in')
  }
  // user id and kinde id are the same in database
  const { id: userId } = kindeUser

  const { finish, material } = configuration
  let price = BASE_PRICE
  if (finish === 'textured') price += PRODUCT_PRICES.finish.textured
  if (material === 'polycarbonate') price += PRODUCT_PRICES.material.polycarbonate

  let order: Order | undefined = undefined
  const existingOrder = await db.order.findFirst({
    where: { userId, configurationId },
  })
  if (existingOrder) {
    order = existingOrder
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId,
        configurationId,
      },
    })
  }

  // Stripe!!!
  const product = await testStripe.products.create({
    name: 'Custom iPhone Case',
    images: [configuration.imageUrl],
    default_price_data: {
      currency: 'USD',
      unit_amount: price,
    },
  })

  const stripeSession = await testStripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configurationId}`,
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['DE', 'US'] },
    metadata: { userId, orderId: order.id },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  })

  return { url: stripeSession.url }
}

// strip `pnpm add stripe`
