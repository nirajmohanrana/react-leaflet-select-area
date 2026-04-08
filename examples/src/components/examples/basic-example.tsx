import { useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { SquareDashedMousePointer, Trash2 } from "lucide-react"
import {
  SelectArea,
  type SelectAreaBounds,
  useSelectArea,
} from "react-leaflet-select-area"

import { Button } from "@/components/ui/button"

function formatBounds(bounds: SelectAreaBounds | null) {
  if (!bounds) {
    return "No selection yet"
  }

  const [[southLat, southLng], [northLat, northLng]] = bounds

  return `${southLat.toFixed(4)}, ${southLng.toFixed(4)} -> ${northLat.toFixed(4)}, ${northLng.toFixed(4)}`
}

export default function BasicExample() {
  const controller = useSelectArea()
  const [bounds, setBounds] = useState<SelectAreaBounds | null>(null)
  const isSelectionActive =
    controller.isSelectionMode || controller.isShortcutPressed

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-border/70 bg-background/80 p-3">
        <Button
          variant={isSelectionActive ? "secondary" : "outline"}
          size="sm"
          onClick={controller.toggleSelectionMode}
        >
          <SquareDashedMousePointer className="size-4" />
          {isSelectionActive ? "Cancel selection" : "Select area"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            controller.clearSelection()
            setBounds(null)
          }}
        >
          <Trash2 className="size-4" />
          Clear
        </Button>
        <div className="min-w-0 text-xs text-muted-foreground">
          {formatBounds(bounds)}
        </div>
      </div>

      <MapContainer
        center={[18.922, 72.8347]}
        zoom={13}
        className="h-full w-full flex-1"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SelectArea
          controller={controller}
          keepRectangle
          options={{ color: "#2563eb", weight: 2 }}
          onBoundsChange={setBounds}
        />
      </MapContainer>
    </div>
  )
}
