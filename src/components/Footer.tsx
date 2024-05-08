import { CenterWrapper } from './CenterWrapper'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='h-20 border-t border-gray-200 bg-white'>
      <CenterWrapper className='flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between'>
        <p className='text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} All rights reserved
        </p>

        {/* Business Official */}
        <div className='flex gap-8'>
          <Link href='#' className='text-sm text-muted-foreground hover:text-gray-600'>
            Terms
          </Link>
          <Link href='#' className='text-sm text-muted-foreground hover:text-gray-600'>
            Privacy Policy
          </Link>
          <Link href='#' className='text-sm text-muted-foreground hover:text-gray-600'>
            Cookie Policy
          </Link>
        </div>
      </CenterWrapper>
    </footer>
  )
}
