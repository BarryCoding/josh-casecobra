import { CenterWrapper } from '@/components/CenterWrapper'
import { PhoneCase } from '@/components/PhoneCase'
import { CheckCircleIcon, StarIcon } from 'lucide-react'

export default function Home() {
  return (
    <main className='bg-slate-50'>
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
    </main>
  )
}
