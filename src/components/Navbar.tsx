import Link from 'next/link'
import { CenterWrapper } from './CenterWrapper'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from './ui/button'

export const Navbar = () => {
  const isLoggedIn = false
  const isAdmin = false

  return (
    <nav className='sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-zinc-200 bg-white/75 backdrop-blur-md'>
      <CenterWrapper>
        <div className='flex h-14 items-center justify-between border-b'>
          <Link href='/' className='flex font-semibold'>
            case<span className='text-green-600'>cobra</span>
          </Link>
          <div className='flex h-full items-center gap-4'>
            {isLoggedIn ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  Sign out
                </Link>
                {isAdmin && (
                  <Link
                    href='/dashboard'
                    className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                  >
                    Dashboard ✨
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  Sign up
                </Link>
                <Link
                  href='/api/auth/login'
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  Login
                </Link>
              </>
            )}
            <Link
              href='/configure/upload'
              className={buttonVariants({
                size: 'sm',
                className: 'hidden items-center gap-2 sm:flex',
              })}
            >
              Create case
              <ArrowRight className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </CenterWrapper>
    </nav>
  )
}
