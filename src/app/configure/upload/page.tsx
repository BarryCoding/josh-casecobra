'use client'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { ImageIcon, Loader2Icon, MousePointerSquareDashedIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import Dropzone from 'react-dropzone'

export default function Page() {
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [isRedirecting, startTransition] = useTransition()
  const isUploading = false
  const [uploadProgress, setUploadProgress] = useState<number>(10)

  const onDropRejected = () => {}
  const onDropAccepted = () => {
    // TODO: upload
  }

  return (
    <div
      className={cn(
        'relative my-16 flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl',
        { 'bg-blue-900/10 ring-blue-900/25': isDragOver },
      )}
    >
      <div className='relative flex w-full flex-1 flex-col items-center justify-center'>
        <Dropzone
          accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className='flex h-full w-full flex-1 flex-col items-center justify-center'
              {...getRootProps()}
            >
              {/* invisible upload input */}
              <input {...getInputProps()} />

              {/* REFACTOR: make mutual exclusive conditions a union type */}
              {/* 4 states: resting, draggingOver, uploading, redirecting */}
              {/* icons and text for each state */}

              {isDragOver ? (
                <MousePointerSquareDashedIcon className='mb-2 h-6 w-6 text-zinc-500' />
              ) : isUploading || isRedirecting ? (
                <Loader2Icon className='mb-2 h-6 w-6 animate-spin text-zinc-500' />
              ) : (
                <ImageIcon className='mb-2 h-6 w-6 text-zinc-500' />
              )}

              <div className='mb-2 flex flex-col justify-center text-sm text-zinc-700'>
                {isUploading ? (
                  <div className='flex flex-col items-center'>
                    <p>Uploading...</p>
                    <Progress value={uploadProgress} className='mt-2 h-2 w-40 bg-gray-300' />
                  </div>
                ) : isRedirecting ? (
                  <div className='flex flex-col items-center'>
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className='font-semibold'>Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className='font-semibold'>Click to upload</span> or drag and drop
                  </p>
                )}
              </div>

              {isRedirecting ? null : <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  )
}
