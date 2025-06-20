/**
 * Formats a date string into a specified format.
 * @param {string} dateString - A date string compatible with new Date() (e.g., "YYYY-MM-DD").
 * @param {string} format - The desired output format string.
 * Supported format tokens:
 * YYYY: 4-digit year
 * MM: 2-digit month (01-12)
 * MMMM: Full month name (e.g., "October")
 * DD: 2-digit day (01-31)
 * D: Day of the month (1-31)
 */
export function formatDate(dateString, format) {
    if (!dateString) return '';

    try {
        const date = new Date(dateString + 'T00:00:00'); // Use T00:00:00 to avoid timezone issues
        if (isNaN(date)) return dateString; // Return original string if date is invalid

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let formatted = format;
        formatted = formatted.replace('YYYY', year);
        formatted = formatted.replace('MMMM', monthNames[month]);
        formatted = formatted.replace('MM', String(month + 1).padStart(2, '0'));
        formatted = formatted.replace('DD', String(day).padStart(2, '0'));
        formatted = formatted.replace('D', day);

        return formatted;
    } catch (error) {
        console.error("Date formatting error:", error);
        return dateString; // Fallback
    }
}