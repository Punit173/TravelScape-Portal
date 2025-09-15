import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import StatsCard from "./StatsCard";
import TouristMap from "./TouristMap";
import {
  UserIcon,
  ExclamationCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

// 🔹 Reverse geocode lat/lng -> human-readable address via OpenStreetMap
async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`,
      { headers: { "User-Agent": "tourist-tracking-app" } }
    );
    const data = await res.json();
    return data.display_name || "Unknown location";
  } catch (e) {
    console.error("Geocode error:", e);
    return "Unknown location";
  }
}

export default function TouristTracking() {
  const [tourists, setTourists] = useState([]);
  const [selectedTourist, setSelectedTourist] = useState(null);

  useEffect(() => {
    const db = getFirestore();

    const unsub = onSnapshot(collection(db, "LiveLocations"), async (snap) => {
      const enriched = await Promise.all(
        snap.docs.map(async (d) => {
          const loc = d.data();
          const userRef = doc(db, "users", loc.userId);
          const userSnap = await getDoc(userRef);

          let userData = {};
          if (userSnap.exists()) userData = userSnap.data();

          // ✅ derive address from lat/lng, ignore Firestore address
          let derivedAddress = "Unknown";
          if (loc.latitude && loc.longitude) {
            derivedAddress = await reverseGeocode(loc.latitude, loc.longitude);
          }

          return {
            id: d.id,
            userId: loc.userId,
            name: userData.name || loc.userName,
            email: userData.email,
            contactNumber: userData.contactNumber,
            age: userData.age,
            gender: userData.gender,
            aadharNumber: userData.aadharNumber,
            address: derivedAddress, // ✅ always OSM derived
            status: "Active",
            safetyScore: 85,
            lastSeen: loc.timestamp?.toDate
              ? loc.timestamp.toDate().toISOString()
              : new Date().toISOString(),
            riskLevel: "Low",
            coordinates: { lat: loc.latitude, lng: loc.longitude },
          };
        })
      );
      setTourists(enriched);
    });

    return () => unsub();
  }, []);

  const columns = [
    { key: "name", label: "Tourist Name", sortable: true },
    { key: "address", label: "Current Address", sortable: false }, // ✅ show derived address
    { key: "status", label: "Status", sortable: true },
    {
      key: "safetyScore",
      label: "Safety Score",
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              row.safetyScore >= 80
                ? "bg-green-500"
                : row.safetyScore >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          />
          {row.safetyScore}
        </div>
      ),
    },
    {
      key: "lastSeen",
      label: "Last Seen",
      sortable: true,
      render: (row) => new Date(row.lastSeen).toLocaleString(),
    },
    {
      key: "riskLevel",
      label: "Risk Level",
      sortable: true,
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.riskLevel === "Low"
              ? "bg-green-100 text-green-800"
              : row.riskLevel === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.riskLevel}
        </span>
      ),
    },
  ];

  const stats = [
    {
      title: "Active Tourists",
      value: tourists.length.toString(),
      icon: UserIcon,
      trend: { direction: "up", value: "+12%" },
      color: "blue",
    },
    {
      title: "High Risk Areas",
      value: tourists.filter((t) => t.riskLevel === "High").length.toString(),
      icon: ExclamationCircleIcon,
      trend: { direction: "neutral", value: "No change" },
      color: "red",
    },
    {
      title: "Average Safety Score",
      value:
        tourists.length > 0
          ? (
              tourists.reduce((sum, t) => sum + (t.safetyScore || 0), 0) /
              tourists.length
            ).toFixed(0)
          : "N/A",
      icon: MapPinIcon,
      trend: { direction: "up", value: "+5%" },
      color: "green",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Table + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Tourist Tracking
            </h3>
          </div>
          <div className="p-6">
            <DataTable
              columns={columns}
              data={tourists}
              onRowClick={setSelectedTourist}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Live Map</h3>
          </div>
          <div className="p-6">
            <TouristMap
              tourists={tourists}
              selectedTourist={selectedTourist}
            />
          </div>
        </div>
      </div>

      {/* Tourist details modal */}
      {selectedTourist && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">
                Tourist Details
              </h3>
              <button
                onClick={() => setSelectedTourist(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            <div className="mt-4">
              <pre className="bg-gray-50 p-4 rounded">
                {JSON.stringify(selectedTourist, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
