import { cn } from '@/lib/utils'

interface CenterWrapperProps {
  children: React.ReactNode
  className?: string
}

export const CenterWrapper = ({ children, className }: CenterWrapperProps) => {
  return <div className={cn('mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20', className)}>{children}</div>
}
