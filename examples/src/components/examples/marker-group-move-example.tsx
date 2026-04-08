import { useMemo, useRef, useState } from "react"
import { Grip, Move, RefreshCcw, SquareDashedMousePointer, Trash2 } from "lucide-react"
import type {
  LeafletEventHandlerFnMap,
  LeafletMouseEvent,
  Marker as LeafletMarker,
} from "leaflet"
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet"
import {
  SelectArea,
  type SelectAreaBounds,
  useSelectArea,
} from "react-leaflet-select-area"

import { Button } from "@/components/ui/button"
import {
  OSM_ATTRIBUTION,
  createMarkerIcon,
  formatBounds,
  generateMarkers,
  markerIsWithinBounds,
  type MarkerItem,
} from "@/components/examples/example-map-utils"

const INITIAL_CENTER: [number, number] = [23.3441, 85.3096]
const MARKER_COUNT = 12

type DragSession = {
  activeId: number
  selectedIds: number[]
  originPositions: Map<number, [number, number]>
  livePositions: Map<number, [number, number]>
}

export default function MarkerGroupMoveExample() {
  const controller = useSelectArea()
  const [markers, setMarkers] = useState<MarkerItem[]>(() =>
    generateMarkers(INITIAL_CENTER, MARKER_COUNT),
  )
  const [bounds, setBounds] = useState<SelectAreaBounds | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const dragSessionRef = useRef<DragSession | null>(null)
  const markerRefs = useRef<Map<number, LeafletMarker>>(new Map())
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const resetMarkers = () => {
    const nextMarkers = generateMarkers(INITIAL_CENTER, MARKER_COUNT)
    setMarkers(nextMarkers)
    setSelectedIds([])
    setBounds(null)
    controller.clearSelection()
  }

  const clearSelection = () => {
    setSelectedIds([])
    setBounds(null)
    controller.clearSelection()
  }

  const handleBoundsChange = (nextBounds: SelectAreaBounds | null) => {
    setBounds(nextBounds)
    const nextSelectedIds = markers
      .filter((marker) => markerIsWithinBounds(marker, nextBounds))
      .map((marker) => marker.id)
    setSelectedIds(nextSelectedIds)
  }

  const createDragHandlers = (markerId: number): LeafletEventHandlerFnMap => ({
    dragstart: () => {
      const selectedIdsForDrag =
        selectedIdSet.has(markerId) && selectedIds.length > 1
          ? selectedIds
          : [markerId]

      dragSessionRef.current = {
        activeId: markerId,
        selectedIds: selectedIdsForDrag,
        originPositions: new Map(
          markers.map((marker) => [marker.id, marker.position] as const),
        ),
        livePositions: new Map(),
      }
    },
    drag: (event) => {
      const dragEvent = event as LeafletMouseEvent
      const session = dragSessionRef.current

      if (!session || session.activeId !== markerId) {
        return
      }

      const activeOrigin = session.originPositions.get(markerId)

      if (!activeOrigin) {
        return
      }

      const deltaLat = dragEvent.latlng.lat - activeOrigin[0]
      const deltaLng = dragEvent.latlng.lng - activeOrigin[1]

      session.selectedIds.forEach((selectedId) => {
        const originPosition = session.originPositions.get(selectedId)

        if (!originPosition) {
          return
        }

        const nextPosition: [number, number] = [
          originPosition[0] + deltaLat,
          originPosition[1] + deltaLng,
        ]

        session.livePositions.set(selectedId, nextPosition)

        if (selectedId === markerId) {
          return
        }

        markerRefs.current.get(selectedId)?.setLatLng(nextPosition)
      })
    },
    dragend: () => {
      const session = dragSessionRef.current

      if (session) {
        setMarkers((currentMarkers) =>
          currentMarkers.map((marker) => ({
            ...marker,
            position:
              session.livePositions.get(marker.id) ??
              session.originPositions.get(marker.id) ??
              marker.position,
          })),
        )
      }

      dragSessionRef.current = null
    },
  })

  return (
    <div className="flex h-full flex-col">
      <div className="grid gap-3 border-b border-border/70 bg-background/85 p-3 lg:grid-cols-[auto_auto_auto_1fr] lg:items-center">
        <Button
          variant={controller.isSelectionMode ? "secondary" : "outline"}
          size="sm"
          onClick={controller.toggleSelectionMode}
        >
          <SquareDashedMousePointer className="size-4" />
          {controller.isSelectionMode ? "Cancel area mode" : "Select markers"}
        </Button>
        <Button variant="ghost" size="sm" onClick={clearSelection}>
          <Trash2 className="size-4" />
          Clear
        </Button>
        <Button variant="ghost" size="sm" onClick={resetMarkers}>
          <RefreshCcw className="size-4" />
          Regenerate
        </Button>
        <div className="grid gap-1 text-xs text-muted-foreground md:grid-cols-[auto_1fr] md:items-center md:justify-end">
          <div className="inline-flex items-center gap-2">
            <Move className="size-4 text-primary" />
            <span>{selectedIds.length} selected</span>
          </div>
          <div className="min-w-0 truncate">{formatBounds(bounds)}</div>
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
        Drag any selected marker to move the whole set together. Unselected
        markers still move independently.
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
        {markers.map((marker) => {
          const selected = selectedIdSet.has(marker.id)

          return (
            <Marker
              key={marker.id}
              position={marker.position}
              draggable
              icon={createMarkerIcon(selected)}
              eventHandlers={createDragHandlers(marker.id)}
              ref={(instance) => {
                if (instance) {
                  markerRefs.current.set(marker.id, instance)
                  return
                }

                markerRefs.current.delete(marker.id)
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div className="flex items-center gap-2">
                  <Grip className="size-3.5" />
                  <span>
                    {marker.label}
                    {selected ? " selected" : ""}
                  </span>
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
  )
}
