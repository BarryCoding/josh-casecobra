import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface PhoneCaseProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  dark?: boolean
}

export const PhoneCase = ({ imgSrc, className, dark = false, ...props }: PhoneCaseProps) => {
  return (
    <div className={cn('pointer-events-none relative overflow-hidden', className)} {...props}>
      <img
        src={dark ? '/phone-template-dark-edges.png' : '/phone-template-white-edges.png'}
        className='pointer-events-none relative z-10 select-none'
        alt='template phone image'
      />
      <img
        src={imgSrc}
        className='absolute inset-0 min-h-full min-w-full select-none object-cover'
        alt='overlaying phone image'
      />
    </div>
  )
}

/**
 * className
 * pointer-events-none, select-none
 *
 * z-index
 * relative with default z-0
 *
 */
