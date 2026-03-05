import type { Driver } from '../types';
import DriversTable from '../components/tables/DriversTable';


interface DriversViewProps {
    drivers: Driver[];
    onDriverClick: (driver: Driver) => void;
}

const DriversView = ({ drivers, onDriverClick }: DriversViewProps) => {
    return (
        <div className="view-full">
            {/* <div className="view-top-bar">
                <button className="back-btn" onClick={onBack}>
                    <ArrowLeft size={16} />
                    <span>Voltar ao Mapa</span>
                </button>
            </div> */}
            <DriversTable drivers={drivers} onDriverClick={onDriverClick} />
        </div>
    );
};

export default DriversView;
