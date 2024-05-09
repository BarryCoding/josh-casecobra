'use client'

import { CONFIGURE_STEPS } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Icons } from './Icons'

export const ConfigureSteps = () => {
  const pathname = usePathname()
  const currentStepIndex = CONFIGURE_STEPS.findIndex((s) => pathname.endsWith(s.url))

  return (
    <ol className='rounded-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200'>
      {CONFIGURE_STEPS.map(({ description, name, url }, index) => {
        const isCurrent = index === currentStepIndex
        const isCompleted = index < currentStepIndex
        const imgPath = `/snake-${index + 1}.png`

        return (
          <li key={url} className='relative overflow-hidden lg:flex-1'>
            {/* REFACTOR: use border */}
            <span
              className={cn(
                'absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                { 'bg-zinc-700': isCurrent, 'bg-primary': isCompleted },
              )}
              aria-hidden='true' // visually hidden: for screen readers
            />

            <div
              className={cn(
                index !== 0 ? 'lg:pl-9' : '',
                'flex items-center gap-x-4 px-6 py-4 text-sm font-medium',
              )}
            >
              <img
                src={imgPath}
                className={cn('flex h-20 w-20 items-center justify-center object-contain', {
                  'border-none': isCompleted,
                  'border-zinc-700': isCurrent,
                })}
                alt={name}
              />
              <div className='h-full min-w-0 flex-1'>
                <p
                  className={cn('text-sm font-semibold text-zinc-700', {
                    'text-primary': isCompleted,
                    'text-zinc-700': isCurrent,
                  })}
                >
                  {name}
                </p>
                <p className='text-sm text-zinc-500'>{description}</p>
              </div>
            </div>

            {index !== 0 && (
              <Icons.stepSeparator className='absolute inset-0 hidden h-full w-3 text-gray-300 lg:block' />
            )}
          </li>
        )
      })}
    </ol>
  )
}
