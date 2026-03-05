import { ArrowLeft, Trophy, Medal } from 'lucide-react';
import type { Driver, Trip } from '../types';

interface IdleRankingViewProps {
    drivers: Driver[];
    trips: Trip[];
    onBack: () => void;
    onDriverClick?: (driver: Driver) => void;
}

interface DriverRanking {
    driver: Driver;
    rank: number;
    totalTrips: number;
    totalAlerts: number;
}

const IdleRankingView = ({ drivers, trips, onBack, onDriverClick }: IdleRankingViewProps) => {
    // Sort drivers by idleKm descending and create ranking data
    const sortedDrivers = [...drivers].sort((a, b) => b.idleKm - a.idleKm);

    const rankingData: DriverRanking[] = sortedDrivers.map((driver, index) => {
        const driverTrips = trips.filter(t => t.driverId === driver.id);
        const totalAlerts = driverTrips.reduce((sum, trip) => sum + trip.alerts.length, 0);

        return {
            driver,
            rank: index + 1,
            totalTrips: driverTrips.length,
            totalAlerts,
        };
    });

    const getRankBadge = (rank: number) => {
        if (rank === 1) {
            return (
                <div className="rank-badge rank-badge--gold">
                    <Trophy size={14} />
                    <span>#1</span>
                </div>
            );
        }
        if (rank === 2) {
            return (
                <div className="rank-badge rank-badge--silver">
                    <Medal size={14} />
                    <span>#2</span>
                </div>
            );
        }
        if (rank === 3) {
            return (
                <div className="rank-badge rank-badge--bronze">
                    <Medal size={14} />
                    <span>#3</span>
                </div>
            );
        }
        return <div className="rank-badge rank-badge--default">#{rank}</div>;
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
                        <h1 className="table-title">Ranking de Motoristas Ociosos</h1>
                    </div>
                </div>

                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}>Posição</th>
                                <th>Motorista</th>
                                <th style={{ width: '120px' }}>KM Ocioso</th>
                                <th style={{ width: '120px' }}>Total de Viagens</th>
                                <th style={{ width: '120px' }}>Total de Alertas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankingData.map(({ driver, rank, totalTrips, totalAlerts }) => (
                                <tr
                                    key={driver.id}
                                    className="table-row"
                                    onClick={() => onDriverClick?.(driver)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>
                                        {getRankBadge(rank)}
                                    </td>
                                    <td>
                                        <div className="driver-cell">
                                            <img
                                                src={driver.avatar}
                                                alt={driver.name}
                                                className="driver-avatar-small"
                                            />
                                            <div>
                                                <div className="driver-name">{driver.name}</div>
                                                <div className="cell-muted" style={{ fontSize: '11px' }}>
                                                    {driver.vehicle}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cell-highlight idle-km">
                                            {driver.idleKm.toFixed(1)} km
                                        </div>
                                    </td>
                                    <td>
                                        <span className="cell-muted">{totalTrips}</span>
                                    </td>
                                    <td>
                                        <span className={totalAlerts > 0 ? 'alerts-count' : 'cell-muted'}>
                                            {totalAlerts}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default IdleRankingView;
