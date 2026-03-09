import type { Trip } from '../../types';
import { AlertTriangle, ArrowLeft, ChevronRight } from 'lucide-react';
import { formatDateBR, formatTimeBR } from '../../utils/dateUtils';
import TableSearchFilter from './TableSearchFilter';

interface TripsTableProps {
    trips: Trip[];
    driverName: string;
    onTripClick: (trip: Trip) => void;
    onBack: () => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
    selectedFilter?: string;
    onFilterChange?: (filter: string) => void;
}

const alertTypeLabel: Record<string, string> = {
    speeding: 'Velocidade',
    braking: 'Frenagem',
    route_deviation: 'Desvio',
    idle: 'Parado',
    geofence: 'Cerca',
};

const TripsTable = ({
    trips,
    driverName,
    onTripClick,
    onBack,
    searchQuery = '',
    onSearchChange,
    selectedFilter = 'all',
    onFilterChange
}: TripsTableProps) => {
    return (
        <div className="table-container">
            <div className="table-toolbar">
                <div className="table-toolbar-left">
                    <button className="back-btn" onClick={onBack}>
                        <ArrowLeft size={16} />
                        <span>Voltar</span>
                    </button>
                    <h2 className="table-title">Corridas — {driverName}</h2>
                </div>
                {onSearchChange && onFilterChange && (
                    <TableSearchFilter
                        searchQuery={searchQuery}
                        onSearchChange={onSearchChange}
                        selectedFilter={selectedFilter}
                        onFilterChange={onFilterChange}
                        placeholder="Buscar nesta tabela..."
                    />
                )}
            </div>

            <div className="data-table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Real</th>
                            <th>Plan</th>
                            <th>Alertas</th>
                            <th>Atraso</th>
                            <th>KM+</th>
                            <th>Início</th>
                            <th>Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip) => (
                            <tr key={trip.id} className="table-row" onClick={() => onTripClick(trip)}>
                                <td className="cell-muted">{formatDateBR(trip.date)}</td>
                                <td>
                                    <span className="cell-highlight">{trip.distance}</span>
                                </td>
                                <td className="cell-muted">{trip.plannedKm}</td>
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
                                    <span className={trip.delayed ? 'text-red-500 font-semibold' : 'text-gray-500 opacity-50'}>
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
                        ))}
                        {trips.length === 0 && (
                            <tr>
                                <td colSpan={8} className="empty-row">Nenhuma corrida encontrada</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TripsTable;
