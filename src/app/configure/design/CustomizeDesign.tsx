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
import { BASE_PRICE } from '@/constants/product'
import { cn, formatPrice } from '@/lib/utils'
import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validator/options'
import { RadioGroup } from '@headlessui/react'
import { ArrowRightCircleIcon, CheckCircleIcon, ChevronsUpDownIcon } from 'lucide-react'
import NextImage from 'next/image'
import { useState } from 'react'
import { Rnd } from 'react-rnd'

interface CustomizeDesignProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}
export const CustomizeDesign = ({ configId, imageUrl, imageDimensions }: CustomizeDesignProps) => {
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
  // REFACTOR: get rid of unnecessary div and css: aspect-[896/1831] z-index and so on
  return (
    <div className='relative mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3'>
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
            <Button className='w-full'>
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
    <div className='h-5 w-5 rounded-full border border-zinc-200 bg-white shadow transition hover:bg-primary' />
  )
}

// NOTES:
// 1 tailwind: aspect-[896/1831]
// 2 shadcn: `pnpm dlx shadcn-ui@latest add aspect-ratio`
// 3 LEARN: Next Image 1.fill 2.whitelist
// 4 react-rnd: `pnpm add react-rnd`
// 5 shadcn: `pnpm dlx shadcn-ui@latest add scroll-area`
// 6 headlessui: `pnpm add @headlessui/react`
// 7 shadcn: `pnpm dlx shadcn-ui@latest add label`
// 8 shadcn: `pnpm dlx shadcn-ui@latest add dropdown-menu`
// 9 BEST: use border-box in global.css to get rid of all `div border`
