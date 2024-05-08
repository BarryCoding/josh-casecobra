'use client'

import { cn } from '@/lib/utils'
import { Review } from './Review'
import { useRef, useState, useEffect } from 'react'

interface ReviewColumnProps {
  reviews: string[]
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}

// REFACTOR: vertical marquee logic
export const ReviewColumn = ({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: ReviewColumnProps) => {
  const columnRef = useRef<HTMLDivElement | null>(null)
  const [columnHeight, setColumnHeight] = useState(0)
  const duration = `${columnHeight * msPerPixel}ms`
  const style = { '--marquee-duration': duration } as React.CSSProperties

  // listen to window resize and update the column height
  useEffect(() => {
    if (!columnRef.current) return
    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })
    resizeObserver.observe(columnRef.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div ref={columnRef} className={cn('animate-marquee space-y-8 py-4', className)} style={style}>
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  )
}
