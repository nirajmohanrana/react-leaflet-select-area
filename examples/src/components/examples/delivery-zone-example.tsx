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
    <div className="flex h-full min-h-0 flex-col">
      <div className="grid grid-cols-2 gap-2 border-b border-border/70 bg-background/85 p-3 sm:grid-cols-[auto_auto_1fr_auto] sm:items-center">
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
        <div className="col-span-2 flex min-w-0 items-center gap-2 sm:col-span-1">
          <Input
            placeholder="Zone name..."
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            className="h-8 min-w-0 flex-1 sm:w-40 sm:flex-none"
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
        <div className="flex items-center gap-2 text-xs text-muted-foreground sm:justify-end">
          <Package className="size-4" />
          <span>{zones.length} zones</span>
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
        Draw a rectangle on the map to define a delivery zone, then give it a
        name and save it.
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        <div className="order-2 max-h-52 w-full flex-shrink-0 overflow-y-auto border-t border-border/70 bg-background p-3 md:order-1 md:max-h-none md:w-64 md:border-t-0 md:border-r">
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
          className="order-1 h-[20rem] min-h-[20rem] w-full flex-none md:order-2 md:h-full md:min-h-0 md:flex-1"
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
