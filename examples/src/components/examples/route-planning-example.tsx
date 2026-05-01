import { useMemo, useState } from "react"
import { Route, Navigation, MapPin, Footprints, Car, ArrowRight, RotateCcw, Timer, Gauge } from "lucide-react"
import { MapContainer, Marker, Polyline, TileLayer, Tooltip } from "react-leaflet"
import {
  SelectArea,
  type SelectAreaBounds,
  useSelectArea,
} from "react-leaflet-select-area"
import L from "leaflet"

import { Button } from "@/components/ui/button"
import {
  OSM_ATTRIBUTION,
  createMarkerIcon,
  markerIsWithinBounds,
} from "@/components/examples/example-map-utils"

const INITIAL_CENTER: [number, number] = [40.758, -73.9855]

type Stop = {
  id: number
  name: string
  position: [number, number]
}

const INITIAL_STOPS: Stop[] = [
  { id: 1, name: "Times Square", position: [40.758, -73.9855] },
  { id: 2, name: "Central Park", position: [40.7829, -73.9654] },
  { id: 3, name: "Columbus Circle", position: [40.7681, -73.9819] },
  { id: 4, name: "Lincoln Center", position: [40.7725, -73.9835] },
  { id: 5, name: "Upper West Side", position: [40.787, -73.9754] },
]

export default function RoutePlanningExample() {
  const controller = useSelectArea()
  const [stops] = useState<Stop[]>(INITIAL_STOPS)
  const [bounds, setBounds] = useState<SelectAreaBounds | null>(null)
  const [waypoints, setWaypoints] = useState<[number, number][]>([])

  const handleBoundsChange = (nextBounds: SelectAreaBounds | null) => {
    setBounds(nextBounds)
    if (nextBounds) {
      const newWaypoints = stops
        .filter((stop) => markerIsWithinBounds(stop, nextBounds))
        .map((stop) => stop.position)
      setWaypoints(newWaypoints)
    } else {
      setWaypoints(stops.map((s) => s.position))
    }
  }

  const clearSelection = () => {
    setBounds(null)
    setWaypoints(stops.map((s) => s.position))
    controller.clearSelection()
  }

  const selectedStops = useMemo(() => {
    if (!bounds) return stops
    return stops.filter((stop) => markerIsWithinBounds(stop, bounds))
  }, [bounds, stops])

  const totalDistance = useMemo(() => {
    if (waypoints.length < 2) return 0
    let distance = 0
    for (let i = 0; i < waypoints.length - 1; i++) {
      const from = L.latLng(waypoints[i])
      const to = L.latLng(waypoints[i + 1])
      distance += from.distanceTo(to)
    }
    return distance / 1000
  }, [waypoints])

  const estimatedTime = useMemo(() => {
    const avgSpeedKmh = 30
    return (totalDistance / avgSpeedKmh) * 60
  }, [totalDistance])

  const formatDistance = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)} m`
    return `${km.toFixed(1)} km`
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${Math.round(minutes)} min`
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    return `${hours}h ${mins}m`
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="grid grid-cols-2 gap-2 border-b border-border/70 bg-background/85 p-3 sm:grid-cols-[auto_auto_auto_1fr] sm:items-center">
        <Button
          variant={controller.isSelectionMode ? "secondary" : "outline"}
          size="sm"
          onClick={controller.toggleSelectionMode}
        >
          <Route className="size-4" />
          {controller.isSelectionMode ? "Cancel" : "Filter stops"}
        </Button>
        <Button variant="ghost" size="sm" onClick={clearSelection}>
          <RotateCcw className="size-4" />
          Reset
        </Button>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Timer className="size-4" />
            <span>{formatTime(estimatedTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="size-4" />
            <span>{formatDistance(totalDistance)}</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {selectedStops.length} stops {bounds && "(filtered)"}
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
        Draw a rectangle on the map to filter which stops are included in the
        route calculation.
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
        <div className="order-2 max-h-56 w-full flex-shrink-0 overflow-y-auto border-t border-border/70 bg-background p-3 md:order-1 md:max-h-none md:w-72 md:border-t-0 md:border-r">
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">
              Route Stops
            </div>
            {selectedStops.map((stop, index) => (
              <div
                key={stop.id}
                className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  {index + 1}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-muted-foreground" />
                  <span className="text-sm">{stop.name}</span>
                </div>
                {index < selectedStops.length - 1 && (
                  <ArrowRight className="ml-auto size-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3 rounded-md border border-border/50 p-3">
            <div className="text-xs font-medium">Route Summary</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Car className="size-4 text-muted-foreground" />
                <span>{formatDistance(totalDistance)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="size-4 text-muted-foreground" />
                <span>{formatTime(estimatedTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="size-4 text-muted-foreground" />
                <span>{selectedStops.length} stops</span>
              </div>
              <div className="flex items-center gap-2">
                <Footprints className="size-4 text-muted-foreground" />
                <span>{bounds ? "Filtered" : "All"}</span>
              </div>
            </div>
          </div>
        </div>

        <MapContainer
          center={INITIAL_CENTER}
          zoom={14}
          className="order-1 h-[20rem] min-h-[20rem] w-full flex-none md:order-2 md:h-full md:min-h-0 md:flex-1"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution={OSM_ATTRIBUTION}
          />

          {waypoints.length > 1 && (
            <Polyline
              positions={waypoints}
              pathOptions={{
                color: "#0f766e",
                weight: 4,
                opacity: 0.8,
              }}
            />
          )}

          {stops.map((stop, index) => {
            const isInBounds = !bounds || markerIsWithinBounds(stop, bounds)
            return (
              <Marker
                key={stop.id}
                position={stop.position}
                icon={createMarkerIcon(isInBounds)}
                opacity={isInBounds ? 1 : 0.4}
              >
                <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{stop.name}</span>
                  </div>
                </Tooltip>
              </Marker>
            )
          })}

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
