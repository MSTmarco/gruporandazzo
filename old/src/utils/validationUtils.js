/**
 * Validation Utilities
 * Helper functions for data validation
 */

import { VALIDATION_RULES } from '../config/constants.js';

/**
 * Validate email format
 */
export function isValidEmail(email) {
    return VALIDATION_RULES.EMAIL_PATTERN.test(email);
}

/**
 * Validate patent format (e.g., C-AH-919-BK)
 */
export function isValidPatent(patent) {
    return VALIDATION_RULES.PATENT_PATTERN.test(patent);
}

/**
 * Validate required field
 */
export function isRequired(value) {
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
}

/**
 * Validate minimum length
 */
export function minLength(value, min) {
    if (typeof value !== 'string') return false;
    return value.length >= min;
}

/**
 * Validate maximum length
 */
export function maxLength(value, max) {
    if (typeof value !== 'string') return false;
    return value.length <= max;
}

/**
 * Validate number range
 */
export function inRange(value, min, max) {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
}

/**
 * Validate date is not in the past
 */
export function isNotPastDate(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
}

/**
 * Validate end date is after start date
 */
export function isEndAfterStart(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return end > start;
}

/**
 * Validate password strength
 */
export function isStrongPassword(password) {
    if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
        return {
            valid: false,
            message: `La contraseña debe tener al menos ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} caracteres`
        };
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
        return {
            valid: false,
            message: 'La contraseña debe contener mayúsculas, minúsculas y números'
        };
    }

    return { valid: true, message: 'Contraseña válida' };
}

/**
 * Validate phone number (Argentine format)
 */
export function isValidPhone(phone) {
    // Remove spaces and dashes
    const cleaned = phone.replace(/[\s-]/g, '');
    // Argentine phone numbers: 10-11 digits
    return /^(\+54)?[0-9]{10,11}$/.test(cleaned);
}

/**
 * Sanitize input (remove potentially harmful characters)
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validate URL format
 */
export function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate positive number
 */
export function isPositiveNumber(value) {
    const num = Number(value);
    return !isNaN(num) && num > 0;
}

/**
 * Validate integer
 */
export function isInteger(value) {
    return Number.isInteger(Number(value));
}

/**
 * Generic validator class
 */
export class Validator {
    constructor() {
        this.errors = {};
    }

    /**
     * Add validation rule
     */
    validate(field, value, rules) {
        this.errors[field] = [];

        rules.forEach(rule => {
            const { type, message, ...params } = rule;

            let isValid = true;

            switch (type) {
                case 'required':
                    isValid = isRequired(value);
                    break;
                case 'email':
                    isValid = isValidEmail(value);
                    break;
                case 'patent':
                    isValid = isValidPatent(value);
                    break;
                case 'minLength':
                    isValid = minLength(value, params.min);
                    break;
                case 'maxLength':
                    isValid = maxLength(value, params.max);
                    break;
                case 'range':
                    isValid = inRange(value, params.min, params.max);
                    break;
                case 'custom':
                    isValid = params.validator(value);
                    break;
                default:
                    break;
            }

            if (!isValid) {
                this.errors[field].push(message);
            }
        });

        if (this.errors[field].length === 0) {
            delete this.errors[field];
        }

        return this.errors[field] === undefined;
    }

    /**
     * Check if validation passed
     */
    isValid() {
        return Object.keys(this.errors).length === 0;
    }

    /**
     * Get all errors
     */
    getErrors() {
        return this.errors;
    }

    /**
     * Get errors for specific field
     */
    getFieldErrors(field) {
        return this.errors[field] || [];
    }

    /**
     * Clear all errors
     */
    clearErrors() {
        this.errors = {};
    }

    /**
     * Clear errors for specific field
     */
    clearFieldErrors(field) {
        delete this.errors[field];
    }
}

/**
 * Form validator helper
 */
export function validateForm(formData, rules) {
    const validator = new Validator();

    Object.entries(rules).forEach(([field, fieldRules]) => {
        validator.validate(field, formData[field], fieldRules);
    });

    return {
        isValid: validator.isValid(),
        errors: validator.getErrors()
    };
}
