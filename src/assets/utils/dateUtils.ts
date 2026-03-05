/**
 * Formats a date string (YYYY-MM-DD or ISO) into Brazilian format: DD/MM/YYYY
 */
export const formatDateBR = (dateString: string): string => {
    if (!dateString) return '';

    // Check if it's already in BR format
    if (dateString.includes('/')) return dateString;

    // For YYYY-MM-DD format
    if (dateString.includes('-')) {
        const parts = dateString.split('T')[0].split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
    }

    return dateString;
};

/**
 * Formats a date string and time string into DD/MM/YYYY HH:mm
 */
export const formatDateTimeBR = (dateString: string, timeString: string): string => {
    const formattedDate = formatDateBR(dateString);
    const formattedTime = formatTimeBR(timeString);
    return `${formattedDate} ${formattedTime}`;
};

/**
 * Formats an AM/PM time string (e.g., '01:30 PM') to Brazilian 24h format ('13:30').
 * If it's not a recognizable time or already 24h, returns the original.
 */
export const formatTimeBR = (timeString: string): string => {
    if (!timeString) return '';

    // Check if it has AM/PM
    const isAM = timeString.toUpperCase().includes('AM');
    const isPM = timeString.toUpperCase().includes('PM');

    if (!isAM && !isPM) return timeString; // Already 24h or unknown string like "Em andamento"

    const timeMatch = timeString.match(/(\d+):(\d+)/);
    if (!timeMatch) return timeString;

    let hours = parseInt(timeMatch[1], 10);
    const minutes = timeMatch[2];

    if (isPM && hours < 12) {
        hours += 12;
    } else if (isAM && hours === 12) {
        hours = 0;
    }

    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${minutes}`;
};
