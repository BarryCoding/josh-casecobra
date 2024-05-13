import { CenterWrapper } from '@/components/CenterWrapper'
import { Icons } from '@/components/Icons'
import { PhoneCase } from '@/components/PhoneCase'
import { ReviewGrid } from '@/components/reviews/ReviewGrid'
import { buttonVariants } from '@/components/ui/button'
import { CheckCheckIcon, CheckCircleIcon, StarIcon, SwitchCameraIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
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
      <section className='grainy-dark bg-slate-100  py-24'>
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

      {/* another marketing section */}
      <section>
        <CenterWrapper className='flex flex-col items-center gap-y-12 py-24'>
          <div className='px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl'>
                Upload your photo and get{' '}
                <span className='relative bg-green-600 px-2 text-white'>your own case</span> now
              </h2>
            </div>
          </div>

          <div className='max-w-6xl px-6 lg:px-8'>
            <div className='relative flex grid-cols-2 flex-col items-center gap-40 md:grid'>
              <div className='relative h-80 w-full max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 md:h-full md:justify-self-end lg:rounded-2xl'>
                <img
                  src='/horse.jpg'
                  className='pointer-events-none h-full w-full select-none rounded-md bg-white object-cover shadow-2xl ring-1 ring-gray-900/10'
                  alt='horse'
                />
              </div>
              <img
                src='/arrow.png'
                className='absolute left-1/2 top-[25rem] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 select-none md:top-1/2 md:rotate-0'
                alt='arrow'
              />
              <PhoneCase className='w-60' imgSrc='/horse_phone.jpg' />
            </div>
          </div>

          <ul className='max-w-prose space-y-2 sm:text-lg'>
            <li>
              <CheckCircleIcon className='mr-1.5 inline h-5 w-5 text-green-600' />
              High-quality silicone material
            </li>
            <li>
              <CheckCircleIcon className='mr-1.5 inline h-5 w-5 text-green-600' />
              Scratch and fingerprint resistant coating
            </li>
            <li>
              <CheckCircleIcon className='mr-1.5 inline h-5 w-5 text-green-600' />
              Wireless charging compatible
            </li>
            <li>
              <CheckCircleIcon className='mr-1.5 inline h-5 w-5 text-green-600' />5 year print
              warranty
            </li>
          </ul>

          <Link
            className={buttonVariants({ size: 'lg', className: 'w-60' })}
            href='/configure/upload'
          >
            Create your case now <SwitchCameraIcon className='ml-2 h-5 w-5' />
          </Link>
        </CenterWrapper>
      </section>
    </>
  )
}
