import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Trip, Alert } from '../../types';
import { formatTimeBR } from '../../utils/dateUtils';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createAlertIcon = (alert: Alert) => {
    const colors: Record<Alert['type'], string> = {
        speeding: '#ef4444',
        braking: '#f59e0b',
        route_deviation: '#8b5cf6',
        idle: '#6b7280',
        geofence: '#06b6d4',
    };
    const color = colors[alert.type];
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="12" fill="${color}" opacity="0.25"/>
      <circle cx="14" cy="14" r="8" fill="${color}"/>
      <text x="14" y="18" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">!</text>
    </svg>
  `;
    return L.divIcon({ html: svg, className: '', iconSize: [28, 28], iconAnchor: [14, 14] });
};

const startIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="#10b981" stroke="white" stroke-width="2"/><text x="16" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">A</text></svg>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const endIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="#3b82f6" stroke="white" stroke-width="2"/><text x="16" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">B</text></svg>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

interface TripMapProps {
    trip: Trip;
}

const TripMap = ({ trip }: TripMapProps) => {
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, []);

    const center = trip.route[Math.floor(trip.route.length / 2)];
    const hasPlannedRoute = !!trip.plannedRoute;
    const isOngoing = trip.status === 'em_andamento';
    const isCompleted = trip.status === 'concluida';

    // Get the marker position based on trip status
    const getMarkerPosition = () => {
        if (isOngoing && trip.route.length > 0) {
            return trip.route[trip.route.length - 1];
        }
        if (isCompleted) {
            return trip.destination;
        }
        return null;
    };

    const markerPosition = getMarkerPosition();

    // Create a custom icon for current position marker
    const currentPositionIcon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="#ef4444" stroke="white" stroke-width="2"/><text x="16" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">●</text></svg>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });

    return (
        <div className="fleet-map-wrapper">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="fleet-map"
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                />
                {/* Planned route - always green (#10b981) */}
                {hasPlannedRoute && (
                    <Polyline
                        positions={trip.plannedRoute!.map((p) => [p.lat, p.lng])}
                        pathOptions={{ color: '#10b981', weight: 5, opacity: 0.9 }}
                    />
                )}
                {/* Real route - red (#ef4444) when plannedRoute exists, otherwise green (#10b981) */}
                <Polyline
                    positions={trip.route.map((p) => [p.lat, p.lng])}
                    pathOptions={{
                        color: hasPlannedRoute ? '#ef4444' : '#10b981',
                        weight: 5,
                        opacity: 0.9
                    }}
                />
                {/* Origin marker */}
                <Marker position={[trip.origin.lat, trip.origin.lng]} icon={startIcon}>
                    <Popup>Origem da viagem</Popup>
                </Marker>
                {/* Destination marker */}
                <Marker position={[trip.destination.lat, trip.destination.lng]} icon={endIcon}>
                    <Popup>Destino da viagem</Popup>
                </Marker>
                {/* Current position marker for ongoing or completed trips */}
                {markerPosition && (
                    <Marker position={[markerPosition.lat, markerPosition.lng]} icon={currentPositionIcon}>
                        <Popup>
                            {isOngoing ? 'Posição atual (em andamento)' : 'Posição final (concluída)'}
                        </Popup>
                    </Marker>
                )}
                {/* Alert markers */}
                {trip.alerts.map((alert) => (
                    <Marker
                        key={alert.id}
                        position={[alert.position.lat, alert.position.lng]}
                        icon={createAlertIcon(alert)}
                    >
                        <Popup>
                            <div>
                                <strong>⚠ {alert.description}</strong>
                                <br />
                                <small>{formatTimeBR(alert.timestamp)}</small>
                            </div>
                        </Popup>
                    </Marker>
                ))}
                {/* Pulse ring at destination */}
                <Circle
                    center={[trip.destination.lat, trip.destination.lng]}
                    radius={200}
                    pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1, weight: 1 }}
                />
            </MapContainer>

            {/* Trip info overlay */}
            <div className="trip-map-legend">
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#10b981' }} />
                    <span>Origem</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#3b82f6' }} />
                    <span>Destino</span>
                </div>
                {trip.alerts.length > 0 && (
                    <div className="legend-item">
                        <span className="legend-dot" style={{ background: '#ef4444' }} />
                        <span>{trip.alerts.length} Alerta(s)</span>
                    </div>
                )}
                {hasPlannedRoute ? (
                    <>
                        <div className="legend-item">
                            <span className="legend-line" style={{ background: '#10b981' }} />
                            <span>Rota Planejada</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-line" style={{ background: '#ef4444' }} />
                            <span>Rota Real</span>
                        </div>
                    </>
                ) : (
                    <div className="legend-item">
                        <span className="legend-line" style={{ background: '#10b981' }} />
                        <span>Rota</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripMap;
