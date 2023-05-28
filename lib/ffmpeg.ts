import { createFFmpeg } from "@ffmpeg/ffmpeg"

const ffmpegCoreVersion = "0.11.0"
const corePath = `https://unpkg.com/@ffmpeg/core@${ffmpegCoreVersion}/dist/ffmpeg-core.js`

export const cutMp3 = async (
  binary: Uint8Array,
  start: number,
  end: number,
  srcFileName: string,
  outputFileName: string
) => {
  const ffmpeg = createFFmpeg({ log: true, corePath })
  await ffmpeg.load()
  ffmpeg.FS("writeFile", srcFileName, binary)
  await ffmpeg.run(
    "-i",
    srcFileName,
    "-ss",
    start.toString(),
    "-to",
    end.toString(),
    outputFileName
  )
  const resultUnit8Array = ffmpeg.FS("readFile", outputFileName)
  return resultUnit8Array
}
