import { MapContainer, TileLayer } from "react-leaflet"
import { SelectArea } from "react-leaflet-select-area"

export default function GettingStartedExample() {
  return (
    <MapContainer
      center={[28.6315, 77.2167]}
      zoom={13}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SelectArea
        keepRectangle
        showControl
        options={{ color: "#059669", weight: 2 }}
      />
    </MapContainer>
  )
}
