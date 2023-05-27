import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin, { Region } from 'wavesurfer.js/src/plugin/regions'
import { Button } from "./ui/button";

type Props = {
  objectURL: string,
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
      cursorColor: 'white',
      normalize: true,
      height,
      plugins: [
        RegionsPlugin.create({
          regions: []
        })
      ]
    })
    const wsResions = Object.values(ws.regions.list)
    console.log(wsResions)
    setRegions(wsResions)
    wsRef.current = ws
    if (objectURL) {
      ws.load(objectURL)
    }

  return () => ws.destroy()
  }, [objectURL, height])

  const handleClick = () => {
    if (!wsRef.current) return
    wsRef.current.playPause()
  }

  return (
    <div className='w-full'>
      <div ref={waveformRef} />
      <Button onClick={handleClick}>再生/停止</Button>
    </div>
  )
})
Wave.displayName = 'Wave'
