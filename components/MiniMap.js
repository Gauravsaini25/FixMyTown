"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { statusColor } from "@/lib/mockData";

// Dynamically import react-leaflet components (no SSR)
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function MiniMap({ issues }) {
  const [L, setL] = useState(null);

  // Load Leaflet only on client
  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) return <div className="h-full w-full flex items-center justify-center text-slate-500">Loading map...</div>;

  return (
    <MapContainer
      center={[18.52, 73.8567]}
      zoom={13}
      className="h-full w-full rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <span class="text-blue-600 font-medium">OpenStreetMap</span> contributors'
      />

      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.lat, issue.lng]}
          icon={L.divIcon({
            className: "custom-icon",
            html: `
              <span style="
                background:${statusColor[issue.status]};
                width:16px; height:16px;
                display:inline-block;
                border-radius:50%;
                border:2px solid white;
                box-shadow: 0 0 6px rgba(0,0,0,0.2);
              "></span>
            `,
          })}
        >
          <Popup>
            <div class="p-2">
              <h3 class="font-semibold text-slate-800 text-sm mb-1">${issue.title}</h3>
              <p class="text-xs text-slate-600">
                <span class="font-medium">Category:</span> ${issue.category} <br/>
                <span class="font-medium">Status:</span> 
                <span style="color:${statusColor[issue.status]}">${issue.status}</span> <br/>
                <span class="font-medium">Reported:</span> ${issue.reportedAt}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
