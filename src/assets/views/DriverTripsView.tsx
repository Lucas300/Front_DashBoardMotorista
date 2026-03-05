import { useState, useMemo } from 'react';
import type { Driver, Trip } from '../types';
import TripsTable from '../components/tables/TripsTable';
import { Route, AlertTriangle, Clock } from 'lucide-react';

interface DriverTripsViewProps {
    driver: Driver;
    trips: Trip[];
    onTripClick: (trip: Trip) => void;
    onBack: () => void;
}

const DriverTripsView = ({ driver, trips, onTripClick, onBack }: DriverTripsViewProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Calculate summary statistics
    const totalTrips = trips.length;
    const totalAlerts = trips.reduce((sum, trip) => sum + trip.alerts.length, 0);
    const isIdle = driver.idleKm > 0;

    // Filter trips based on search query
    const filteredTrips = useMemo(() => {
        if (!searchQuery.trim()) {
            return trips;
        }

        const query = searchQuery.toLowerCase();

        return trips.filter((trip) => {
            // Search across all visible columns
            const dateMatch = trip.date.toLowerCase().includes(query);
            const distanceMatch = trip.distance.toString().includes(query);
            const plannedKmMatch = trip.plannedKm.toString().includes(query);
            const alertsMatch = trip.alerts.length > 0 && trip.alerts.some(
                (alert) => alert.type.toLowerCase().includes(query) || alert.description.toLowerCase().includes(query)
            );
            const delayedMatch = trip.delayed ? 'sim'.includes(query) : 'não'.includes(query) || 'nao'.includes(query);
            const exceededKmMatch = trip.exceededKm ? 'sim'.includes(query) : 'não'.includes(query) || 'nao'.includes(query);
            const startTimeMatch = trip.startTime.toLowerCase().includes(query);
            const endTimeMatch = trip.endTime.toLowerCase().includes(query);
            const statusMatch = trip.status.toLowerCase().includes(query);

            return dateMatch || distanceMatch || plannedKmMatch || alertsMatch || delayedMatch ||
                exceededKmMatch || startTimeMatch || endTimeMatch || statusMatch;
        });
    }, [trips, searchQuery]);

    return (
        <div className="view-full">
            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="summary-card">
                    <div className="summary-card-icon summary-card-icon--blue">
                        <Route size={20} />
                    </div>
                    <div className="summary-card-content">
                        <span className="summary-card-label">Total de Corridas</span>
                        <span className="summary-card-value">{totalTrips}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className="summary-card-icon summary-card-icon--amber">
                        <AlertTriangle size={20} />
                    </div>
                    <div className="summary-card-content">
                        <span className="summary-card-label">Total de Alertas</span>
                        <span className="summary-card-value">{totalAlerts}</span>
                    </div>
                </div>
                <div className="summary-card">
                    <div className={`summary-card-icon ${isIdle ? 'summary-card-icon--red' : 'summary-card-icon--green'}`}>
                        <Clock size={20} />
                    </div>
                    <div className="summary-card-content">
                        <span className="summary-card-label">Idle KM</span>
                        <span className="summary-card-value">{driver.idleKm} km</span>
                    </div>
                </div>
            </div>

            {/* Pass filtered trips to TripsTable */}
            <TripsTable
                trips={filteredTrips}
                driverName={driver.name}
                onTripClick={onTripClick}
                onBack={onBack}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
        </div>
    );
};

export default DriverTripsView;
