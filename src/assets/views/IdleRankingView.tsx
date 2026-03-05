import { Trophy, Medal } from 'lucide-react';
import type { Driver, Trip } from '../types';
import { calculateTripIdleKm } from '../utils/tripUtils';
import { useMemo } from 'react';

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
    totalIdleKm: number;
}

const IdleRankingView = ({ drivers, trips, onDriverClick }: IdleRankingViewProps) => {
    // Calculate ranking data with dynamic idle KM
    const rankingData: DriverRanking[] = useMemo(() => {
        const data = drivers.map(driver => {
            const driverTrips = trips.filter(t => t.driverId === driver.id);
            const totalAlerts = driverTrips.reduce((sum, trip) => sum + trip.alerts.length, 0);
            const totalIdleKm = driverTrips.reduce((sum, trip) => sum + calculateTripIdleKm(trip), 0);

            return {
                driver,
                totalTrips: driverTrips.length,
                totalAlerts,
                totalIdleKm,
                rank: 0, // Placeholder
            };
        });

        // Sort by totalIdleKm descending
        return data
            .sort((a, b) => b.totalIdleKm - a.totalIdleKm)
            .map((item, index) => ({ ...item, rank: index + 1 }));
    }, [drivers, trips]);

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
                {/* Back button removed by user request in previous steps or kept commented */}
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
                            {rankingData.map(({ driver, rank, totalTrips, totalAlerts, totalIdleKm }) => (
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
                                            {totalIdleKm.toFixed(1)} km
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
