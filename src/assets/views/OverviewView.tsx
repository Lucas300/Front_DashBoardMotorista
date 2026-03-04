import { Users } from 'lucide-react';
import type { Driver } from '../types';
import FleetMap from '../components/map/FleetMap';
import StatsPanel from '../components/dashboard/StatsPanel';

interface OverviewViewProps {
    drivers: Driver[];
    onViewDrivers: () => void;
    onDriverClick: (driver: Driver) => void;
    onTripsClick: () => void;
    onAlertsClick: () => void;
    onIdleRankingClick: () => void;
}

const OverviewView = ({ 
    drivers, 
    onViewDrivers, 
    onDriverClick,
    onTripsClick,
    onAlertsClick,
    onIdleRankingClick
}: OverviewViewProps) => {
    return (
        <div className="overview-layout">
            <div className="overview-map-area">
                <FleetMap drivers={drivers} onDriverClick={onDriverClick} />
                <button className="view-drivers-btn" onClick={onViewDrivers}>
                    <Users size={16} />
                    <span>Ver Motoristas</span>
                </button>
            </div>
            <StatsPanel 
                drivers={drivers}
                onTripsClick={onTripsClick}
                onAlertsClick={onAlertsClick}
                onIdleRankingClick={onIdleRankingClick}
            />
        </div>
    );
};

export default OverviewView;
