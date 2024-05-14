'use server'

import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession()
  const kindeUser = await getUser()

  if (!kindeUser || !kindeUser.email) {
    throw new Error('Invalid user data')
  }

  const { id: kindeId, email } = kindeUser
  const existingUser = await db.user.findFirst({
    where: { kindeId },
  })

  if (!existingUser) {
    await db.user.create({
      data: {
        id: kindeId,
        kindeId,
        email,
      },
    })
  }

  return { success: true }
}

// in authentication ,should I keep user id same as kinde id?
