import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { buttonVariants } from './ui/button'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export const LoginModal = ({ ...props }: LoginModalProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className='fixed z-[9999999]'>
        <DialogHeader>
          <div className='relative mx-auto mb-2 h-24 w-24'>
            <Image src='/snake-1.png' alt='snake image' className='object-contain' fill />
          </div>
          <DialogTitle className='text-center text-3xl font-bold tracking-tight text-gray-900'>
            Log in to continue
          </DialogTitle>
          <DialogDescription className='py-2 text-center text-base'>
            <span className='font-medium text-zinc-900'>Your configuration was saved!</span> Please
            login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
          <LoginLink className={buttonVariants({ variant: 'outline' })}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: 'default' })}>Sign up</RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// pnpm dlx shadcn-ui@latest add dialog
// TRY: a better way to standardize z-index check all z- globally
// dialog overlay z-index and the navbar z-index
