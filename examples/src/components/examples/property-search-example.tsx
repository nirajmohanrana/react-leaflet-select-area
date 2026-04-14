import { useState } from "react"
import { Home, Search, Filter, Bed, Bath, Square, DollarSign } from "lucide-react"
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
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

const INITIAL_CENTER: [number, number] = [34.0522, -118.2437]

type Property = {
  id: number
  title: string
  price: number
  beds: number
  baths: number
  sqft: number
  position: [number, number]
}

const SAMPLE_PROPERTIES: Property[] = [
  { id: 1, title: "Downtown Loft", price: 450000, beds: 1, baths: 1, sqft: 850, position: [34.0542, -118.2471] },
  { id: 2, title: "Hollywood Hills Home", price: 1250000, beds: 3, baths: 2, sqft: 1800, position: [34.0489, -118.3392] },
  { id: 3, title: "Santa Monica Condo", price: 680000, beds: 2, baths: 2, sqft: 1100, position: [34.0195, -118.4912] },
  { id: 4, title: "Beverly Gardens Ranch", price: 890000, beds: 2, baths: 1, sqft: 1350, position: [34.0735, -118.4004] },
  { id: 5, title: "Koreatown Apartment", price: 395000, beds: 1, baths: 1, sqft: 720, position: [34.0574, -118.3007] },
  { id: 6, title: "Echo Park Studio", price: 325000, beds: 0, baths: 1, sqft: 450, position: [34.0784, -118.2606] },
  { id: 7, title: "Silver Lake Modern", price: 750000, beds: 2, baths: 2, sqft: 1400, position: [34.0869, -118.2702] },
  { id: 8, title: "Pasadena Craftsman", price: 950000, beds: 3, baths: 2, sqft: 1650, position: [34.1478, -118.1445] },
  { id: 9, title: "Venice Beach House", price: 1450000, beds: 3, baths: 3, sqft: 2100, position: [33.9850, -118.4695] },
  { id: 10, title: "Westwood Townhouse", price: 820000, beds: 2, baths: 2.5, sqft: 1550, position: [34.0636, -118.4425] },
  { id: 11, title: "Glendale Bungalow", price: 675000, beds: 2, baths: 1, sqft: 1200, position: [34.1425, -118.2551] },
  { id: 12, title: "Burbank Family Home", price: 980000, beds: 4, baths: 2, sqft: 2200, position: [34.1808, -118.3090] },
]

type FilterOptions = {
  minPrice: number
  maxPrice: number
  minBeds: number
  minBaths: number
  minSqft: number
}

export default function PropertySearchExample() {
  const controller = useSelectArea()
  const [bounds, setBounds] = useState<SelectAreaBounds | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 10000000,
    minBeds: 0,
    minBaths: 0,
    minSqft: 0,
  })
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  )

  const handleBoundsChange = (nextBounds: SelectAreaBounds | null) => {
    setBounds(nextBounds)
  }

  const clearSelection = () => {
    setBounds(null)
    controller.clearSelection()
  }

  const filteredProperties = SAMPLE_PROPERTIES.filter((property) => {
    const withinBounds = bounds ? markerIsWithinBounds(property, bounds) : true
    const meetsPrice =
      property.price >= filters.minPrice && property.price <= filters.maxPrice
    const meetsBeds = property.beds >= filters.minBeds
    const meetsBaths = property.baths >= filters.minBaths
    const meetsSqft = property.sqft >= filters.minSqft

    return withinBounds && meetsPrice && meetsBeds && meetsBaths && meetsSqft
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="grid gap-3 border-b border-border/70 bg-background/85 p-3 lg:grid-cols-[auto_auto_1fr] lg:items-center">
        <Button
          variant={controller.isSelectionMode ? "secondary" : "outline"}
          size="sm"
          onClick={controller.toggleSelectionMode}
        >
          <Search className="size-4" />
          {controller.isSelectionMode ? "Cancel" : "Search area"}
        </Button>
        <Button variant="ghost" size="sm" onClick={clearSelection}>
          <Home className="size-4" />
          Clear
        </Button>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <DollarSign className="size-4" />
            <span>{filteredProperties.length} properties</span>
          </div>
          {bounds && (
            <span>
              in selected area
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 flex-shrink-0 overflow-y-auto border-r border-border/70 bg-background">
          <div className="border-b border-border/70 p-3">
            <div className="flex items-center gap-2 text-sm font-medium mb-3">
              <Filter className="size-4" />
              Filters
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Min Price</label>
                <Input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: Number(e.target.value),
                    }))
                  }
                  className="h-8"
                  placeholder="$0"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Max Price</label>
                <Input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                  className="h-8"
                  placeholder="Any"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Min Beds</label>
                <Input
                  type="number"
                  value={filters.minBeds}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minBeds: Number(e.target.value),
                    }))
                  }
                  className="h-8"
                  min={0}
                  max={10}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Min Baths</label>
                <Input
                  type="number"
                  value={filters.minBaths}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minBaths: Number(e.target.value),
                    }))
                  }
                  className="h-8"
                  min={0}
                  max={10}
                />
              </div>
            </div>
          </div>

          <div className="p-3 space-y-2">
            {filteredProperties.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                No properties match your criteria
              </div>
            ) : (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className={`cursor-pointer rounded-md border border-border/50 p-3 transition-colors hover:bg-muted ${
                    selectedProperty?.id === property.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => setSelectedProperty(property)}
                >
                  <div className="font-medium text-sm">{property.title}</div>
                  <div className="text-primary font-semibold mt-1">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Bed className="size-3" />
                      {property.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="size-3" />
                      {property.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="size-3" />
                      {property.sqft} sqft
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <MapContainer
          center={INITIAL_CENTER}
          zoom={12}
          className="h-full w-full flex-1"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution={OSM_ATTRIBUTION}
          />
          {filteredProperties.map((property) => (
            <Marker
              key={property.id}
              position={property.position}
              icon={createMarkerIcon(selectedProperty?.id === property.id)}
              eventHandlers={{
                click: () => setSelectedProperty(property),
              }}
            >
              <Popup>
                <div className="p-1">
                  <div className="font-medium">{property.title}</div>
                  <div className="text-primary font-semibold">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {property.beds} bed, {property.baths} bath, {property.sqft} sqft
                  </div>
                </div>
              </Popup>
            </Marker>
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