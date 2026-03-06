import { formatTimeBR } from './dateUtils';
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
    driverId: string;
    titulo: string;
    desc: string;
    tempo: string;
    type: 'speeding' | 'route_deviation' | 'idle' | 'generic' | 'braking' | 'geofence';
}

/**
 * Generates dynamic alerts based on current data.
 */
export const generateDynamicAlerts = (drivers: any[], trips: Trip[]): DynamicAlert[] => {
    const alerts: DynamicAlert[] = [];
    let idCounter = 1;

    // Filter trips that have alerts
    const tripsWithAlerts = trips.filter(trip => trip.alerts && trip.alerts.length > 0);

    tripsWithAlerts.forEach(trip => {
        const driver = drivers.find(d => d.id === trip.driverId);
        if (!driver) return;

        trip.alerts.forEach(alert => {
            let dynamicDesc = "";
            const idleKm = calculateTripIdleKm(trip);
            const deviationKm = Math.max(0, trip.distance - trip.plannedKm);

            switch (alert.type) {
                case 'idle':
                    dynamicDesc = `${driver.name} está com ${idleKm.toFixed(1)}km de ociosidade acumulada`;
                    break;
                case 'speeding':
                    dynamicDesc = `${driver.name} excedeu a velocidade na rota`;
                    break;
                case 'route_deviation':
                    dynamicDesc = `${driver.name} desviou ${deviationKm.toFixed(1)}km da rota planejada`;
                    break;
                case 'braking':
                    dynamicDesc = `${driver.name} realizou uma frenagem brusca`;
                    break;
                default:
                    dynamicDesc = `${driver.name}: ${alert.description}`;
            }

            alerts.push({
                id: `alert-${idCounter++}`,
                driverId: driver.id,
                titulo: getAlertTitle(alert.type),
                desc: dynamicDesc,
                tempo: formatTimeBR(alert.timestamp),
                type: alert.type as any
            });
        });
    });

    return alerts.sort((a, b) => b.tempo.localeCompare(a.tempo));
};

const getAlertTitle = (type: string): string => {
    switch (type) {
        case 'speeding': return "Excesso de Velocidade";
        case 'route_deviation': return "Desvio de Rota";
        case 'idle': return "Ociosidade Detectada";
        case 'braking': return "Frenagem Brusca";
        case 'geofence': return "Cerca Eletrônica";
        default: return "Alerta de Viagem";
    }
};
