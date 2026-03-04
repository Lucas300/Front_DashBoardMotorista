import { MapPin, AlertTriangle, Clock } from 'lucide-react';
import type { Driver } from '../../types';
import { MOCK_TRIPS } from '../../data/mockData';

interface StatsPanelProps {
    drivers: Driver[];
    onTripsClick: () => void;
    onAlertsClick: () => void;
    onIdleRankingClick: () => void;
}

// Calculate general metrics (not driver-specific)
const calculateMetrics = (drivers: Driver[], trips: typeof MOCK_TRIPS) => {
    // Total trips today
    const totalTripsToday = drivers.reduce((sum, driver) => sum + driver.tripsToday, 0);
    
    // Total alerts (from all trips today)
    const today = new Date().toISOString().split('T')[0];
    const todayTrips = trips.filter(t => t.date === today);
    const totalAlerts = todayTrips.reduce((sum, trip) => sum + trip.alerts.length, 0);
    
    // Total idle KM
    const totalIdleKm = drivers.reduce((sum, driver) => sum + driver.idleKm, 0);
    
    return { totalTripsToday, totalAlerts, totalIdleKm };
};

const StatsPanel = ({ drivers, onTripsClick, onAlertsClick, onIdleRankingClick }: StatsPanelProps) => {
    const { totalTripsToday, totalAlerts, totalIdleKm } = calculateMetrics(drivers, MOCK_TRIPS);

    return (
        <div className="stats-panel">
            {/* Total Trips Today */}
            <div className="stats-card stats-card--clickable" onClick={onTripsClick}>
                <div className="stats-card-header">
                    <span className="stats-card-title">Total de Viagens Hoje</span>
                    <div className="stats-card-icon stats-card-icon--blue">
                        <MapPin size={16} />
                    </div>
                </div>
                <div className="stats-card-value">
                    <span className="big-number">{totalTripsToday}</span>
                </div>
                <div className="stats-card-footer">
                    <span className="stats-card-link">Ver histórico</span>
                </div>
            </div>

            {/* Total Alerts */}
            <div className="stats-card stats-card--clickable" onClick={onAlertsClick}>
                <div className="stats-card-header">
                    <span className="stats-card-title">Total de Alertas</span>
                    <div className="stats-card-icon stats-card-icon--red">
                        <AlertTriangle size={16} />
                    </div>
                </div>
                <div className="stats-card-value">
                    <span className="big-number">{totalAlerts}</span>
                </div>
                <div className="stats-card-footer">
                    <span className="stats-card-link">Ver veículos</span>
                </div>
            </div>

            {/* Total Idle KM */}
            <div className="stats-card stats-card--clickable" onClick={onIdleRankingClick}>
                <div className="stats-card-header">
                    <span className="stats-card-title">KM em Marcha Lenta</span>
                    <div className="stats-card-icon stats-card-icon--amber">
                        <Clock size={16} />
                    </div>
                </div>
                <div className="stats-card-value">
                    <span className="big-number">{totalIdleKm.toFixed(1)}<small> KM</small></span>
                </div>
                <div className="stats-card-footer">
                    <span className="stats-card-link">Ver ranking</span>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
