import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px"
};

const ROUTE_COORDS = [
  { lat: -23.55052, lng: -46.633308 },
  { lat: -23.559616, lng: -46.658823 },
  { lat: -23.563987, lng: -46.654321 },
  { lat: -23.567890, lng: -46.640000 },
];

export default function MapCard() {
  return (
    <section className="map-card">
      <LoadScript googleMapsApiKey="AIzaSyDwTXVxmkgHWUeuDvcFKnX4vNtnlT1Nrx0">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={ROUTE_COORDS[0]}
          zoom={14}
        >
          <Polyline
            path={ROUTE_COORDS}
            options={{
              strokeColor: "#1E90FF",
              strokeWeight: 5
            }}
          />

          <Marker position={ROUTE_COORDS[0]} />
          <Marker position={ROUTE_COORDS[ROUTE_COORDS.length - 1]} />
        </GoogleMap>
      </LoadScript>

      {/* Card do motorista pode ser adicionado aqui */}
      {/*
      <div className="driver-card">
        <img src="/src/assets/react.svg" alt="driver" />
        <div className="driver-info">
          <div className="name">Sérgio N. Cidra</div>
          <div className="timer">01:18:34</div>
        </div>
      </div>
      */}
    </section>
  );
}