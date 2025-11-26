/**
 * Application Constants
 * Centralized configuration values
 */

export const APP_CONFIG = {
    APP_NAME: 'Hertz Fleet Manager',
    COMPANY_NAME: 'Grupo Randazzo',
    VERSION: '1.0.0'
};

export const VEHICLE_CATEGORIES = {
    C: 'Categoría C',
    H: 'Categoría H',
    K: 'Categoría K'
};

export const VEHICLE_STATUS = {
    AVAILABLE: 'Disponible',
    RESERVED: 'Reservado',
    RENTED: 'Alquilado',
    MAINTENANCE: 'Mantenimiento'
};

export const USER_ROLES = {
    ADMIN: 'Administrador',
    OPERATOR: 'Operador',
    VIEWER: 'Visualizador'
};

export const ALERT_TYPES = {
    RENTAL_ENDING: 'Vehículo próximo a venta',
    NEW_RESERVATION: 'Nueva reserva',
    RESERVATION_MODIFIED: 'Reserva modificada',
    RESERVATION_CANCELLED: 'Reserva cancelada',
    MAINTENANCE_DUE: 'Mantenimiento programado',
    RETURN_UPCOMING: 'Devolución próxima'
};

export const ALERT_FREQUENCIES = {
    REAL_TIME: 'Tiempo real',
    DAILY: 'Diaria',
    WEEKLY: 'Semanal',
    MONTHLY: 'Mensual'
};

export const REPORT_TYPES = {
    OCCUPANCY: 'ocupacion',
    FINANCIAL: 'financiero',
    FLEET_STATUS: 'flota',
    RESERVATIONS: 'reservas',
    VEHICLES_FOR_SALE: 'proximos-venta',
    MAINTENANCE: 'mantenimiento',
    EXECUTIVE: 'ejecutivo',
    CLIENTS: 'clientes'
};

export const VIEW_MODES = {
    DAY: 'day',
    HOUR: 'hour'
};

export const RENTAL_THRESHOLD_MONTHS = 11; // Alert when vehicle reaches 11 months
export const MAX_RENTAL_MONTHS = 12; // Maximum rental period before sale

export const DATE_FORMATS = {
    DISPLAY: 'DD/MM/YYYY',
    INPUT: 'YYYY-MM-DD',
    DATETIME: 'DD/MM/YYYY HH:mm'
};

export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
};

export const VALIDATION_RULES = {
    PATENT_PATTERN: /^[A-Z]-[A-Z]{2}-\d{3}-[A-Z]{2}$/,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_PASSWORD_LENGTH: 8
};

export const API_ENDPOINTS = {
    // Placeholder for future API integration
    BASE_URL: '/api',
    VEHICLES: '/vehicles',
    RESERVATIONS: '/reservations',
    USERS: '/users',
    ALERTS: '/alerts',
    REPORTS: '/reports'
};

export const LOCAL_STORAGE_KEYS = {
    USER_PREFERENCES: 'hertz_user_preferences',
    FILTERS: 'hertz_filters',
    AUTH_TOKEN: 'hertz_auth_token'
};
