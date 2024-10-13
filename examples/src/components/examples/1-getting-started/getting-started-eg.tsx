import { useTheme } from "@/components/theme-provider";
import { MapContainer, TileLayer } from "react-leaflet";
import { SelectArea } from "react-leaflet-select-area";

const GettingStartedExample = () => {
  const { theme } = useTheme(); // Get the current theme: light or dark or system

  // Define the tile URLs for light and dark modes
  const lightTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTileUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      className="h-full w-full"
      zoomControl={false}
    >
      {/* Use the appropriate tile layer based on the current theme */}
      <TileLayer
        url={theme === "dark" ? darkTileUrl : lightTileUrl}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <SelectArea />
    </MapContainer>
  );
};

export default GettingStartedExample;
