'use client'

import React, { useCallback, useRef, useState } from 'react'
import { FileWithPath } from 'react-dropzone'
import { AudioControl, useAudioControl } from './AudioControl'
import { Wave } from './Wave'
import { FileDropZone } from './FileDropZone'

const Page: React.FC = () => {
  const [filename, setFilename] = useState<string | null>(null)
  const [objectURL, setObjectURL] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioCtrl = useAudioControl(audioRef)
  const waveHeight = 150

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length === 0) return
    if (!audioRef.current) return
    const file = acceptedFiles[0]
    setFilename(file.name)
    const preview = URL.createObjectURL(file)
    setObjectURL(preview)
    audioRef.current.src = preview
  }, [])

  return (
    <>
      <FileDropZone onDrop={onDrop} />
      <audio ref={audioRef} />
      {objectURL && <Wave objectURL={objectURL} height={waveHeight} />}
      <div className='h-6'>
        {filename && <p>{filename}</p>}
      </div>
      <AudioControl {...audioCtrl} />
    </>
  )
}

export default Page;
