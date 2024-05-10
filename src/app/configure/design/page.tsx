import { db } from '@/db'
import { notFound } from 'next/navigation'
import { CustomizeDesign } from './CustomizeDesign'

interface PageProps {
  searchParams: { id?: string }
}

export default async function Page({ searchParams: { id } }: PageProps) {
  if (!id) return notFound()

  const configuration = await db.configuration.findUnique({ where: { id } })
  if (!configuration) return notFound()

  const { imageUrl, width, height } = configuration

  return <CustomizeDesign configId={id} imageUrl={imageUrl} imageDimensions={{ width, height }} />
}
