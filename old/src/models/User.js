/**
 * User Model
 * Represents a system user
 */

import { USER_ROLES } from '../config/constants.js';

export class User {
    constructor({
        id = null,
        name = '',
        email = '',
        role = USER_ROLES.VIEWER,
        status = 'active',
        lastAccess = null,
        createdAt = new Date(),
        preferences = {}
    } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.status = status;
        this.lastAccess = lastAccess;
        this.createdAt = createdAt;
        this.preferences = preferences;
    }

    /**
     * Check if user is admin
     */
    isAdmin() {
        return this.role === USER_ROLES.ADMIN;
    }

    /**
     * Check if user is operator
     */
    isOperator() {
        return this.role === USER_ROLES.OPERATOR;
    }

    /**
     * Check if user is viewer
     */
    isViewer() {
        return this.role === USER_ROLES.VIEWER;
    }

    /**
     * Check if user is active
     */
    isActive() {
        return this.status === 'active';
    }

    /**
     * Check if user can edit
     */
    canEdit() {
        return this.isAdmin() || this.isOperator();
    }

    /**
     * Check if user can manage users
     */
    canManageUsers() {
        return this.isAdmin();
    }

    /**
     * Check if user can configure alerts
     */
    canConfigureAlerts() {
        return this.isAdmin();
    }

    /**
     * Update last access timestamp
     */
    updateLastAccess() {
        this.lastAccess = new Date();
    }

    /**
     * Update user preference
     */
    setPreference(key, value) {
        this.preferences[key] = value;
    }

    /**
     * Get user preference
     */
    getPreference(key, defaultValue = null) {
        return this.preferences.hasOwnProperty(key) 
            ? this.preferences[key] 
            : defaultValue;
    }

    /**
     * Convert to plain object
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            status: this.status,
            lastAccess: this.lastAccess,
            createdAt: this.createdAt,
            preferences: this.preferences
        };
    }

    /**
     * Create from plain object
     */
    static fromJSON(json) {
        return new User(json);
    }

    /**
     * Validate user data
     */
    validate() {
        const errors = [];

        if (!this.name || this.name.trim().length === 0) {
            errors.push('Nombre es requerido');
        }

        if (!this.email || this.email.trim().length === 0) {
            errors.push('Email es requerido');
        }

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.email && !emailPattern.test(this.email)) {
            errors.push('Email no es válido');
        }

        if (!Object.values(USER_ROLES).includes(this.role)) {
            errors.push('Rol no es válido');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
