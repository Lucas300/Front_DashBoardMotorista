import { useMemo } from 'react';

export type SortField = 'date' | 'distance' | 'plannedKm' | 'status' | 'alerts' | 'delayed' | 'exceededKm' | 'startTime' | 'endTime' | '';

export function useTableSort<T>(
    data: T[],
    sortField: SortField,
    getField: (item: T, field: SortField) => any
) {
    const sortedData = useMemo(() => {
        if (!sortField) return data;

        return [...data].sort((a, b) => {
            const valA = getField(a, sortField);
            const valB = getField(b, sortField);

            // Handle sorting based on type
            if (valA === undefined || valB === undefined) return 0;

            // Date sorting
            if (sortField === 'date') {
                return new Date(valB).getTime() - new Date(valA).getTime();
            }

            // Numeric sorting (Descending by default as it's often more useful in dashboards)
            if (typeof valA === 'number' && typeof valB === 'number') {
                return valB - valA;
            }

            // Boolean sorting
            if (typeof valA === 'boolean' && typeof valB === 'boolean') {
                return (valB ? 1 : 0) - (valA ? 1 : 0);
            }

            // String sorting
            return String(valA).localeCompare(String(valB));
        });
    }, [data, sortField, getField]);

    return sortedData;
}
