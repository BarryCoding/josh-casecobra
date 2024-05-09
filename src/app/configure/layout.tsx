import { CenterWrapper } from '@/components/CenterWrapper'
import { ConfigureSteps } from '@/components/ConfigureSteps'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CenterWrapper className='flex flex-1 flex-col'>
      <ConfigureSteps />
      {children}
    </CenterWrapper>
  )
}
