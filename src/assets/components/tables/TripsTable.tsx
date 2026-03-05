import type { Trip } from '../../types';
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react';
import { formatDateBR, formatTimeBR } from '../../utils/dateUtils';

interface TripsTableProps {
    trips: Trip[];
    driverName: string;
    onTripClick: (trip: Trip) => void;
    onBack: () => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

const alertTypeLabel: Record<string, string> = {
    speeding: 'Velocidade',
    braking: 'Frenagem',
    route_deviation: 'Desvio',
    idle: 'Parado',
    geofence: 'Cerca',
};

const TripsTable = ({ trips, driverName, onTripClick, onBack, searchQuery = '', onSearchChange }: TripsTableProps) => {
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
                {onSearchChange && (
                    <div className="search-bar">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Buscar em todas as colunas..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                )}
            </div>

            <div className="data-table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Distância Real</th>
                            <th>KM Planejado</th>
                            <th>Alertas</th>
                            <th>Atraso</th>
                            <th>Excedeu KM</th>
                            <th>Início</th>
                            <th>Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip) => (
                            <tr key={trip.id} className="table-row" onClick={() => onTripClick(trip)}>
                                <td className="cell-muted">{formatDateBR(trip.date)}</td>
                                <td>
                                    <span className="cell-highlight">{trip.distance} km</span>
                                </td>
                                <td className="cell-muted">{trip.plannedKm} km</td>
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
