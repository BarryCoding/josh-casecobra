import { db } from '@/db'
import { notFound } from 'next/navigation'

interface PageProps {
  searchParams: { id?: string }
}

export default async function Page({ searchParams: { id } }: PageProps) {
  if (!id) return notFound()

  const configuration = await db.configuration.findUnique({ where: { id } })
  if (!configuration) return notFound()

  const { croppedImageUrl, imageUrl, width, height } = configuration

  return <>preview {id}</>
}
