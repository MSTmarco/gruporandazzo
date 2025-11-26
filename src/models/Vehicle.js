/**
 * Vehicle Model
 * Represents a vehicle in the fleet
 */

import { VEHICLE_STATUS } from '../config/constants.js';

export class Vehicle {
    constructor({
        id = null,
        category = '',
        patent = '',
        model = '',
        status = VEHICLE_STATUS.AVAILABLE,
        client = null,
        contractNumber = null,
        startDate = null,
        endDate = null,
        monthsInRental = 0,
        location = null,
        hasAlert = false,
        alertMessage = '',
        observations = ''
    } = {}) {
        this.id = id;
        this.category = category;
        this.patent = patent;
        this.model = model;
        this.status = status;
        this.client = client;
        this.contractNumber = contractNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.monthsInRental = monthsInRental;
        this.location = location;
        this.hasAlert = hasAlert;
        this.alertMessage = alertMessage;
        this.observations = observations;
    }

    /**
     * Check if vehicle is available
     */
    isAvailable() {
        return this.status === VEHICLE_STATUS.AVAILABLE;
    }

    /**
     * Check if vehicle is rented
     */
    isRented() {
        return this.status === VEHICLE_STATUS.RENTED;
    }

    /**
     * Check if vehicle is reserved
     */
    isReserved() {
        return this.status === VEHICLE_STATUS.RESERVED;
    }

    /**
     * Check if vehicle needs maintenance
     */
    needsMaintenance() {
        return this.status === VEHICLE_STATUS.MAINTENANCE;
    }

    /**
     * Check if vehicle is approaching sale period
     */
    isApproachingSale(thresholdMonths = 11) {
        return this.monthsInRental >= thresholdMonths;
    }

    /**
     * Update vehicle status
     */
    updateStatus(newStatus) {
        if (Object.values(VEHICLE_STATUS).includes(newStatus)) {
            this.status = newStatus;
            return true;
        }
        return false;
    }

    /**
     * Assign to client
     */
    assignToClient(client, contractNumber, startDate, endDate) {
        this.client = client;
        this.contractNumber = contractNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = VEHICLE_STATUS.RENTED;
    }

    /**
     * Release from client
     */
    releaseFromClient() {
        this.client = null;
        this.contractNumber = null;
        this.startDate = null;
        this.endDate = null;
        this.status = VEHICLE_STATUS.AVAILABLE;
    }

    /**
     * Convert to plain object for API/storage
     */
    toJSON() {
        return {
            id: this.id,
            category: this.category,
            patent: this.patent,
            model: this.model,
            status: this.status,
            client: this.client,
            contractNumber: this.contractNumber,
            startDate: this.startDate,
            endDate: this.endDate,
            monthsInRental: this.monthsInRental,
            location: this.location,
            hasAlert: this.hasAlert,
            alertMessage: this.alertMessage,
            observations: this.observations
        };
    }

    /**
     * Create from plain object
     */
    static fromJSON(json) {
        return new Vehicle(json);
    }

    /**
     * Validate vehicle data
     */
    validate() {
        const errors = [];

        if (!this.category) {
            errors.push('Categoría es requerida');
        }

        if (!this.patent) {
            errors.push('Patente es requerida');
        }

        if (!this.model) {
            errors.push('Modelo es requerido');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
