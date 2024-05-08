'use client'

import { PHONE_CASE_IMAGES } from '@/constants'
import { cn, splitArrayIntoParts } from '@/lib/utils'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ReviewColumn } from './ReviewColumn'

export const ReviewGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.4 })

  // REFACTOR: is it too complicated?
  // REFACTOR: just prepare data for different screen sizes
  // REFACTOR: {phoneList, mdList, lgList}
  const columns = splitArrayIntoParts(PHONE_CASE_IMAGES, 3)
  const column1 = columns[0]
  const column2 = columns[1]
  const column3 = splitArrayIntoParts(columns[2], 2)

  return (
    // grid-cols-1 -> md:grid-cols-2 -> lg:grid-cols-3
    <div
      ref={containerRef}
      className='grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3'
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              cn({
                'md:hidden': reviewIndex >= column1.length + column3[0].length, // md: SHOW [0,1,2]
                'lg:hidden': reviewIndex >= column1.length, //lg: SHOW [0,1]
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className='hidden md:block'
            reviewClassName={(reviewIndex) => (reviewIndex >= column2.length ? 'lg:hidden' : '')}
            msPerPixel={15}
          />
          <ReviewColumn reviews={column3.flat()} className='hidden md:block' msPerPixel={10} />
        </>
      )}
    </div>
  )
}
