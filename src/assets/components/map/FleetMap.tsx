import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Driver } from '../../types';

// Fix leaflet default icons
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const getStatusColor = (status: Driver['status']) => {
    switch (status) {
        case 'em_rota': return '#10b981';
        case 'online': return '#3b82f6';
        case 'pausado': return '#f59e0b';
        case 'offline': return '#ef4444';
        default: return '#6b7280';
    }
};

const getStatusLabel = (status: Driver['status']) => {
    switch (status) {
        case 'em_rota': return 'Em Rota';
        case 'online': return 'Online';
        case 'pausado': return 'Pausado';
        case 'offline': return 'Offline';
        default: return 'Desconhecido';
    }
};

const createDriverIcon = (status: Driver['status'], name: string) => {
    const color = getStatusColor(status);
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>
      <circle cx="22" cy="20" r="18" fill="${color}" filter="url(#shadow)" opacity="0.3"/>
      <circle cx="22" cy="20" r="14" fill="#1a2744" stroke="${color}" stroke-width="2.5"/>
      <text x="22" y="25" text-anchor="middle" fill="${color}" font-size="11" font-weight="700" font-family="Inter,sans-serif">${initials}</text>
      <polygon points="22,44 16,36 28,36" fill="${color}"/>
    </svg>
  `;
    return L.divIcon({
        html: svg,
        className: '',
        iconSize: [44, 54],
        iconAnchor: [22, 44],
        popupAnchor: [0, -44],
    });
};

interface FleetMapProps {
    drivers: Driver[];
    onDriverClick?: (driver: Driver) => void;
}

const FleetMap = ({ drivers, onDriverClick }: FleetMapProps) => {
    useEffect(() => {
        // Invalidate map size on mount
        window.dispatchEvent(new Event('resize'));
    }, []);

    const center = { lat: -23.5505, lng: -46.6333 };

    return (
        <div className="fleet-map-wrapper">
            <MapContainer
                center={[center.lat, center.lng]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                className="fleet-map"
                zoomControl={true}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {drivers.map((driver) => (
                    <Marker
                        key={driver.id}
                        position={[driver.position.lat, driver.position.lng]}
                        icon={createDriverIcon(driver.status, driver.name)}
                        eventHandlers={{
                            click: () => onDriverClick?.(driver),
                        }}
                    >
                        <Popup className="fleet-popup">
                            <div className="popup-content">
                                <div className="popup-header">
                                    <span className="popup-name">{driver.name}</span>
                                    <span className={`popup-status`} style={{ color: getStatusColor(driver.status) }}>
                                        ● {getStatusLabel(driver.status)}
                                    </span>
                                </div>
                                <div className="popup-details">
                                    <span>🚗 {driver.vehicle}</span>
                                    <span>⏱ {driver.onlineTime}</span>
                                    <span>📍 {driver.kmToday} km hoje</span>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
                {/* Pulse rings for online/em_rota drivers */}
                {drivers
                    .filter((d) => d.status === 'em_rota' || d.status === 'online')
                    .map((driver) => (
                        <Circle
                            key={`ring-${driver.id}`}
                            center={[driver.position.lat, driver.position.lng]}
                            radius={400}
                            pathOptions={{ color: getStatusColor(driver.status), fillColor: getStatusColor(driver.status), fillOpacity: 0.08, weight: 1, opacity: 0.4 }}
                        />
                    ))}
            </MapContainer>
        </div>
    );
};

export default FleetMap;
