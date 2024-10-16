import { MapContainer, TileLayer } from "react-leaflet";
import { SelectArea } from "react-leaflet-select-area";

const BasicExample = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SelectArea onBoundsChange={(bounds) => console.log(bounds)} />
    </MapContainer>
  );
};

export default BasicExample;
