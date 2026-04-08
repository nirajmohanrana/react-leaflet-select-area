import { useEffect, useState } from "react"
import { Download, LoaderCircle, RotateCcw, SquareDashedMousePointer } from "lucide-react"
import type { Map as LeafletMap } from "leaflet"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import {
  SelectArea,
  type SelectAreaBounds,
  useSelectArea,
} from "react-leaflet-select-area"

import { Button } from "@/components/ui/button"
import {
  CARTO_ATTRIBUTION,
  downloadMapSelectionAsPng,
  formatBounds,
} from "@/components/examples/example-map-utils"

const CENTER: [number, number] = [18.944, 72.8235]

function MapHandle({ onReady }: { onReady: (map: LeafletMap) => void }) {
  const map = useMap()

  useEffect(() => {
    onReady(map)
  }, [map, onReady])

  return null
}

export default function MapSectionDownloadExample() {
  const controller = useSelectArea()
  const [map, setMap] = useState<LeafletMap | null>(null)
  const [bounds, setBounds] = useState<SelectAreaBounds | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const reset = () => {
    controller.clearSelection()
    setBounds(null)
    setErrorMessage(null)
  }

  const handleDownload = async () => {
    if (!map || !bounds) {
      return
    }

    try {
      setIsDownloading(true)
      setErrorMessage(null)
      await downloadMapSelectionAsPng(map, bounds, "map-selection.png")
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Export failed unexpectedly.",
      )
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="grid gap-3 border-b border-border/70 bg-background/85 p-3 lg:grid-cols-[auto_auto_auto_1fr] lg:items-center">
        <Button
          variant={controller.isSelectionMode ? "secondary" : "outline"}
          size="sm"
          onClick={controller.toggleSelectionMode}
        >
          <SquareDashedMousePointer className="size-4" />
          {controller.isSelectionMode ? "Cancel area mode" : "Select export area"}
        </Button>
        <Button size="sm" onClick={handleDownload} disabled={!bounds || isDownloading}>
          {isDownloading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Download className="size-4" />
          )}
          Download PNG
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw className="size-4" />
          Reset
        </Button>
        <div className="min-w-0 truncate text-xs text-muted-foreground">
          {formatBounds(bounds)}
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
        {errorMessage ??
          "Draw a rectangle, then export only that selected map section as a PNG."}
      </div>

      <MapContainer
        center={CENTER}
        zoom={12}
        className="h-full w-full flex-1"
        zoomControl={false}
      >
        <MapHandle onReady={setMap} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution={CARTO_ATTRIBUTION}
          crossOrigin="anonymous"
        />
        <SelectArea
          controller={controller}
          keepRectangle
          onBoundsChange={setBounds}
          options={{ color: "#2563eb", weight: 2, fillOpacity: 0.06 }}
        />
      </MapContainer>
    </div>
  )
}
