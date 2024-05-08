import { CenterWrapper } from '@/components/CenterWrapper'
import { Icons } from '@/components/Icons'
import { PhoneCase } from '@/components/PhoneCase'
import { ReviewGrid } from '@/components/reviews/ReviewGrid'
import { CheckCheckIcon, CheckCircleIcon, StarIcon } from 'lucide-react'

export default function Home() {
  return (
    <main className='bg-slate-50'>
      {/* hero section */}
      <section>
        {/* phone ~ sm ~ lg ~ xl */}
        <CenterWrapper className='pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32'>
          <div className='px-6 lg:col-span-2 lg:px-0 lg:pt-4'>
            <div className='relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left'>
              <div className='absolute -top-20 left-0 hidden w-28 lg:flex'>
                <div className='absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-50 via-slate-50/50' />
                <img src='/snake-1.png' alt='snake' />
                {/* TODO: compare img with Image */}
              </div>
              <h1 className='relative mt-16 w-fit text-balance text-5xl font-bold !leading-tight tracking-tighter text-gray-900 md:text-6xl lg:text-7xl'>
                Your Image on a <span className='bg-green-600 px-2 text-white'>Custom</span> Phone
                Case
              </h1>
              <p className='mt-8 max-w-prose text-balance text-center text-lg lg:text-wrap lg:pr-10 lg:text-left'>
                Capture your favorite memories with you own,{' '}
                <span className='font-semibold'>one-of-one</span> phone case. CaseCobra allows you
                to protect your memories, not just your phone case.
              </p>

              <ul className='mt-8 flex flex-col space-y-2 text-left font-medium'>
                <li className='flex items-center gap-1.5 text-left'>
                  <CheckCircleIcon className='h-5 w-5 shrink-0 text-green-600' />
                  High-quality, durable material
                </li>
                <li className='flex items-center gap-1.5 text-left'>
                  <CheckCircleIcon className='h-5 w-5 shrink-0 text-green-600' />5 year print
                  guarantee
                </li>
                <li className='flex items-center gap-1.5 text-left'>
                  <CheckCircleIcon className='h-5 w-5 shrink-0 text-green-600' />
                  Modern iPhone models supported
                </li>
              </ul>

              <div className='mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start'>
                <div className='flex -space-x-4'>
                  {/* TODO: Image */}
                  <img
                    className='h-10 w-10 rounded-full object-cover ring-2 ring-slate-100'
                    src='/users/user-1.png'
                    alt='user image'
                  />
                  <img
                    className='h-10 w-10 rounded-full object-cover ring-2 ring-slate-100'
                    src='/users/user-2.png'
                    alt='user image'
                  />
                  <img
                    className='h-10 w-10 rounded-full object-cover ring-2 ring-slate-100'
                    src='/users/user-3.png'
                    alt='user image'
                  />
                  <img
                    className='h-10 w-10 rounded-full object-cover ring-2 ring-slate-100'
                    src='/users/user-4.jpg'
                    alt='user image'
                  />
                  <img
                    className='h-10 w-10 rounded-full object-cover ring-2 ring-slate-100'
                    src='/users/user-5.jpg'
                    alt='user image'
                  />
                </div>
                <div className='flex flex-col items-center justify-between sm:items-start'>
                  <div className='flex gap-0.5'>
                    <StarIcon className='h-4 w-4 fill-green-600 text-green-600' />
                    <StarIcon className='h-4 w-4 fill-green-600 text-green-600' />
                    <StarIcon className='h-4 w-4 fill-green-600 text-green-600' />
                    <StarIcon className='h-4 w-4 fill-green-600 text-green-600' />
                    <StarIcon className='h-4 w-4 fill-green-600 text-green-600' />
                  </div>
                  <p>
                    <span className='font-semibold'>1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20'>
            <div className='relative md:max-w-xl'>
              <img
                src='/your-image.png'
                className='absolute -top-20 left-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block'
                alt='your image'
              />
              <PhoneCase className='w-64' imgSrc='/testimonials/1.jpg' />
              <img
                src='/line.png'
                className='absolute -bottom-6 -left-6 w-20 select-none'
                alt='line'
              />
            </div>
          </div>
        </CenterWrapper>
      </section>

      {/* customers reviews section */}
      <section className='bg-slate-100 py-24'>
        <CenterWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
          <div className='flex flex-col items-center gap-4 sm:gap-6 lg:flex-row'>
            <h2 className='order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl'>
              What our{' '}
              <span className='relative'>
                customers
                <Icons.underline className='pointer-events-none absolute inset-x-0 -bottom-6 hidden text-green-500 sm:block' />
              </span>{' '}
              say
            </h2>
            <img src='/snake-2.png' className='order-0 w-24 lg:order-2' alt='snake-2' />
          </div>

          <div className='mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
            {/* 1st customer review */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='mb-2 flex gap-0.5'>
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  &ldquo;The case feels durable and I even got a compliment on the design. Had the
                  case for two and a half months now and{' '}
                  <span className='bg-slate-800 p-0.5 text-white'>the image is super clear</span>,
                  on the case I had before, the image started fading into yellow-ish color after a
                  couple weeks. Love it.&rdquo;
                </p>
              </div>
              <div className='mt-2 flex gap-4'>
                <img
                  className='h-12 w-12 rounded-full object-cover'
                  src='/users/user-1.png'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Robot AI 1</p>
                  <div className='flex items-center gap-1.5'>
                    <CheckCheckIcon className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm text-zinc-600'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
            {/* 2nd customer review */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='mb-2 flex gap-0.5'>
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
                <StarIcon className='h-5 w-5 fill-green-600 text-green-600' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  &ldquo;I usually keep my phone together with my keys in my pocket and that led to
                  some pretty heavy scratch marks on all of my last phone cases. This one, besides a
                  barely noticeable scratch on the corner,{' '}
                  <span className='bg-slate-800 p-0.5 text-white'>
                    looks brand new after about half a year
                  </span>
                  . I dig it.&rdquo;
                </p>
              </div>
              <div className='mt-2 flex gap-4'>
                <img
                  className='h-12 w-12 rounded-full object-cover'
                  src='/users/user-4.jpg'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Robot AI 2</p>
                  <div className='flex items-center gap-1.5 '>
                    <CheckCheckIcon className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm text-zinc-600'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CenterWrapper>

        <CenterWrapper className='relative mt-16 max-w-5xl'>
          <img
            aria-hidden='true'
            src='/what-people-are-buying.png'
            className='absolute -left-32 top-1/3 hidden select-none xl:block'
            alt='what people are buying'
          />
          {/* blur effect */}
          <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-slate-100' />
          <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-slate-100' />

          <ReviewGrid />
        </CenterWrapper>
      </section>
    </main>
  )
}
