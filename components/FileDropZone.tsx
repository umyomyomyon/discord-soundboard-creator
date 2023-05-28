import React from "react"
import { FileWithPath, useDropzone } from "react-dropzone"

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
          <p>Drop the files here ...</p>
        ) : (
          // eslint-disable-next-line react/no-unescaped-entities
          <p>ここにmp3ファイルをドラッグ＆ドロップ</p>
        )}
      </div>
    )
  }
)

FileDropZone.displayName = "FileDropZone"
