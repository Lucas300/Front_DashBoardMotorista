import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "24px",
};

const ROUTE_COORDS = [
  { lat: -23.55052, lng: -46.633308 },
  { lat: -23.559616, lng: -46.658823 },
  { lat: -23.563987, lng: -46.654321 },
  { lat: -23.56789, lng: -46.64 },
];

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0a0f1f" }],
  },
];

export default function MapCard() {
  return (
    <section className="relative w-full">
      <LoadScript googleMapsApiKey="SUA_API_KEY_AQUI">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={ROUTE_COORDS[0]}
          zoom={14}
          options={{
            styles: darkMapStyle,
            disableDefaultUI: true,
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {/* Linha da rota */}
          <Polyline
            path={ROUTE_COORDS}
            options={{
              strokeColor: "#00BFFF",
              strokeOpacity: 1,
              strokeWeight: 6,
            }}
          />

          {/* Marcador inicial */}
          <Marker
            position={ROUTE_COORDS[0]}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#00BFFF",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#ffffff",
            }}
          />

          {/* Marcador final */}
          <Marker
            position={ROUTE_COORDS[ROUTE_COORDS.length - 1]}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#00BFFF",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#ffffff",
            }}
          />
        </GoogleMap>
      </LoadScript>

      {/* Card do motorista */}
      <div className="absolute top-4 right-4 bg-[#0f1b2d] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100"
          alt="driver"
          className="w-12 h-12 rounded-full border-2 border-cyan-400"
        />
        <div>
          <p className="text-sm text-gray-400">Status: Online</p>
          <p className="font-semibold text-lg">01:18:34</p>
        </div>
      </div>
    </section>
  );
}