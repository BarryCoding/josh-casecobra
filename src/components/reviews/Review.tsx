import { cn, getRandomItem } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { PhoneCase } from '../PhoneCase'
import { POSSIBLE_ANIMATION_DELAYS } from '@/constants'

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
}

export const Review = ({ imgSrc, className, ...props }: ReviewProps) => {
  const animationDelay = getRandomItem(POSSIBLE_ANIMATION_DELAYS)
  return (
    // REFACTOR: get rid of div wrapper?
    // REFACTOR: or use framer motion for cooler animation?
    <div
      className={cn(
        'animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5',
        className,
      )}
      // CHECK: is style animationDelay overwritten?
      style={{ animationDelay }}
      {...props}
    >
      <PhoneCase imgSrc={imgSrc} />
    </div>
  )
}
