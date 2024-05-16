import { Suspense } from 'react'
import { ThankYou } from './ThankYou'

export default function Page() {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  )
}

// FIXME: where is the fallback

// files pattern: page + ClientComponent + server-action
