'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAuthStatus } from './action'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  })

  useEffect(() => {
    if (data?.success) {
      const configId = localStorage.getItem('configurationId')
      if (configId) {
        localStorage.removeItem('configurationId')
        router.push(`/configure/preview?id=${configId}`)
      } else {
        router.push('/')
      }
    }
  }, [data, router])

  return (
    <div className='mt-24 flex w-full justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2Icon className='h-8 w-8 animate-spin text-zinc-500' />
        <h3 className='text-xl font-semibold'>Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

// set up environment variables:
// KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/auth-callback
