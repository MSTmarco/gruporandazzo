/**
 * Alert Model
 * Represents a system alert configuration
 */

import { ALERT_TYPES, ALERT_FREQUENCIES } from '../config/constants.js';

export class Alert {
    constructor({
        id = null,
        type = '',
        name = '',
        description = '',
        frequency = ALERT_FREQUENCIES.DAILY,
        time = '09:00',
        channels = ['email'],
        recipients = [],
        customMessage = '',
        isActive = true,
        lastExecuted = null,
        createdAt = new Date(),
        updatedAt = new Date()
    } = {}) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.frequency = frequency;
        this.time = time;
        this.channels = channels;
        this.recipients = recipients;
        this.customMessage = customMessage;
        this.isActive = isActive;
        this.lastExecuted = lastExecuted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Check if alert should be sent via email
     */
    shouldSendEmail() {
        return this.channels.includes('email');
    }

    /**
     * Check if alert should be sent via SMS
     */
    shouldSendSMS() {
        return this.channels.includes('sms');
    }

    /**
     * Check if alert should show in-app notification
     */
    shouldShowInApp() {
        return this.channels.includes('app');
    }

    /**
     * Add recipient
     */
    addRecipient(userId) {
        if (!this.recipients.includes(userId)) {
            this.recipients.push(userId);
            this.updatedAt = new Date();
        }
    }

    /**
     * Remove recipient
     */
    removeRecipient(userId) {
        const index = this.recipients.indexOf(userId);
        if (index > -1) {
            this.recipients.splice(index, 1);
            this.updatedAt = new Date();
        }
    }

    /**
     * Toggle active status
     */
    toggleActive() {
        this.isActive = !this.isActive;
        this.updatedAt = new Date();
    }

    /**
     * Update last execution time
     */
    markAsExecuted() {
        this.lastExecuted = new Date();
    }

    /**
     * Check if alert should execute now based on frequency
     */
    shouldExecuteNow() {
        if (!this.isActive) return false;

        if (this.frequency === ALERT_FREQUENCIES.REAL_TIME) {
            return true;
        }

        if (!this.lastExecuted) return true;

        const now = new Date();
        const lastExec = new Date(this.lastExecuted);
        const diffHours = (now - lastExec) / (1000 * 60 * 60);

        switch (this.frequency) {
            case ALERT_FREQUENCIES.DAILY:
                return diffHours >= 24;
            case ALERT_FREQUENCIES.WEEKLY:
                return diffHours >= 168;
            case ALERT_FREQUENCIES.MONTHLY:
                return diffHours >= 720;
            default:
                return false;
        }
    }

    /**
     * Convert to plain object
     */
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            name: this.name,
            description: this.description,
            frequency: this.frequency,
            time: this.time,
            channels: this.channels,
            recipients: this.recipients,
            customMessage: this.customMessage,
            isActive: this.isActive,
            lastExecuted: this.lastExecuted,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    /**
     * Create from plain object
     */
    static fromJSON(json) {
        return new Alert(json);
    }

    /**
     * Validate alert data
     */
    validate() {
        const errors = [];

        if (!this.type) {
            errors.push('Tipo de alerta es requerido');
        }

        if (!this.name || this.name.trim().length === 0) {
            errors.push('Nombre es requerido');
        }

        if (!Object.values(ALERT_FREQUENCIES).includes(this.frequency)) {
            errors.push('Frecuencia no es válida');
        }

        if (this.channels.length === 0) {
            errors.push('Debe seleccionar al menos un canal de notificación');
        }

        if (this.recipients.length === 0) {
            errors.push('Debe seleccionar al menos un destinatario');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
