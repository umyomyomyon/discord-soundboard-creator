import React from "react"
import { FileWithPath, useDropzone } from "react-dropzone"

import Typography from "./ui/typography"

type DropZoneProps = {
  onDrop: (acceptedFiles: FileWithPath[]) => void
}

export const FileDropZone: React.FC<DropZoneProps> = React.memo(
  ({ onDrop }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    })

    return (
      <div
        {...getRootProps()}
        className="flex h-[150px] w-full cursor-pointer items-center justify-center rounded-md border border-dashed text-sm caret-transparent"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography.p>Drop the files here ...</Typography.p>
        ) : (
          // eslint-disable-next-line react/no-unescaped-entities
          <Typography.p>ここにmp3ファイルをドラッグ＆ドロップ</Typography.p>
        )}
      </div>
    )
  }
)

FileDropZone.displayName = "FileDropZone"
