'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { BASE_PRICE } from '@/constants/product'
import { useUploadThing } from '@/lib/uploadthing'
import { base64ToBlob, cn, formatPrice } from '@/lib/utils'
import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validator/options'
import { RadioGroup } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { ArrowRightCircleIcon, CheckCircleIcon, ChevronsUpDownIcon } from 'lucide-react'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import { SaveConfigurationArgs, saveConfigurationAction } from './action'

interface CustomizeDesignProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}
export const CustomizeDesign = ({ configId, imageUrl, imageDimensions }: CustomizeDesignProps) => {
  const router = useRouter()
  const { toast } = useToast()
  // REFACTOR: designConfiguration state { color, model, material, finish }
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number]
    model: (typeof MODELS.options)[number]
    material: (typeof MATERIALS.options)[number]
    finish: (typeof FINISHES.options)[number]
  }>({
    color: COLORS[0],
    model: MODELS.options[5],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  })

  // save cropped image to uploadthing
  // size of the image
  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  })
  // position of the image
  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  })
  const phoneCaseRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { startUpload } = useUploadThing('imageUploader')

  const { mutate: submitDesign, isPending } = useMutation({
    mutationKey: ['save-config'],
    mutationFn: async (args: SaveConfigurationArgs) => {
      // upload image to uploadthing and update design configuration to db
      await Promise.all([saveConfiguration(), saveConfigurationAction(args)])
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'There was an error on our end. Please try again.',
      })
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`)
    },
  })

  async function saveConfiguration() {
    if (!phoneCaseRef.current || !containerRef.current) return
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current.getBoundingClientRect()
      const { left: containerLeft, top: containerTop } =
        containerRef.current.getBoundingClientRect()
      const leftOffset = caseLeft - containerLeft
      const topOffset = caseTop - containerTop
      // TRY: a better way to get actualX and actualY
      // the actual position of the uploaded image relative to the phone case
      const actualX = renderedPosition.x - leftOffset
      const actualY = renderedPosition.y - topOffset

      const canvas = document.createElement('canvas')
      // the size of the canvas should be the same as the phone case
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      // REFACTOR: 1 a utils function: loadImageFromUrl
      const userImage = new Image()
      userImage.crossOrigin = 'anonymous' // allow CORS to edit image
      userImage.src = imageUrl
      await new Promise((resolve) => (userImage.onload = resolve)) // wait for image to load

      // REFACTOR: 2 a utils function: drawImageToCanvas
      ctx?.drawImage(userImage, actualX, actualY, renderedDimension.width, renderedDimension.height)
      const base64 = canvas.toDataURL()
      const base64Data = base64.split(',')[1]
      const blob = base64ToBlob(base64Data, 'image/png')
      const file = new File([blob], 'filename.png', { type: 'image/png' })
      await startUpload([file], { configId })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'There was a problem saving your config, please try again.',
      })
    }
  }

  // update neon db croppedImageUrl

  return (
    <div className='relative mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3'>
      <div
        className='relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        ref={containerRef}
      >
        <div className='pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50'>
          <AspectRatio
            className='pointer-events-none relative z-50 aspect-[896/1831] w-full'
            ref={phoneCaseRef}
            ratio={896 / 1831}
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
              `bg-${options.color.tw}`, // dynamic phone case color by user choice
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
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)), // -2 to remove 'px' unit
              width: parseInt(ref.style.width.slice(0, -2)),
            })
            setRenderedPosition({ x, y }) // resize from left / top / top-left
          }}
          onDragStop={(_, { x, y }) => {
            setRenderedPosition({ x, y })
          }}
        >
          <NextImage src={imageUrl} fill alt='your image' className='pointer-events-none' />
        </Rnd>
      </div>
      <div className='col-span-full flex h-[37.5rem] w-full flex-col bg-white lg:col-span-1'>
        <ScrollArea className='relative flex-1 overflow-auto'>
          {/* fading gradient */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white'
          />
          <div className='px-8 pb-12 pt-8'>
            <h2 className='text-3xl font-bold tracking-tight'>Customize your case</h2>
            <div className='my-6 h-px w-full bg-zinc-200' />

            {/* Color Selection */}
            <div className='relative mt-4 flex h-full flex-col justify-between'>
              <div className='flex flex-col gap-6'>
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }))
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className='mt-3 flex items-center space-x-3'>
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ checked }) =>
                          cn(
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-0.5 focus:outline-none focus:ring-0 active:outline-none active:ring-0',
                            {
                              [`border-${color.tw}`]: checked,
                            },
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            'h-8 w-8 rounded-full border border-black border-opacity-10',
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                {/* Model Selection */}
                <div className='relative flex w-full flex-col gap-3'>
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' role='combobox' className='w-full justify-between'>
                        {options.model.label}
                        <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            'flex cursor-default items-center justify-between gap-1 p-1.5 text-sm hover:bg-zinc-100',
                            {
                              'bg-zinc-100': model.label === options.model.label,
                            },
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }))
                          }}
                        >
                          {model.label}
                          <CheckCircleIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              model.label === options.model.label ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Material and Finish Selection */}
                {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
                  <RadioGroup
                    key={name}
                    value={options[name]}
                    onChange={(val) => {
                      setOptions((prev) => ({
                        ...prev,
                        [name]: val,
                      }))
                    }}
                  >
                    <Label className='capitalize'>{name}</Label>
                    <div className='mt-3 space-y-4'>
                      {selectableOptions.map((option) => (
                        <RadioGroup.Option
                          key={option.value}
                          value={option}
                          className={({ checked }) =>
                            cn(
                              'relative block cursor-pointer rounded-lg border-2 border-zinc-200 bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none focus:ring-0 sm:flex sm:justify-between',
                              {
                                'border-primary': checked,
                              },
                            )
                          }
                        >
                          <span className='flex items-center'>
                            <span className='flex flex-col text-sm'>
                              <span className='font-medium text-gray-900'>{option.label}</span>

                              {option.description && (
                                <span className='block text-gray-500 sm:inline'>
                                  {option.description}
                                </span>
                              )}
                            </span>
                          </span>

                          <span className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
                            <span className='font-medium text-gray-900'>
                              {formatPrice(option.price / 100)}
                            </span>
                          </span>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className='h-16 w-full bg-white px-8'>
          <div className='h-px w-full bg-zinc-200' />
          <div className='flex h-full w-full items-center justify-end gap-6'>
            <p className='whitespace-nowrap font-medium'>
              {formatPrice((BASE_PRICE + options.finish.price + options.material.price) / 100)}
            </p>
            <Button
              className='w-full'
              // isLoading={isPending}
              disabled={isPending}
              onClick={() =>
                submitDesign({
                  configId,
                  color: options.color.value,
                  finish: options.finish.value,
                  material: options.material.value,
                  model: options.model.value,
                })
              }
            >
              Continue
              <ArrowRightCircleIcon className='ml-3 inline h-6 w-6' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const CornerComponent = () => {
  return (
    <div className='h-5 w-5 rounded-full border border-zinc-200 bg-white/50 shadow transition hover:bg-primary' />
  )
}

// NOTES:
// 0 pointer-events-none is useful to make a image as a background
// 1 tailwind: aspect-[896/1831]
// 2 shadcn: `pnpm dlx shadcn-ui@latest add aspect-ratio`
// 3 LEARN: Next Image 1.fill 2.whitelist
// 4 react-rnd: `pnpm add react-rnd`
// 5 shadcn: `pnpm dlx shadcn-ui@latest add scroll-area`
// 6 headlessui: `pnpm add @headlessui/react`
// 7 shadcn: `pnpm dlx shadcn-ui@latest add label`
// 8 shadcn: `pnpm dlx shadcn-ui@latest add dropdown-menu`
// 9 BEST: use border-box in global.css to get rid of all `div border`
// 10 API: getBoundingClientRect
// 11 How to get the relative position of 2 containers
// 12 react-query: `pnpm add @tanstack/react-query`
// 13 Promise.all: `await Promise.all([promiseFn1(), promiseFn2(args)])`

// LEARN: how to crop image by canvas: 1. how to draw, 2. after drawing turn canvas into image file

// TODO:
// 1. make the width a fixed standard: the width of the template phone image
// 2. get rid of unnecessary div and css: aspect-[896/1831] z-index and so on
// 3. combine the size and position states of image into one
