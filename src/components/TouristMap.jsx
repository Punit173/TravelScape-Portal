// components/TouristMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function TouristMap({ tourists = [], selectedTourist }) {
  const center = tourists.length
    ? [tourists[0].coordinates.lat, tourists[0].coordinates.lng]
    : [20.5937, 78.9629]; // Default: India center

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      {/* OpenStreetMap tiles */}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Tourist markers */}
      {tourists.map((t) => (
        <Marker
          key={t.id}
          position={[t.coordinates.lat, t.coordinates.lng]}
        >
          <Popup>
            <strong>{t.name}</strong>
            <br />
            {t.address || "Fetching address..."}
            <br />
            Last seen: {new Date(t.lastSeen).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
