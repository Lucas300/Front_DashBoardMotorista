import type { Driver } from '../types';
import DriversTable from '../components/tables/DriversTable';
import { ArrowLeft } from 'lucide-react';

interface DriversViewProps {
    drivers: Driver[];
    onDriverClick: (driver: Driver) => void;
    onBack: () => void;
}

const DriversView = ({ drivers, onDriverClick, onBack }: DriversViewProps) => {
    return (
        <div className="view-full">
            <div className="view-top-bar">
                <button className="back-btn" onClick={onBack}>
                    <ArrowLeft size={16} />
                    <span>Voltar ao Mapa</span>
                </button>
            </div>
            <DriversTable drivers={drivers} onDriverClick={onDriverClick} />
        </div>
    );
};

export default DriversView;
