
import { useMemo } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import type { Driver } from "../../types/trip";

interface MapCardProps {
  selectedDriver?: Driver | null;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "24px",
};

// Rota padrão (mapa principal)
const DEFAULT_ROUTE_COORDS = [
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

const mapOptions = {
  styles: darkMapStyle,
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
};

export default function MapCard({ selectedDriver }: MapCardProps) {
  // Se há um motorista selecionado, usa a rota dele, senão usa a padrão
  const routeCoords = selectedDriver?.route || DEFAULT_ROUTE_COORDS;
  const center = routeCoords[0];
  
  // Memoize as opções do mapa para evitar re-renders
  const options = useMemo(() => mapOptions, []);
  
  // Define o título do card baseado no estado
  const cardTitle = selectedDriver 
    ? `Rota: ${selectedDriver.name} - ${selectedDriver.car}`
    : "Mapa Principal";

  return (
    <section className="relative w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={options}
      >
        {/* Linha da rota */}
        <Polyline
          path={routeCoords}
          options={{
            strokeColor: selectedDriver ? "#f59e0b" : "#00BFFF",
            strokeOpacity: 1,
            strokeWeight: 6,
          }}
        />

        {/* Marcador inicial */}
        <Marker
          position={routeCoords[0]}
          label={{
            text: "I",
            color: "white",
            fontWeight: "bold",
          }}
        />

        {/* Marcador final */}
        <Marker
          position={routeCoords[routeCoords.length - 1]}
          label={{
            text: "F",
            color: "white",
            fontWeight: "bold",
          }}
        />
      </GoogleMap>

      {/* Card do motorista ou info padrão */}
      <div className="absolute top-4 right-4 bg-[#0f1b2d] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-10">
        {selectedDriver ? (
          <>
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border-2 border-amber-400">
              <span className="text-amber-400 font-bold text-lg">
                {selectedDriver.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-400">
                {selectedDriver.car} • {selectedDriver.distanceKm}km
              </p>
              <p className="font-semibold text-lg text-amber-400">
                {selectedDriver.name}
              </p>
              <p className="text-xs text-red-400">
                Ociosidade: {selectedDriver.ociosidadeMinutos}min
              </p>
            </div>
          </>
        ) : (
          <>
            <img
              src="https://i.pravatar.cc/100"
              alt="driver"
              className="w-12 h-12 rounded-full border-2 border-cyan-400"
            />
            <div>
              <p className="text-sm text-gray-400">Status: Online</p>
              <p className="font-semibold text-lg">01:18:34</p>
            </div>
          </>
        )}
      </div>
      
      {/* Label de título do mapa */}
      <div className="absolute top-4 left-4 bg-[#0f1b2d]/90 text-white px-4 py-2 rounded-xl shadow-lg z-10">
        <p className="text-sm font-medium">{cardTitle}</p>
      </div>
    </section>
  );
}

