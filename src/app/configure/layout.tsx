import { CenterWrapper } from '@/components/CenterWrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CenterWrapper className='flex flex-1 flex-col'>{children}</CenterWrapper>
}
