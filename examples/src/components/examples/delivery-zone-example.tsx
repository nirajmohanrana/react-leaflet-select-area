import { useState } from "react"
import { Truck, Plus, Trash2, Package } from "lucide-react"
import { MapContainer, TileLayer, Polygon } from "react-leaflet"
import {
  SelectArea,
  type SelectAreaBounds,
  useSelectArea,
} from "react-leaflet-select-area"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OSM_ATTRIBUTION, getBoundsMetrics } from "@/components/examples/example-map-utils"

const INITIAL_CENTER: [number, number] = [51.5074, -0.1278]

type DeliveryZone = {
  id: number
  name: string
  bounds: SelectAreaBounds
  color: string
}

const ZONE_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#8b5cf6",
  "#ec4899",
]

export default function DeliveryZoneExample() {
  const controller = useSelectArea()
  const [zones, setZones] = useState<DeliveryZone[]>([])
  const [currentBounds, setCurrentBounds] = useState<SelectAreaBounds | null>(
    null,
  )
  const [zoneName, setZoneName] = useState("")
  const [nextColorIndex, setNextColorIndex] = useState(0)

  const handleBoundsChange = (bounds: SelectAreaBounds | null) => {
    setCurrentBounds(bounds)
  }

  const addZone = () => {
    if (!currentBounds || !zoneName.trim()) return

    const newZone: DeliveryZone = {
      id: Date.now(),
      name: zoneName.trim(),
      bounds: currentBounds,
      color: ZONE_COLORS[nextColorIndex % ZONE_COLORS.length],
    }

    setZones((prev) => [...prev, newZone])
    setZoneName("")
    setNextColorIndex((prev) => prev + 1)
    controller.clearSelection()
    setCurrentBounds(null)
  }

  const deleteZone = (zoneId: number) => {
    setZones((prev) => prev.filter((z) => z.id !== zoneId))
  }

  const clearAllZones = () => {
    setZones([])
    setNextColorIndex(0)
    controller.clearSelection()
  }

  getBoundsMetrics(currentBounds)

  return (
    <div className="flex h-full flex-col">
      <div className="grid gap-3 border-b border-border/70 bg-background/85 p-3 lg:grid-cols-[auto_auto_1fr_auto] lg:items-center">
        <Button
          variant={controller.isSelectionMode ? "secondary" : "outline"}
          size="sm"
          onClick={controller.toggleSelectionMode}
        >
          <Truck className="size-4" />
          {controller.isSelectionMode ? "Cancel" : "Draw zone"}
        </Button>
        <Button variant="ghost" size="sm" onClick={clearAllZones}>
          <Trash2 className="size-4" />
          Clear all
        </Button>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Zone name..."
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            className="h-8 w-40"
            disabled={!currentBounds}
          />
          <Button
            size="sm"
            onClick={addZone}
            disabled={!currentBounds || !zoneName.trim()}
          >
            <Plus className="size-4" />
            Add zone
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Package className="size-4" />
          <span>{zones.length} zones</span>
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
        Draw a rectangle on the map to define a delivery zone, then give it a
        name and save it.
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 flex-shrink-0 overflow-y-auto border-r border-border/70 bg-background p-3">
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">
              Delivery Zones ({zones.length})
            </div>
            {zones.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No zones defined yet.
              </div>
            ) : (
              zones.map((zone) => (
                <div
                  key={zone.id}
                  className="flex items-center justify-between rounded-md border border-border/50 p-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: zone.color }}
                    />
                    <span className="text-sm truncate">{zone.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    onClick={() => deleteZone(zone.id)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <MapContainer
          center={INITIAL_CENTER}
          zoom={13}
          className="h-full w-full flex-1"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution={OSM_ATTRIBUTION}
          />

          {zones.map((zone) => (
            <Polygon
              key={zone.id}
              positions={[
                [zone.bounds[0][0], zone.bounds[0][1]],
                [zone.bounds[0][0], zone.bounds[1][1]],
                [zone.bounds[1][0], zone.bounds[1][1]],
                [zone.bounds[1][0], zone.bounds[0][1]],
              ]}
              pathOptions={{
                color: zone.color,
                fillColor: zone.color,
                fillOpacity: 0.2,
                weight: 2,
              }}
            />
          ))}

          {currentBounds && (
            <Polygon
              positions={[
                [currentBounds[0][0], currentBounds[0][1]],
                [currentBounds[0][0], currentBounds[1][1]],
                [currentBounds[1][0], currentBounds[1][1]],
                [currentBounds[1][0], currentBounds[0][1]],
              ]}
              pathOptions={{
                color: "#0f766e",
                fillColor: "#0f766e",
                fillOpacity: 0.1,
                weight: 2,
                dashArray: "5, 5",
              }}
            />
          )}

          <SelectArea
            controller={controller}
            onBoundsChange={handleBoundsChange}
            options={{
              color: "#0f766e",
              weight: 2,
              fillOpacity: 0.08,
              dashArray: "5, 5",
            }}
          />
        </MapContainer>
      </div>
    </div>
  )
}