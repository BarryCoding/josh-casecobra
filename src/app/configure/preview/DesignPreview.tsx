'use client'
import { PhoneCase } from '@/components/PhoneCase'
import { Button } from '@/components/ui/button'
import { BASE_PRICE, PRODUCT_PRICES } from '@/constants/product'
import { cn, formatPrice } from '@/lib/utils'
import { COLORS, MODELS } from '@/validator/options'
import { Configuration } from '@prisma/client'
import { ArrowRightCircleIcon, CheckCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'

export const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const { id: configId, color, model, finish, material } = configuration
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  useEffect(() => setShowConfetti(true), [])

  const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw
  const { label: modelLabel } = MODELS.options.find(({ value }) => value === model)!
  let totalPrice = BASE_PRICE
  if (material === 'polycarbonate') totalPrice += PRODUCT_PRICES.material.polycarbonate
  if (finish === 'textured') totalPrice += PRODUCT_PRICES.finish.textured
  return (
    <>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 flex select-none justify-center overflow-hidden'
      >
        <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />1
      </div>

      <div className='mt-20 flex flex-col items-center text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:grid md:gap-x-8 lg:gap-x-12'>
        <div className='md:col-span-4 md:row-span-2 md:row-end-2 lg:col-span-3'>
          <PhoneCase
            className={cn(`bg-${tw}`, 'max-w-[150px] md:max-w-full')}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>
        <div className='mt-6 sm:col-span-9 md:row-end-1'>
          <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
            Your {modelLabel} Case
          </h3>
          <div className='mt-3 flex items-center gap-1.5 text-base'>
            <CheckCircleIcon className='h-4 w-4 text-green-500' />
            In stock and ready to ship
          </div>
        </div>

        <div className='text-base sm:col-span-12 md:col-span-9'>
          <div
            className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8
            sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'
          >
            <div>
              <p className='font-medium text-zinc-950'>Highlights</p>
              <ol className='mt-3 list-inside list-disc text-zinc-700'>
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className='font-medium text-zinc-950'>Materials</p>
              <ol className='mt-3 list-inside list-disc text-zinc-700'>
                <li>High-quality, durable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div className='mt-8'>
            <div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8'>
              <div className='flow-root text-sm'>
                <div className='mt-2 flex items-center justify-between py-1'>
                  <p className='text-gray-600'>Base price</p>
                  <p className='font-medium text-gray-900'>{formatPrice(BASE_PRICE / 100)}</p>
                </div>

                {finish === 'textured' && (
                  <div className='mt-2 flex items-center justify-between py-1'>
                    <p className='text-gray-600'>Textured finish</p>
                    <p className='font-medium text-gray-900'>
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                )}

                {material === 'polycarbonate' && (
                  <div className='mt-2 flex items-center justify-between py-1'>
                    <p className='text-gray-600'>Soft polycarbonate material</p>
                    <p className='font-medium text-gray-900'>
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                )}

                <div className='my-2 h-px bg-gray-200' />

                <div className='flex items-center justify-between py-2'>
                  <p className='font-semibold text-gray-900'>Order total</p>
                  <p className='font-semibold text-gray-900'>{formatPrice(totalPrice / 100)}</p>
                </div>
              </div>
            </div>
            <div className='mt-8 flex justify-end pb-12'>
              <Button className='px-4 sm:px-6 lg:px-8'>
                Check out <ArrowRightCircleIcon className='ml-1.5 inline h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// `pnpm add react-dom-confetti`
