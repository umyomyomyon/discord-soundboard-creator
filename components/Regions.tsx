import React from "react"
import { Region } from "wavesurfer.js/src/plugin/regions"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"

type RegionsProps = {
  regions: Region[]
  handleDownload: (region: Region) => Promise<void>
}

export const Regions: React.FC<RegionsProps> = React.memo(
  ({ regions, handleDownload }) => {
    const trimNum = (num: number) => {
      return parseFloat(num.toFixed(3))
    }
    return (
      <ul className="flex flex-col gap-4">
        {regions.map((region) => (
          <li key={region.id}>
            <Card>
              <CardContent className="flex flex-col gap-4">
                <div className="mt-6">
                  <p>start: {trimNum(region.start)}s</p>
                  <p>end: {trimNum(region.end)}s</p>
                  <p>total: {trimNum(region.end - region.start)}s</p>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => region.play()}>
                    <Icons.play />
                  </Button>
                  <Button onClick={() => region.remove()}>
                    <Icons.trash />
                  </Button>
                  <Button onClick={() => handleDownload(region)}>
                    ダウンロード
                  </Button>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    )
  }
)
Regions.displayName = "Regions"
