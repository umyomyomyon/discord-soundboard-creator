import React, { useRef, useEffect } from "react";
import WaveSurfer from 'wavesurfer.js'

type Props = {
  objectURL: string,
  height: number
}

export const Wave: React.FC<Props> = React.memo(({ objectURL, height }) => {
  const waveformRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!waveformRef.current) return
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      interact: false,
      cursorColor: 'white',
      normalize: true,
      height,
    })
    if (objectURL) {
      ws.load(objectURL)
    }

  return () => ws.destroy()
  }, [objectURL, height])

  return (
    <div className='w-full'>
      <div ref={waveformRef} />
    </div>
  )
})
Wave.displayName = 'Wave'
