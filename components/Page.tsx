"use client"

import React, { useCallback, useState } from "react"
import dynamic from "next/dynamic"
import { FileWithPath } from "react-dropzone"

import { FileDropZone } from "./FileDropZone"

const Wave = dynamic(() => import("./Wave"), { ssr: false })

const Page: React.FC = () => {
  const [filename, setFilename] = useState<string | null>(null)
  const [objectURL, setObjectURL] = useState<string | null>(null)
  const waveHeight = 150

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length === 0) return
    const file = acceptedFiles[0]
    setFilename(file.name)
    const preview = URL.createObjectURL(file)
    setObjectURL(preview)
  }, [])

  return (
    <>
      <FileDropZone onDrop={onDrop} />
      {objectURL && <Wave objectURL={objectURL} height={waveHeight} />}
      <div className="h-6">{filename && <p>{filename}</p>}</div>
    </>
  )
}

export default Page
