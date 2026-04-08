import { useMemo, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import {
  Shield,
  ShieldCheck,
  SquareDashedMousePointer,
  Trash2,
} from "lucide-react"
import {
  SelectArea,
  type SelectAreaBounds,
  useSelectArea,
} from "react-leaflet-select-area"

import { Button } from "@/components/ui/button"
import {
  OSM_ATTRIBUTION,
  formatBounds,
  getBoundsMetrics,
} from "@/components/examples/example-map-utils"

const CENTER: [number, number] = [28.6129, 77.2295]

type GeoFencingExampleProps = {
  controlMode?: "built-in" | "external"
}

export default function GeoFencingExample({
  controlMode = "built-in",
}: GeoFencingExampleProps) {
  const controller = useSelectArea()
  const [bounds, setBounds] = useState<SelectAreaBounds | null>(null)
  const metrics = useMemo(() => getBoundsMetrics(bounds), [bounds])
  const usesExternalTrigger = controlMode === "external"

  return (
    <div className="grid h-full grid-rows-[1fr_auto] bg-background lg:grid-cols-[minmax(0,1fr)_320px] lg:grid-rows-1">
      <div className="flex min-h-[18rem] flex-col">
        {usesExternalTrigger ? (
          <div className="flex flex-wrap items-center gap-2 border-b border-border/70 bg-background/85 px-3 py-2">
            <Button
              variant={controller.isSelectionMode ? "secondary" : "outline"}
              size="sm"
              onClick={controller.toggleSelectionMode}
            >
              <SquareDashedMousePointer className="size-4" />
              {controller.isSelectionMode ? "Cancel" : "Select Area"}
            </Button>
            <div className="text-xs text-muted-foreground">
              Use the external button to draw and confirm a temporary fence.
            </div>
          </div>
        ) : (
          <div className="border-b border-border/70 bg-background/85 px-3 py-2 text-xs text-muted-foreground">
            Tap the built-in map control to arm a temporary fence, then draw once
            to confirm the boundary.
          </div>
        )}
        <MapContainer
          center={CENTER}
          zoom={12}
          className="h-full w-full flex-1"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution={OSM_ATTRIBUTION}
          />
          <SelectArea
            controller={controller}
            keepRectangle
            showControl={!usesExternalTrigger}
            onBoundsChange={setBounds}
            options={{ color: "#f97316", weight: 2, fillOpacity: 0.08 }}
          />
        </MapContainer>
      </div>

      <aside className="border-t border-border/70 bg-muted/30 p-4 lg:border-t-0 lg:border-l">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
              Temporary Fence
            </div>
            <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
              {bounds ? (
                <>
                  <ShieldCheck className="size-5 text-emerald-600" />
                  Active
                </>
              ) : (
                <>
                  <Shield className="size-5 text-muted-foreground" />
                  Waiting
                </>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setBounds(null)
              controller.clearSelection()
            }}
          >
            <Trash2 className="size-4" />
            Clear
          </Button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="rounded-2xl border border-border bg-background p-3">
            <div className="mb-1 text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
              Bounds
            </div>
            <div className="text-sm text-foreground">{formatBounds(bounds)}</div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-border bg-background p-3">
              <div className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
                Width
              </div>
              <div className="mt-1 text-lg font-semibold">
                {metrics ? `${metrics.widthKm.toFixed(2)} km` : "--"}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-3">
              <div className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
                Height
              </div>
              <div className="mt-1 text-lg font-semibold">
                {metrics ? `${metrics.heightKm.toFixed(2)} km` : "--"}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-3">
              <div className="text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase">
                Area
              </div>
              <div className="mt-1 text-lg font-semibold">
                {metrics ? `${metrics.areaKm2.toFixed(2)} km^2` : "--"}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
