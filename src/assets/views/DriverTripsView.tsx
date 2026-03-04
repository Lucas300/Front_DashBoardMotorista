import type { Driver, Trip } from '../types';
import TripsTable from '../components/tables/TripsTable';

interface DriverTripsViewProps {
    driver: Driver;
    trips: Trip[];
    onTripClick: (trip: Trip) => void;
    onBack: () => void;
}

const DriverTripsView = ({ driver, trips, onTripClick, onBack }: DriverTripsViewProps) => {
    return (
        <div className="view-full">
            <TripsTable
                trips={trips}
                driverName={driver.name}
                onTripClick={onTripClick}
                onBack={onBack}
            />
        </div>
    );
};

export default DriverTripsView;
