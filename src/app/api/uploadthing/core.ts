import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { z } from 'zod'
import sharp from 'sharp' // TRY: new version of sharp
import { db } from '@/db'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(
      z.object({
        configId: z.string().optional(),
      }),
    )
    .middleware(async ({ input }) => {
      return { input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input
      const imageUrl = file.url // file url stored in uploadthing cloud server

      const res = await fetch(imageUrl) // fetch image data from url
      const arrayBuffer = await res.arrayBuffer() // convert to ArrayBuffer
      const imgMetadata = await sharp(arrayBuffer).metadata() // get image metadata
      const { width = 500, height = 500 } = imgMetadata // get image width and height

      if (!configId) {
        // 1st step/upload: upload page startUpload with {configId:undefined}
        // db create configuration after image is uploaded
        const configurationCreated = await db.configuration.create({
          data: { imageUrl, width, height },
        })
        return { configId: configurationCreated.id }
      } else {
        // 2nd step/upload: design page startUpload with {configId} from previous step
        // db update configuration after image is uploaded
        await db.configuration.update({
          where: { id: configId },
          data: { croppedImageUrl: imageUrl },
        })
        return { configId }
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
