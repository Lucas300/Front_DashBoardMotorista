import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Trip, Alert, BusStop } from '../../types';
import { formatTimeBR } from '../../utils/dateUtils';
import { Users, Clock, Eye, EyeOff } from 'lucide-react';

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

const createStopIcon = (stop: BusStop) => {
    const color = stop.type === 'high_traffic' ? '#8b5cf6' : '#3b82f6';
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="12" fill="${color}" opacity="0.25"/>
      <circle cx="14" cy="14" r="8" fill="${color}"/>
      <text x="14" y="18" text-anchor="middle" fill="white" font-size="9" font-weight="bold" font-family="sans-serif">P</text>
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
    const [showStops, setShowStops] = useState(true);
    const [minPassengers, setMinPassengers] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState('all');

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

    const getPeriod = (timeStr: string) => {
        if (timeStr.includes('AM')) {
            const hour = parseInt(timeStr.split(':')[0]);
            return (hour < 12) ? 'morning' : 'afternoon';
        }
        if (timeStr.includes('PM')) {
            const hour = parseInt(timeStr.split(':')[0]);
            return (hour >= 6 && hour < 12) || hour === 12 ? 'afternoon' : 'night';
        }
        return 'all';
    };

    const filteredStops = trip.stops.filter(s => {
        const passMatch = s.passengersBoarded >= minPassengers;
        const timePeriod = getPeriod(s.arrivalTime);
        const periodMatch = selectedPeriod === 'all' || timePeriod === selectedPeriod;
        return passMatch && periodMatch;
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
                {showStops && filteredStops.map((stop) => (
                    <Marker
                        key={stop.id}
                        position={[stop.position.lat, stop.position.lng]}
                        icon={createStopIcon(stop)}
                    >
                        <Popup className="stop-popup">
                            <div className="stop-popup-content">
                                <div className="stop-header">
                                    <div className={`stop-type-dot ${stop.type}`} />
                                    <span className="stop-name">{stop.name}</span>
                                </div>

                                <div className="stop-times">
                                    <div className="time-item">
                                        <Clock size={12} className="text-blue-400" />
                                        <span><b>Chegada:</b> {stop.arrivalTime}</span>
                                    </div>
                                    <div className="time-item">
                                        <Clock size={12} className="text-green-400" />
                                        <span><b>Saída:</b> {stop.departureTime}</span>
                                    </div>
                                </div>

                                <div className="stop-passengers">
                                    <div className="pass-item">
                                        <Users size={12} className="text-emerald-400" />
                                        <span><b>Embarque:</b> {stop.passengersBoarded}</span>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
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
                {/* Map Filter Controls */}
                <div className="map-controls mb-3 pb-3 border-b border-white/5">
                    <button
                        className={`control-btn ${showStops ? 'active' : ''}`}
                        onClick={() => setShowStops(!showStops)}
                    >
                        {showStops ? <Eye size={14} /> : <EyeOff size={14} />}
                        Paradas
                    </button>

                    <select
                        className="control-select"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="all">Todo o Dia</option>
                        <option value="morning">Manhã</option>
                        <option value="afternoon">Tarde</option>
                        <option value="night">Noite</option>
                    </select>

                    <select
                        className="control-select"
                        value={minPassengers}
                        onChange={(e) => setMinPassengers(Number(e.target.value))}
                    >
                        <option value="0">Embarques</option>
                        <option value="5">+5 Passag.</option>
                        <option value="10">+10 Passag.</option>
                    </select>
                </div>

                <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#10b981' }} />
                    <span>Origem</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#3b82f6' }} />
                    <span>Destino</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#3b82f6', border: '2px solid white' }} />
                    <span>Parada</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#8b5cf6', border: '2px solid white' }} />
                    <span>Alto Fluxo</span>
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
