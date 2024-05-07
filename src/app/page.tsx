import { CenterWrapper } from '@/components/CenterWrapper'

export default function Home() {
  return (
    <main className='bg-slate-50'>
      <section>
        {/* phone ~ sm ~ lg ~ xl */}
        <CenterWrapper className='pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32'>
          Hero
        </CenterWrapper>
      </section>
    </main>
  )
}
