'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'

interface CustomizeDesignProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}
export const CustomizeDesign = ({ configId, imageUrl, imageDimensions }: CustomizeDesignProps) => {
  // REFACTOR: get rid of unnecessary div and css: aspect-[896/1831] z-index and so on
  return (
    <div className='relative my-20 grid grid-cols-1 pb-20 lg:grid-cols-3'>
      <div className='relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
        <div className='pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50'>
          <AspectRatio
            // ref={phoneCaseRef}
            ratio={896 / 1831}
            className='pointer-events-none relative z-50 aspect-[896/1831] w-full'
          >
            <NextImage
              className='pointer-events-none select-none'
              fill
              src='/phone-template.png'
              alt='phone image'
            />
          </AspectRatio>
          {/* grey bg contract with the phone image */}
          <div className='absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
          <div
            className={cn(
              'absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]',
              `bg-[#4e525b]`,
              // `bg-${options.color.tw}`, // TODO: dynamic phone case color by user choice
            )}
          />
        </div>

        <Rnd
          className='z-20 border-[3px] border-primary'
          lockAspectRatio
          default={{
            x: 150,
            y: 205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          resizeHandleComponent={{
            bottomRight: <CornerComponent />,
            bottomLeft: <CornerComponent />,
            topRight: <CornerComponent />,
            topLeft: <CornerComponent />,
          }}
        >
          <NextImage src={imageUrl} fill alt='your image' className='pointer-events-none' />
        </Rnd>
      </div>
    </div>
  )
}

const CornerComponent = () => {
  return (
    <div className='h-5 w-5 rounded-full border border-zinc-200 bg-white shadow transition hover:bg-primary' />
  )
}

// NOTES:
// 1 tailwind: aspect-[896/1831]
// 2 shadcn: `pnpm dlx shadcn-ui@latest add aspect-ratio`
// 3 LEARN: Next Image 1.fill 2.whitelist
// 4 react-rnd: `pnpm add react-rnd`
