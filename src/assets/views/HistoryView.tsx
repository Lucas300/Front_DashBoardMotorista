import { useState, useMemo } from 'react';
import type { Driver, Trip, TripStatus } from '../types';
import { ArrowLeft, Search, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface HistoryViewProps {
    trips: Trip[];
    drivers: Driver[];
    onTripClick: (trip: Trip, driver: Driver) => void;
    onBack: () => void;
    alertsFilter?: boolean;
}

const statusLabels: Record<TripStatus, string> = {
    em_andamento: 'Em Andamento',
    concluida: 'Concluída',
    cancelada: 'Cancelada',
};

const alertTypeLabel: Record<string, string> = {
    speeding: 'Velocidade',
    braking: 'Frenagem',
    route_deviation: 'Desvio',
    idle: 'Parado',
    geofence: 'Cerca',
};

const HistoryView = ({ trips, drivers, onTripClick, onBack, alertsFilter }: HistoryViewProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const getDriverById = (driverId: string): Driver | undefined => {
        return drivers.find(d => d.id === driverId);
    };

    const getDriverName = (driverId: string): string => {
        const driver = getDriverById(driverId);
        return driver?.name ?? 'Unknown';
    };

    const filteredTrips = useMemo(() => {
        let result = trips;

        // Apply alerts filter first if activated
        if (alertsFilter) {
            result = result.filter(trip => trip.alerts.length > 0)
                .sort((a, b) => b.alerts.length - a.alerts.length);
        }

        if (!searchQuery.trim()) {
            return result;
        }

        const query = searchQuery.toLowerCase();

        return result.filter(trip => {
            const driver = getDriverById(trip.driverId);
            const driverName = driver?.name.toLowerCase() ?? '';
            const vehicle = driver?.vehicle.toLowerCase() ?? '';
            const licensePlate = driver?.licensePlate.toLowerCase() ?? '';

            // Search across all visible fields
            const matchesDriver = driverName.includes(query);
            const matchesVehicle = vehicle.includes(query);
            const matchesLicensePlate = licensePlate.includes(query);
            const matchesDate = trip.date.toLowerCase().includes(query);
            const matchesStatus = statusLabels[trip.status].toLowerCase().includes(query);
            const matchesDistance = trip.distance.toString().includes(query);
            const matchesPlannedKm = trip.plannedKm.toString().includes(query);
            const matchesStartTime = trip.startTime.toLowerCase().includes(query);
            const matchesEndTime = trip.endTime.toLowerCase().includes(query);
            const matchesDelayed = trip.delayed ? 'atraso'.includes(query) || 'sim'.includes(query) : 'não'.includes(query) || 'nao'.includes(query);
            const matchesExceededKm = trip.exceededKm ? 'excedeu'.includes(query) || 'sim'.includes(query) : 'não'.includes(query) || 'nao'.includes(query);

            // Search in alerts
            const matchesAlerts = trip.alerts.some(alert =>
                alert.type.toLowerCase().includes(query) ||
                alertTypeLabel[alert.type]?.toLowerCase().includes(query) ||
                alert.description.toLowerCase().includes(query)
            );

            return matchesDriver || matchesVehicle || matchesLicensePlate || matchesDate ||
                matchesStatus || matchesDistance || matchesPlannedKm || matchesStartTime ||
                matchesEndTime || matchesDelayed || matchesExceededKm || matchesAlerts;
        });
    }, [trips, drivers, searchQuery, alertsFilter]);

    const handleTripClick = (trip: Trip) => {
        const driver = getDriverById(trip.driverId);
        if (driver) {
            onTripClick(trip, driver);
        }
    };

    return (
        <div className="view-full">
            <div className="view-top-bar">
                <button className="back-btn" onClick={onBack}>
                    <ArrowLeft size={16} />
                    <span>Voltar</span>
                </button>
            </div>

            <div className="table-container">
                <div className="table-toolbar">
                    <div className="table-toolbar-left">
                        <h2 className="table-title">{alertsFilter ? 'Viagens com Alertas' : 'Histórico de Viagens'}</h2>
                        <span className="cell-muted" style={{ fontSize: '13px', marginLeft: '8px' }}>
                            ({filteredTrips.length} {filteredTrips.length === 1 ? 'viagem' : 'viagens'})
                        </span>
                    </div>

                    <div className="table-toolbar-right">
                        <div className="search-bar">
                            <Search size={16} className="search-icon" />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Buscar por motorista, data, status, alertas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '320px' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Motorista</th>
                                <th>Data</th>
                                <th>Distância Real</th>
                                <th>KM Planejado</th>
                                <th>Status</th>
                                <th>Alertas</th>
                                <th>Atraso</th>
                                <th>Excedeu KM</th>
                                <th>Início</th>
                                <th>Final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrips.map((trip) => {
                                const driver = getDriverById(trip.driverId);
                                return (
                                    <tr
                                        key={trip.id}
                                        className="table-row"
                                        onClick={() => handleTripClick(trip)}
                                    >
                                        <td>
                                            <div className="driver-cell">
                                                <div
                                                    className="driver-dot"
                                                    style={{
                                                        background: driver?.status === 'online' || driver?.status === 'em_rota'
                                                            ? 'var(--green)'
                                                            : driver?.status === 'pausado'
                                                                ? 'var(--yellow)'
                                                                : 'var(--red)'
                                                    }}
                                                />
                                                <div>
                                                    <div className="driver-name">{driver?.name ?? 'Unknown'}</div>
                                                    <div className="cell-muted" style={{ fontSize: '11px' }}>
                                                        {driver?.vehicle}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="cell-muted">{trip.date}</td>
                                        <td>
                                            <span className="cell-highlight">{trip.distance} km</span>
                                        </td>
                                        <td className="cell-muted">{trip.plannedKm} km</td>
                                        <td>
                                            <span className={`status-badge ${trip.status === 'em_andamento' ? 'badge--paused' :
                                                    trip.status === 'concluida' ? 'badge--online' :
                                                        'badge--offline'
                                                }`}>
                                                {statusLabels[trip.status]}
                                            </span>
                                        </td>
                                        <td>
                                            {trip.alerts.length > 0 ? (
                                                <div className="alerts-cell">
                                                    <AlertTriangle size={14} className="text-amber-400" />
                                                    <span className="text-amber-400 text-sm">{trip.alerts.length}</span>
                                                    <span className="alert-types">
                                                        {trip.alerts.slice(0, 2).map((a) => alertTypeLabel[a.type] ?? a.type).join(', ')}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-sm">—</span>
                                            )}
                                        </td>
                                        <td>
                                            {trip.delayed ? (
                                                <div className="flag-cell flag-cell--danger">
                                                    <XCircle size={14} />
                                                    <span>Sim</span>
                                                </div>
                                            ) : (
                                                <div className="flag-cell flag-cell--ok">
                                                    <CheckCircle size={14} />
                                                    <span>Não</span>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {trip.exceededKm ? (
                                                <div className="flag-cell flag-cell--warning">
                                                    <XCircle size={14} />
                                                    <span>Sim</span>
                                                </div>
                                            ) : (
                                                <div className="flag-cell flag-cell--ok">
                                                    <CheckCircle size={14} />
                                                    <span>Não</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="cell-muted">{trip.startTime}</td>
                                        <td className="cell-muted">{trip.endTime}</td>
                                    </tr>
                                );
                            })}
                            {filteredTrips.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="empty-row">
                                        {searchQuery ? 'Nenhuma viagem encontrada para esta busca' : 'Nenhuma viagem encontrada'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HistoryView;
