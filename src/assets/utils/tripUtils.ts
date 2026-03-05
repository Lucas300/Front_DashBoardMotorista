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
