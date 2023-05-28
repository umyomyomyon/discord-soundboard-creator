import React from "react"
import { Region } from "wavesurfer.js/src/plugin/regions"

import { Button } from "./ui/button"

type RegionsProps = {
  regions: Region[]
  handleDownload: (region: Region) => Promise<void>
}

export const Regions: React.FC<RegionsProps> = React.memo(
  ({ regions, handleDownload }) => {
    return (
      <ul>
        {regions.map((region) => (
          <li key={region.id}>
            <p>{region.start}</p>
            <p>{region.end}</p>
            <p>{region.end - region.start}秒</p>
            <Button onClick={() => region.play()}>再生</Button>
            <Button onClick={() => region.remove()}>削除</Button>
            <Button onClick={() => handleDownload(region)}>ダウンロード</Button>
          </li>
        ))}
      </ul>
    )
  }
)
Regions.displayName = "Regions"
