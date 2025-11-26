/**
 * Date Utilities
 * Helper functions for date manipulation and formatting
 */

/**
 * Format date to DD/MM/YYYY
 */
export function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Format date to YYYY-MM-DD for input fields
 */
export function formatDateForInput(date) {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Format datetime to DD/MM/YYYY HH:mm
 */
export function formatDateTime(date) {
    if (!date) return '';
    const d = new Date(date);
    const dateStr = formatDate(d);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${dateStr} ${hours}:${minutes}`;
}

/**
 * Parse DD/MM/YYYY to Date object
 */
export function parseDate(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return new Date(year, month - 1, day);
}

/**
 * Get relative time string (e.g., "Hace 2 horas")
 */
export function getRelativeTime(date) {
    if (!date) return '';
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return formatDate(date);
}

/**
 * Calculate difference in months between two dates
 */
export function getMonthsDifference(startDate, endDate = new Date()) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth();
    months += end.getMonth();
    
    return months <= 0 ? 0 : months;
}

/**
 * Calculate difference in days between two dates
 */
export function getDaysDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Check if date is today
 */
export function isToday(date) {
    const d = new Date(date);
    const today = new Date();
    return d.getDate() === today.getDate() &&
           d.getMonth() === today.getMonth() &&
           d.getFullYear() === today.getFullYear();
}

/**
 * Check if date is a weekend
 */
export function isWeekend(date) {
    const d = new Date(date);
    const day = d.getDay();
    return day === 0 || day === 6;
}

/**
 * Get month name in Spanish
 */
export function getMonthName(monthIndex) {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[monthIndex];
}

/**
 * Get day name in Spanish
 */
export function getDayName(dayIndex) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayIndex];
}

/**
 * Get short day name in Spanish
 */
export function getShortDayName(dayIndex) {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[dayIndex];
}

/**
 * Add days to a date
 */
export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Add months to a date
 */
export function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

/**
 * Get first day of month
 */
export function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1);
}

/**
 * Get last day of month
 */
export function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0);
}

/**
 * Get number of days in month
 */
export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
