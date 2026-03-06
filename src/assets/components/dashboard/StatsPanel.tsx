import { MapPin, AlertTriangle, Zap } from 'lucide-react';
import type { Trip } from '../../types';
import { MOCK_TRIPS } from '../../data/mockData';
import { calculateGlobalIdleKm } from '../../utils/tripUtils';

interface StatsPanelProps {
    onTripsClick: () => void;
    onAlertsClick: () => void;
    onIdleRankingClick: () => void;
}

// Calculate general metrics (not driver-specific)
const calculateMetrics = (trips: Trip[]) => {
    // Total trips (all recorded trips)
    const totalTrips = trips.length;

    // Total alerts (from all trips)
    const totalAlerts = trips.reduce((sum, trip) => sum + trip.alerts.length, 0);

    // Total idle KM (calculated from all trips)
    const totalIdleKm = calculateGlobalIdleKm(trips);

    return { totalTrips, totalAlerts, totalIdleKm };
};

const StatsPanel = ({ onTripsClick, onAlertsClick, onIdleRankingClick }: StatsPanelProps) => {
    const { totalTrips, totalAlerts, totalIdleKm } = calculateMetrics(MOCK_TRIPS);

    return (
        <div className="stats-panel">
            {/* Total Trips */}
            <div className="stats-card stats-card--clickable" onClick={onTripsClick}>
                <div className="stats-card-header">
                    <span className="stats-card-title">Total de Viagens</span>
                    <div className="stats-card-icon stats-card-icon--blue">
                        <MapPin size={16} />
                    </div>
                </div>
                <div className="stats-card-value">
                    <span className="big-number">{totalTrips}</span>
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
                    <span className="stats-card-title">KM Ocioso</span>
                    <div className="stats-card-icon stats-card-icon--amber">
                        <Zap size={16} />
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
