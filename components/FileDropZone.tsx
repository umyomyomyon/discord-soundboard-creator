'use client'

import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from './ui/button'
import WaveSurfer from 'wavesurfer.js'

const FileDropZone: React.FC = () => {
  const [filename, setFilename] = useState<string | null>(null)
  const [objectURL, setObjectURL] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const waveformRef = useRef<HTMLDivElement>(null)
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

  const handlePlayClick = () => {
    if (!audioRef.current) return
    audioRef.current.play()
  }

  const handlePauseClick = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
  }

  const handleStopClick = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    if (!waveformRef.current) return
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      interact: false,
      cursorColor: 'white',
      normalize: true,
      height: waveHeight,
    })
    if (objectURL) {
      ws.load(objectURL)
    }
  }, [objectURL])

  return (
    <>
      <div {...getRootProps()} className='flex h-[150px] w-full cursor-pointer items-center justify-center rounded-md border border-dashed text-sm caret-transparent'>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            // eslint-disable-next-line react/no-unescaped-entities
            <p>ここにmp3ファイルをドラッグ＆ドロップ</p>
        }
      </div>
      <audio ref={audioRef} />
      <div className='w-full'>
        {objectURL && <div ref={waveformRef} />}
      </div>
      <div className='h-6'>
        {filename && <p>{filename}</p>}
      </div>
      <Button onClick={handlePlayClick}>再生</Button>
      <Button onClick={handlePauseClick}>一時停止</Button>
      <Button onClick={handleStopClick}>停止</Button>
    </>
  )
}

export default FileDropZone;
