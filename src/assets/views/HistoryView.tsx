import { useState, useMemo } from 'react';
import type { Driver, Trip, TripStatus } from '../types';
import { AlertTriangle } from 'lucide-react';
import { formatDateBR, formatTimeBR } from '../utils/dateUtils';
import TableSearchFilter from '../components/tables/TableSearchFilter';

interface HistoryViewProps {
    trips: Trip[];
    drivers: Driver[];
    onTripClick: (trip: Trip, driver: Driver) => void;
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

const HistoryView = ({ trips, drivers, onTripClick, alertsFilter }: HistoryViewProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const getDriverById = (driverId: string): Driver | undefined => {
        return drivers.find(d => d.id === driverId);
    };

    const filteredTrips = useMemo(() => {
        let result = trips;

        // Apply alerts filter first if activated (internal component filter)
        if (alertsFilter) {
            result = result.filter(trip => trip.alerts.length > 0)
                .sort((a, b) => b.alerts.length - a.alerts.length);
        }

        // Apply Dropdown Filter Logic
        if (selectedFilter !== 'all') {
            result = result.filter(trip => {
                switch (selectedFilter) {
                    case 'exceededKm':
                        return trip.exceededKm === true;
                    case 'speeding':
                        return trip.alerts.some(a => a.type === 'speeding');
                    case 'route_deviation':
                        return trip.alerts.some(a => a.type === 'route_deviation');
                    case 'delayed':
                        return trip.delayed === true;
                    default:
                        return true;
                }
            });
        }

        // Apply Search Query Logic (Search works together with dropdown)
        if (!searchQuery.trim()) {
            return result;
        }

        const query = searchQuery.toLowerCase();

        return result.filter(trip => {
            const driver = getDriverById(trip.driverId);
            const driverName = driver?.name.toLowerCase() ?? '';

            const dataMap: Record<string, string> = {
                driver: driverName,
                date: formatDateBR(trip.date).toLowerCase(),
                status: statusLabels[trip.status].toLowerCase(),
                distance: trip.distance.toString(),
                plannedKm: trip.plannedKm.toString(),
                startTime: formatTimeBR(trip.startTime).toLowerCase(),
                endTime: formatTimeBR(trip.endTime).toLowerCase(),
                delayed: trip.delayed ? 'sim' : 'não',
                exceededKm: trip.exceededKm ? 'sim' : 'não',
                alerts: trip.alerts.map(a => `${a.type} ${alertTypeLabel[a.type] ?? ''} ${a.description}`).join(' ').toLowerCase()
            };

            return Object.values(dataMap).some(val => val.includes(query));
        });
    }, [trips, drivers, searchQuery, selectedFilter, alertsFilter]);

    const handleTripClick = (trip: Trip) => {
        const driver = getDriverById(trip.driverId);
        if (driver) {
            onTripClick(trip, driver);
        }
    };

    return (
        <div className="view-full">
            <div className="table-container">
                <div className="table-toolbar">
                    <div className="table-toolbar-left">
                        <h2 className="table-title">{alertsFilter ? 'Viagens com Alertas' : 'Histórico de Viagens'}</h2>
                        <span className="cell-muted" style={{ fontSize: '13px', marginLeft: '8px' }}>
                            ({filteredTrips.length} {filteredTrips.length === 1 ? 'viagem' : 'viagens'})
                        </span>
                    </div>

                    <div className="table-toolbar-right">
                        <TableSearchFilter
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            selectedFilter={selectedFilter}
                            onFilterChange={setSelectedFilter}
                            placeholder="Buscar por motorista, data..."
                        />
                    </div>
                </div>

                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Motorista</th>
                                <th>Matrícula</th>
                                <th>Data</th>
                                <th>Real</th>
                                <th>Plan</th>
                                <th>Status</th>
                                <th>Alertas</th>
                                <th>Atraso</th>
                                <th>KM+</th>
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
                                        <td className="cell-muted" style={{ whiteSpace: 'nowrap' }}>
                                            {driver?.registrationNumber}
                                        </td>
                                        <td className="cell-muted">{formatDateBR(trip.date)}</td>
                                        <td>
                                            <span className="cell-highlight">{trip.distance}</span>
                                        </td>
                                        <td className="cell-muted">{trip.plannedKm}</td>
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
                                            <span className={trip.delayed ? 'text-red-500 font-semibold' : 'text-gray-500 opactiy-50'}>
                                                {trip.delayed ? 'Sim' : 'Não'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={trip.exceededKm ? 'text-amber-500 font-semibold' : 'text-gray-500 opacity-50'}>
                                                {trip.exceededKm ? 'Sim' : 'Não'}
                                            </span>
                                        </td>
                                        <td className="cell-muted">{formatTimeBR(trip.startTime)}</td>
                                        <td className="cell-muted">{formatTimeBR(trip.endTime)}</td>
                                    </tr>
                                );
                            })}
                            {filteredTrips.length === 0 && (
                                <tr>
                                    <td colSpan={11} className="empty-row">
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
