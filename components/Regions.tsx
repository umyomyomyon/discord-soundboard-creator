import React from "react";
import { Region } from 'wavesurfer.js/src/plugin/regions'
import { Button } from "./ui/button";

type RegionsProps = {
  regions: Region[]
}

export const Regions: React.FC<RegionsProps> = React.memo(({ regions }) => {
  return (
    <ul>
      {regions.map((region) => (
        <li key={region.id}>
          <p>{region.start}</p>
          <p>{region.end}</p>
          <p>{region.end - region.start}秒</p>
          <Button onClick={() => region.play()}>再生</Button>
          <Button onClick={() => region.remove()}>削除</Button>
        </li>
      ))}
    </ul>
  )
})
Regions.displayName = 'Regions'
