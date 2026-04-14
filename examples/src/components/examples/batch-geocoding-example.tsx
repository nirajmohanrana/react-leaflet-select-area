import { useState } from "react"
import { MapPin, Search, Trash2, Globe, Loader2 } from "lucide-react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import {
  SelectArea,
  type SelectAreaBounds,
  useSelectArea,
} from "react-leaflet-select-area"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  OSM_ATTRIBUTION,
  createMarkerIcon,
  markerIsWithinBounds,
} from "@/components/examples/example-map-utils"

const INITIAL_CENTER: [number, number] = [40.7128, -74.006]

const SAMPLE_ADDRESSES = [
  { id: 1, address: "123 Broadway, New York, NY", position: [40.7145, -74.0071] as [number, number] },
  { id: 2, address: "456 Wall Street, New York, NY", position: [40.7074, -74.0113] as [number, number] },
  { id: 3, address: "789 Church Street, New York, NY", position: [40.7168, -74.0056] as [number, number] },
  { id: 4, address: "321 Park Row, New York, NY", position: [40.7136, -74.0034] as [number, number] },
  { id: 5, address: "654 Liberty Street, New York, NY", position: [40.7112, -74.0098] as [number, number] },
  { id: 6, address: "987 Fulton Street, New York, NY", position: [40.7089, -74.0045] as [number, number] },
  { id: 7, address: "147 Duane Street, New York, NY", position: [40.7176, -74.0103] as [number, number] },
  { id: 8, address: "258 Greenwich Street, New York, NY", position: [40.7097, -74.0121] as [number, number] },
]

type GeocodedAddress = typeof SAMPLE_ADDRESSES[number] & { selected: boolean }

export default function BatchGeocodingExample() {
  const controller = useSelectArea()
  const [addresses, setAddresses] = useState<GeocodedAddress[]>(
    SAMPLE_ADDRESSES.map((addr) => ({ ...addr, selected: false })),
  )
  const [, setBounds] = useState<SelectAreaBounds | null>(null)
  const [isGeocoding, setIsGeocoding] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleBoundsChange = (nextBounds: SelectAreaBounds | null) => {
    setBounds(nextBounds)
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        selected: nextBounds ? markerIsWithinBounds(addr, nextBounds) : false,
      })),
    )
  }

  const clearSelection = () => {
    setBounds(null)
    setAddresses((prev) => prev.map((addr) => ({ ...addr, selected: false })))
    controller.clearSelection()
  }

  const simulateGeocoding = async () => {
    const selectedAddresses = addresses.filter((a) => a.selected)
    if (selectedAddresses.length === 0) return

    setIsGeocoding(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsGeocoding(false)
    alert(
      `Successfully geocoded ${selectedAddresses.length} addresses within the selected area!`,
    )
  }

  const filteredAddresses = addresses.filter((addr) =>
    addr.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedCount = addresses.filter((a) => a.selected).length

  return (
    <div className="flex h-full flex-col">
      <div className="grid gap-3 border-b border-border/70 bg-background/85 p-3 lg:grid-cols-[auto_auto_auto_1fr] lg:items-center">
        <Button
          variant={controller.isSelectionMode ? "secondary" : "outline"}
          size="sm"
          onClick={controller.toggleSelectionMode}
        >
          <Search className="size-4" />
          {controller.isSelectionMode ? "Cancel" : "Select area"}
        </Button>
        <Button variant="ghost" size="sm" onClick={clearSelection}>
          <Trash2 className="size-4" />
          Clear
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={simulateGeocoding}
          disabled={selectedCount === 0 || isGeocoding}
        >
          {isGeocoding ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Globe className="size-4" />
          )}
          Geocode ({selectedCount})
        </Button>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search addresses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 max-w-[200px]"
          />
        </div>
      </div>

      <div className="border-b border-border/70 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
        Draw a box on the map to select addresses within that area, then click
        Geocode to process them.
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-72 flex-shrink-0 overflow-y-auto border-r border-border/70 bg-background p-3">
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">
              Addresses ({filteredAddresses.length})
            </div>
            {filteredAddresses.map((addr) => (
              <div
                key={addr.id}
                className={`flex items-center gap-2 rounded-md p-2 text-sm ${
                  addr.selected
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                <MapPin className="size-4 flex-shrink-0" />
                <span className="truncate">{addr.address}</span>
              </div>
            ))}
          </div>
        </div>

        <MapContainer
          center={INITIAL_CENTER}
          zoom={15}
          className="h-full w-full flex-1"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution={OSM_ATTRIBUTION}
          />
          {filteredAddresses.map((addr) => (
            <Marker
              key={addr.id}
              position={addr.position}
              icon={createMarkerIcon(addr.selected)}
            />
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