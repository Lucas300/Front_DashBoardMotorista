import type { Trip } from '../types';

/**
 * Calculates Idle KM for a single trip.
 * Rule: idleKm = Math.max(realDistance - plannedDistance, 0)
 */
export const calculateIdleKm = (real: number, planned: number): number => {
    return Math.max(0, real - planned);
};

/**
 * Calculates total Idle KM for a driver based on their trips.
 */
export const calculateDriverIdleKm = (driverId: string, trips: Trip[]): number => {
    return trips
        .filter((trip) => trip.driverId === driverId)
        .reduce((sum, trip) => sum + calculateIdleKm(trip.distance, trip.plannedKm), 0);
};

/**
 * Calculates global Idle KM for all trips in the system.
 */
export const calculateGlobalIdleKm = (trips: Trip[]): number => {
    return trips.reduce((sum, trip) => sum + calculateIdleKm(trip.distance, trip.plannedKm), 0);
};
