import { Users } from 'lucide-react';
import type { Driver } from '../types';
import FleetMap from '../components/map/FleetMap';
import StatsPanel from '../components/dashboard/StatsPanel';

interface OverviewViewProps {
    drivers: Driver[];
    onViewDrivers: () => void;
    onDriverClick: (driver: Driver) => void;
}

const OverviewView = ({ drivers, onViewDrivers, onDriverClick }: OverviewViewProps) => {
    return (
        <div className="overview-layout">
            <div className="overview-map-area">
                <FleetMap drivers={drivers} onDriverClick={onDriverClick} />
                <button className="view-drivers-btn" onClick={onViewDrivers}>
                    <Users size={16} />
                    <span>Ver Motoristas</span>
                </button>
            </div>
            <StatsPanel />
        </div>
    );
};

export default OverviewView;
