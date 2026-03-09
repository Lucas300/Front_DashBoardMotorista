import { useState, useMemo } from 'react';
import type { Driver, Trip } from '../types';
import TripsTable from '../components/tables/TripsTable';
import { Route, AlertTriangle, Zap } from 'lucide-react';
import { formatDateBR } from '../utils/dateUtils';
import { calculateDriverIdleKm } from '../utils/tripUtils';

interface DriverTripsViewProps {
    driver: Driver;
    trips: Trip[];
    onTripClick: (trip: Trip) => void;
    onBack: () => void;
}

const DriverTripsView = ({ driver, trips, onTripClick, onBack }: DriverTripsViewProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const totalIdleKm = useMemo(() => {
        return calculateDriverIdleKm(driver.id, trips);
    }, [driver.id, trips]);

    // Calculate summary statistics
    const totalTrips = trips.length;
    const totalAlerts = trips.reduce((sum, trip) => sum + trip.alerts.length, 0);

    const alertTypeLabel: Record<string, string> = {
        speeding: 'Velocidade',
        braking: 'Frenagem',
        route_deviation: 'Desvio',
        idle: 'Parado',
        geofence: 'Cerca',
    };

    // Filter trips based on search query and selected filter
    const filteredTrips = useMemo(() => {
        let result = trips;

        // Apply Dropdown Filter Logic
        if (selectedFilter !== 'all') {
            result = result.filter(trip => {
                switch (selectedFilter) {
                    case 'exceededKm':
                        return trip.exceededKm === true;
                    case 'speeding':
                        return trip.alerts.some(a => a.type === 'speeding');
                    case 'route_deviation':
                        return trip.alerts.some(a => a.type === 'route_deviation');
                    case 'delayed':
                        return trip.delayed === true;
                    default:
                        return true;
                }
            });
        }

        // Apply Search Query Logic
        if (!searchQuery.trim()) {
            return result;
        }

        const query = searchQuery.toLowerCase();

        return result.filter((trip) => {
            // Map column values to searchable strings
            const dataMap: Record<string, string> = {
                date: formatDateBR(trip.date).toLowerCase(),
                distance: trip.distance.toString(),
                plannedKm: trip.plannedKm.toString(),
                alerts: trip.alerts.map(a => `${a.type} ${alertTypeLabel[a.type] ?? ''} ${a.description}`).join(' ').toLowerCase(),
                delayed: trip.delayed ? 'sim' : 'não',
                exceededKm: trip.exceededKm ? 'sim' : 'não',
                startTime: trip.startTime.toLowerCase(),
                endTime: trip.endTime.toLowerCase(),
                status: trip.status.toLowerCase()
            };

            return Object.values(dataMap).some(val => val.includes(query));
        });
    }, [trips, searchQuery, selectedFilter]);

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
                    <div className="summary-card-icon summary-card-icon--amber">
                        <Zap size={20} />
                    </div>
                    <div className="summary-card-content">
                        <span className="summary-card-label">KM Ocioso</span>
                        <span className="summary-card-value">{totalIdleKm.toFixed(1)} km</span>
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
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
            />
        </div>
    );
};

export default DriverTripsView;
