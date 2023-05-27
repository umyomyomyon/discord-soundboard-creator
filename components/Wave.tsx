import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin, { Region } from 'wavesurfer.js/src/plugin/regions'
import { Button } from "./ui/button";
import { Regions } from "./Regions";

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
          regions: [],
          dragSelection: true,
        })
      ]
    })

    // regionsが追加されたら、ws.regions.listを更新する
    ws.on('region-update-end', () => {
      setRegions(Object.values(ws.regions.list))
    })
    ws.on('region-removed', () => {
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

  return (
    <div className='w-full'>
      <div ref={waveformRef} />
      <Button onClick={handleClick}>再生/停止</Button>
      <Regions regions={regions} />
    </div>
  )
})
Wave.displayName = 'Wave'
