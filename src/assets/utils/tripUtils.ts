import type { Trip } from '../types';

/**
 * Calculates Idle KM for a single trip.
 * Rule: idleKm = Math.max(realDistance - plannedDistance, 0)
 */
export const calculateIdleKm = (real: number, planned: number): number => {
    return Math.max(0, real - planned);
};

/**
 * Calculates Idle KM for a single trip object.
 */
export const calculateTripIdleKm = (trip: Trip): number => {
    return calculateIdleKm(trip.distance, trip.plannedKm);
};

/**
 * Calculates total Idle KM for a driver based on their trips.
 */
export const calculateDriverIdleKm = (driverId: string, trips: Trip[]): number => {
    return trips
        .filter((trip) => trip.driverId === driverId)
        .reduce((sum, trip) => sum + calculateTripIdleKm(trip), 0);
};

/**
 * Calculates global Idle KM for all trips in the system.
 */
export const calculateGlobalIdleKm = (trips: Trip[]): number => {
    return trips.reduce((sum, trip) => sum + calculateTripIdleKm(trip), 0);
};

export interface DynamicAlert {
    id: number | string;
    titulo: string;
    desc: string;
    tempo: string;
    type: 'speeding' | 'route_deviation' | 'idle' | 'generic';
}

/**
 * Generates dynamic alerts based on current data.
 */
export const generateDynamicAlerts = (drivers: any[], trips: Trip[]): DynamicAlert[] => {
    const alerts: DynamicAlert[] = [];
    let idCounter = 1;

    // 1. Check for route deviations in trips
    trips.forEach(trip => {
        const routeDeviationAlert = trip.alerts.find(a => a.type === 'route_deviation');
        if (routeDeviationAlert) {
            const driver = drivers.find(d => d.id === trip.driverId);
            alerts.push({
                id: idCounter++,
                titulo: "Desvio de rota detectado",
                desc: `${driver?.name || 'Motorista'} desviou da rota planejada`,
                tempo: "2h atrás", // In a real app, this would be calculated from alert.timestamp
                type: 'route_deviation'
            });
        }
    });

    // 2. Check for idle KM in drivers
    drivers.forEach(driver => {
        if (driver.idleKm > 0) {
            alerts.push({
                id: idCounter++,
                titulo: "Motorista com ociosidade",
                desc: `${driver.name} está com ${driver.idleKm}km de ociosidade acumulada`,
                tempo: "1h atrás",
                type: 'idle'
            });
        }
    });

    // 3. Check for speeding
    trips.forEach(trip => {
        const speedingAlert = trip.alerts.find(a => a.type === 'speeding');
        if (speedingAlert) {
            const driver = drivers.find(d => d.id === trip.driverId);
            alerts.push({
                id: idCounter++,
                titulo: "Excesso de Velocidade",
                desc: `Veículo de ${driver?.name || 'Motorista'} com excesso de velocidade`,
                tempo: "30min atrás",
                type: 'speeding'
            });
        }
    });

    return alerts;
};
