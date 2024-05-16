import { cn } from '@/lib/utils'
import type { CaseColor } from '@prisma/client'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { useEffect, useRef, useState } from 'react'

export const PhonePreview = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string
  color: CaseColor
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  })

  const handleResize = () => {
    if (!ref.current) return
    const { width, height } = ref.current.getBoundingClientRect()
    setRenderedDimensions({ width, height })
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // REFACTOR: WITH THE validator
  let caseBackgroundColor = 'bg-zinc-900'
  if (color === 'blue') caseBackgroundColor = 'bg-blue-950'
  if (color === 'rose') caseBackgroundColor = 'bg-rose-950'

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className='relative'>
      {/* positioning the phone image */}
      <div
        className='absolute z-20 scale-[1.0352]'
        style={{
          left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <img
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            'phone-skew relative z-20 rounded-b-[10px] rounded-t-[15px] md:rounded-b-[20px] md:rounded-t-[30px]',
            caseBackgroundColor,
          )}
          src={croppedImageUrl}
          alt='cropped phone image'
        />
      </div>

      <div className='relative z-40 h-full w-full'>
        <img
          alt='hold phone'
          src='/hold-phone.png'
          className='pointer-events-none h-full w-full rounded-md antialiased'
        />
      </div>
    </AspectRatio>
  )
}

// LEARN: phone-skew
