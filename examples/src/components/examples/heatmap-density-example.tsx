import { useMemo, useState } from "react"
import { Activity, TrendingUp, BarChart3, RotateCcw, Layers } from "lucide-react"
import { MapContainer, CircleMarker, TileLayer, Tooltip } from "react-leaflet"
import {
  SelectArea,
  type SelectAreaBounds,
  useSelectArea,
} from "react-leaflet-select-area"

import { Button } from "@/components/ui/button"
import { OSM_ATTRIBUTION, getBoundsMetrics, markerIsWithinBounds } from "@/components/examples/example-map-utils"

const INITIAL_CENTER: [number, number] = [51.505, -0.09]

type DataPoint = {
  id: number
  value: number
  position: [number, number]
}

function generateDataPoints(center: [number, number], count: number): DataPoint[] {
  return Array.from({ length: count }, (_, i) => {
    const lat = center[0] + (Math.random() - 0.5) * 0.08
    const lng = center[1] + (Math.random() - 0.5) * 0.08
    const value = Math.floor(Math.random() * 100) + 1
    return { id: i + 1, value, position: [lat, lng] }
  })
}

const INITIAL_DATA = generateDataPoints(INITIAL_CENTER, 50)

export default function HeatmapDensityExample() {
  const controller = useSelectArea()
  const [dataPoints] = useState<DataPoint[]>(INITIAL_DATA)
  const [bounds, setBounds] = useState<SelectAreaBounds | null>(null)
  const [viewMode, setViewMode] = useState<"circles" | "intensity">("circles")

  const handleBoundsChange = (nextBounds: SelectAreaBounds | null) => {
    setBounds(nextBounds)
  }

  const clearSelection = () => {
    setBounds(null)
    controller.clearSelection()
  }

  const filteredData = useMemo(() => {
    if (!bounds) return dataPoints
    return dataPoints.filter((point) => markerIsWithinBounds(point, bounds))
  }, [bounds, dataPoints])

  const stats = useMemo(() => {
    const values = filteredData.map((p) => p.value)
    const total = values.reduce((sum, v) => sum + v, 0)
    const avg = values.length > 0 ? total / values.length : 0
    const max = values.length > 0 ? Math.max(...values) : 0
    const min = values.length > 0 ? Math.min(...values) : 0
    return { total, avg, max, min, count: values.length }
  }, [filteredData])

  const metrics = getBoundsMetrics(bounds)

  const getCircleRadius = (value: number) => {
    const baseRadius = 15
    const maxRadius = 40
    return baseRadius + (value / 100) * (maxRadius - baseRadius)
  }

  const getCircleColor = (value: number) => {
    if (viewMode === "intensity") {
      if (value < 25) return "#22c55e"
      if (value < 50) return "#84cc16"
      if (value < 75) return "#eab308"
      return "#ef4444"
    }
    return "#0f766e"
  }

  const getCircleOpacity = (value: number) => {
    if (viewMode === "intensity") {
      return 0.3 + (value / 100) * 0.5
    }
    return 0.3
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="grid grid-cols-2 gap-2 border-b border-border/70 bg-background/85 p-3 sm:grid-cols-[auto_auto_1fr_auto] sm:items-center">
        <Button
          variant={controller.isSelectionMode ? "secondary" : "outline"}
          size="sm"
          onClick={controller.toggleSelectionMode}
        >
          <Activity className="size-4" />
          {controller.isSelectionMode ? "Cancel" : "Select area"}
        </Button>
        <Button variant="ghost" size="sm" onClick={clearSelection}>
          <RotateCcw className="size-4" />
          Clear
        </Button>
        <div className="col-span-2 flex min-w-0 items-center gap-2 sm:col-span-1">
          <Button
            variant={viewMode === "circles" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("circles")}
          >
            <Layers className="size-4" />
            Circles
          </Button>
          <Button
            variant={viewMode === "intensity" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("intensity")}
          >
            <TrendingUp className="size-4" />
            Intensity
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground sm:justify-end">
          <BarChart3 className="size-4" />
          <span>{stats.count} points</span>
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
        Draw a rectangle on the map to analyze data density within that area.
        Switch between circle size and intensity color modes.
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        <div className="order-2 max-h-56 w-full flex-shrink-0 overflow-y-auto border-t border-border/70 bg-background p-3 md:order-1 md:max-h-none md:w-72 md:border-t-0 md:border-r">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-2">
                Statistics
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Count</div>
                  <div className="font-semibold">{stats.count}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Total</div>
                  <div className="font-semibold">{stats.total}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Average</div>
                  <div className="font-semibold">{stats.avg.toFixed(1)}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Max</div>
                  <div className="font-semibold">{stats.max}</div>
                </div>
              </div>
            </div>

            {metrics && (
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Area Metrics
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Width</span>
                    <span>{metrics.widthKm.toFixed(2)} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Height</span>
                    <span>{metrics.heightKm.toFixed(2)} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area</span>
                    <span>{(metrics.areaKm2 / 1000000).toFixed(2)} km²</span>
                  </div>
                </div>
              </div>
            )}

            {viewMode === "intensity" && (
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Legend
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 rounded-full bg-green-500" />
                    <span>Low (1-25)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 rounded-full bg-lime-400" />
                    <span>Medium-Low (26-50)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 rounded-full bg-yellow-500" />
                    <span>Medium-High (51-75)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="size-3 rounded-full bg-red-500" />
                    <span>High (76-100)</span>
                  </div>
                </div>
              </div>
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
          {filteredData.map((point) => (
            <CircleMarker
              key={point.id}
              center={point.position}
              radius={getCircleRadius(point.value)}
              pathOptions={{
                fillColor: getCircleColor(point.value),
                fillOpacity: getCircleOpacity(point.value),
                color: getCircleColor(point.value),
                weight: 1,
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="text-xs">
                  <div>Value: {point.value}</div>
                  <div className="text-muted-foreground">
                    {point.position[0].toFixed(4)}, {point.position[1].toFixed(4)}
                  </div>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
          <SelectArea
            controller={controller}
            onBoundsChange={handleBoundsChange}
            options={{ color: "#0f766e", weight: 2, fillOpacity: 0.08 }}
          />
        </MapContainer>
      </div>
    </div>
  )
}
