import React, { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import RegionsPlugin, { Region } from "wavesurfer.js/src/plugin/regions"

import { cutMp3 } from "@/lib/ffmpeg"

import { Regions } from "./Regions"
import { Button } from "./ui/button"

type Props = {
  objectURL: string
  height: number
}

export const Wave: React.FC<Props> = React.memo(({ objectURL, height }) => {
  const waveformRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WaveSurfer | null>(null)
  const [regions, setRegions] = useState<Region[]>([])

  useEffect(() => {
    if (!waveformRef.current) return
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      cursorColor: "white",
      normalize: true,
      height,
      plugins: [
        RegionsPlugin.create({
          regions: [],
          dragSelection: true,
        }),
      ],
    })

    // regionsが追加されたら、ws.regions.listを更新する
    ws.on("region-update-end", () => {
      setRegions(Object.values(ws.regions.list))
    })
    ws.on("region-removed", () => {
      setRegions(Object.values(ws.regions.list))
    })

    wsRef.current = ws
    if (objectURL) {
      ws.load(objectURL)
    }

    return () => {
      // 全てのイベントをunsubしてwsをdesttroy
      ws.unAll()
      ws.destroy()
    }
  }, [objectURL, height])

  const handleClick = () => {
    if (!wsRef.current) return
    wsRef.current.playPause()
  }

  const handleDownload = async (region: Region) => {
    const srcBlob = await (await fetch(objectURL)).blob()
    const binary = new Uint8Array(await srcBlob.arrayBuffer())
    const cutResult = await cutMp3(
      binary,
      region.start,
      region.end,
      "hoge.mp3",
      "cut.mp3"
    )
    const resultBlob = new Blob([cutResult], { type: "audio/mp3" })
    const link = document.createElement("a")
    link.download = "cut.mp3"
    link.href = URL.createObjectURL(resultBlob)
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div className="w-full">
      <div ref={waveformRef} />
      <Button onClick={handleClick}>再生/停止</Button>
      <Regions regions={regions} handleDownload={handleDownload} />
    </div>
  )
})
Wave.displayName = "Wave"
