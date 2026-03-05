import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { Driver } from '../../types';

interface DriversTableProps {
    drivers: Driver[];
    onDriverClick: (driver: Driver) => void;
}

const statusConfig: Record<Driver['status'], { label: string; color: string; dot: string }> = {
    em_rota: { label: 'Em rota', color: 'badge--online', dot: 'bg-emerald-500' },
    online: { label: 'Online', color: 'badge--online', dot: 'bg-blue-500' },
    pausado: { label: 'Pausado', color: 'badge--paused', dot: 'bg-yellow-500' },
    offline: { label: 'Offline', color: 'badge--offline', dot: 'bg-red-500' },
};

const DriversTable = ({ drivers, onDriverClick }: DriversTableProps) => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filtered = drivers.filter((d) => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || d.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="table-container">
            <div className="table-toolbar">
                <h2 className="table-title">Motoristas</h2>
                <div className="table-toolbar-right">
                    <div className="status-filter">
                        <select
                            className="filter-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Status</option>
                            <option value="em_rota">Em rota</option>
                            <option value="online">Online</option>
                            <option value="pausado">Pausado</option>
                            <option value="offline">Offline</option>
                        </select>
                        <ChevronDown size={14} className="filter-chevron" />
                    </div>
                </div>
            </div>

            <div className="search-bar">
                <Search size={16} className="search-icon" />
                <input
                    type="text"
                    placeholder="Pesquisar motorista..."
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="data-table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Motorista</th>
                            <th>Carro</th>
                            <th>Status</th>
                            <th>Distância</th>
                            <th>Início</th>
                            <th>Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((driver) => {
                            const cfg = statusConfig[driver.status];
                            return (
                                <tr
                                    key={driver.id}
                                    className="table-row"
                                    onClick={() => onDriverClick(driver)}
                                >
                                    <td>
                                        <div className="driver-cell">
                                            <span className={`driver-dot ${cfg.dot}`} />
                                            <span className="driver-name">{driver.name}</span>
                                        </div>
                                    </td>
                                    <td className="cell-muted">{driver.licensePlate}</td>
                                    <td>
                                        <span className={`status-badge ${cfg.color}`}>{cfg.label}</span>
                                    </td>
                                    <td className="cell-muted">{driver.kmToday} km</td>
                                    <td className="cell-muted">{driver.lastSeen}</td>
                                    <td className="cell-muted">
                                        {driver.status === 'em_rota' ? 'Em andamento' : 'Concluído'}
                                    </td>
                                </tr>
                            );
                        })}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="empty-row">Nenhum motorista encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriversTable;
