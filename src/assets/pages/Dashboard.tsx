import { useState, useCallback } from 'react';
import type { Driver, Trip, ViewName } from '../types';
import { MOCK_DRIVERS, MOCK_TRIPS } from '../data/mockData';
import MainLayout from '../components/layout/MainLayout';
import OverviewView from '../views/OverviewView';
import DriversView from '../views/DriversView';
import DriverTripsView from '../views/DriverTripsView';
import TripDetailView from '../views/TripDetailView';
import HistoryView from '../views/HistoryView';
import IdleRankingView from '../views/IdleRankingView';

const Dashboard = () => {
    const [view, setView] = useState<ViewName>('overview');
    const [viewHistory, setViewHistory] = useState<ViewName[]>([]);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
    const [animKey, setAnimKey] = useState(0);
    const [alertsFilter, setAlertsFilter] = useState(false);

    const navigate = useCallback((next: ViewName) => {
        setViewHistory((prev) => [...prev, view]);
        setView(next);
        setAnimKey((k) => k + 1);
    }, [view]);

    const goBack = useCallback(() => {
        const prev = viewHistory[viewHistory.length - 1];
        if (prev) {
            setViewHistory((h) => h.slice(0, -1));
            setView(prev);
            setAnimKey((k) => k + 1);
        }
    }, [viewHistory]);

    const handleNavigate = useCallback((navView: ViewName) => {
        setSelectedDriver(null);
        setSelectedTrip(null);
        setViewHistory([]);
        setAlertsFilter(false);
        setView(navView);
        setAnimKey((k) => k + 1);
    }, []);

    const handleViewDrivers = useCallback(() => {
        navigate('drivers');
    }, [navigate]);

    const handleDriverClick = useCallback((driver: Driver) => {
        setSelectedDriver(driver);
        navigate('driver_trips');
    }, [navigate]);

    const handleTripClick = useCallback((trip: Trip) => {
        setSelectedTrip(trip);
        navigate('trip_detail');
    }, [navigate]);

    const handleHistoryTripClick = useCallback((trip: Trip, driver: Driver) => {
        setSelectedTrip(trip);
        setSelectedDriver(driver);
        navigate('trip_detail');
    }, [navigate]);

    const handleTripsClick = useCallback(() => {
        navigate('history');
    }, [navigate]);

    const handleAlertsClick = useCallback(() => {
        setAlertsFilter(true);
        navigate('history');
    }, [navigate]);

    const handleIdleRankingClick = useCallback(() => {
        navigate('idle_ranking');
    }, [navigate]);

    const driverTrips = selectedDriver
        ? MOCK_TRIPS.filter((t) => t.driverId === selectedDriver.id)
        : [];

    const renderView = () => {
        switch (view) {
            case 'overview':
                return (
                    <OverviewView
                        drivers={MOCK_DRIVERS}
                        onViewDrivers={handleViewDrivers}
                        onDriverClick={handleDriverClick}
                        onTripsClick={handleTripsClick}
                        onAlertsClick={handleAlertsClick}
                        onIdleRankingClick={handleIdleRankingClick}
                    />
                );
            case 'drivers':
                return (
                    <DriversView
                        drivers={MOCK_DRIVERS}
                        onDriverClick={handleDriverClick}
                        onBack={goBack}
                    />
                );
            case 'driver_trips':
                return selectedDriver ? (
                    <DriverTripsView
                        driver={selectedDriver}
                        trips={driverTrips}
                        onTripClick={handleTripClick}
                        onBack={goBack}
                    />
                ) : null;
            case 'trip_detail':
                return selectedTrip && selectedDriver ? (
                    <TripDetailView
                        trip={selectedTrip}
                        driver={selectedDriver}
                        onBack={goBack}
                    />
                ) : null;
            case 'history':
                return (
                    <HistoryView
                        trips={MOCK_TRIPS}
                        drivers={MOCK_DRIVERS}
                        onTripClick={handleHistoryTripClick}
                        onBack={goBack}
                        alertsFilter={alertsFilter}
                    />
                );
            case 'idle_ranking':
                return (
                    <IdleRankingView
                        drivers={MOCK_DRIVERS}
                        trips={MOCK_TRIPS}
                        onBack={goBack}
                        onDriverClick={handleDriverClick}
                    />
                );
            case 'vehicles':
                return (
                    <DriversView
                        drivers={alertsFilter
                            ? MOCK_DRIVERS.filter(d => d.status === 'em_rota')
                            : MOCK_DRIVERS}
                        onDriverClick={handleDriverClick}
                        onBack={goBack}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <MainLayout
            activeView={view}
            activeDriver={selectedDriver}
            allDrivers={MOCK_DRIVERS}
            onNavigate={handleNavigate}
        >
            <div key={animKey} className="view-animate">
                {renderView()}
            </div>
        </MainLayout>
    );
};

export default Dashboard;
