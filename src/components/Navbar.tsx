import Link from 'next/link'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRightCircleIcon, LayoutDashboardIcon } from 'lucide-react'
import { CenterWrapper } from './CenterWrapper'
import { buttonVariants } from './ui/button'

export const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const isLoggedIn = !!user?.id
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

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
                  Sign in
                </Link>
              </>
            )}

            {isAdmin ? (
              <Link
                href='/dashboard'
                className={buttonVariants({
                  size: 'sm',
                  className: 'hidden items-center gap-2 capitalize sm:flex',
                })}
              >
                dashboard <LayoutDashboardIcon className='h-5 w-5' />
              </Link>
            ) : (
              <Link
                href='/configure/upload'
                className={buttonVariants({
                  size: 'sm',
                  className: 'hidden items-center gap-2 capitalize sm:flex',
                })}
              >
                create now <ArrowRightCircleIcon className='h-5 w-5' />
              </Link>
            )}
          </div>
        </div>
      </CenterWrapper>
    </nav>
  )
}
