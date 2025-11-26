/**
 * Reservation Model
 * Represents a vehicle reservation
 */

export class Reservation {
    constructor({
        id = null,
        vehicleId = null,
        vehicle = null,
        client = '',
        contractNumber = '',
        startDate = null,
        endDate = null,
        startTime = null,
        endTime = null,
        status = 'reserved', // 'reserved' | 'rented' | 'completed' | 'cancelled'
        notes = '',
        createdAt = new Date(),
        updatedAt = new Date()
    } = {}) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.vehicle = vehicle;
        this.client = client;
        this.contractNumber = contractNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Check if reservation is active
     */
    isActive() {
        return this.status === 'reserved' || this.status === 'rented';
    }

    /**
     * Check if reservation is completed
     */
    isCompleted() {
        return this.status === 'completed';
    }

    /**
     * Check if reservation is cancelled
     */
    isCancelled() {
        return this.status === 'cancelled';
    }

    /**
     * Calculate duration in days
     */
    getDurationInDays() {
        if (!this.startDate || !this.endDate) return 0;
        
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Calculate duration in hours
     */
    getDurationInHours() {
        if (!this.startDate || !this.endDate || !this.startTime || !this.endTime) {
            return this.getDurationInDays() * 24;
        }

        const start = new Date(`${this.startDate}T${this.startTime}`);
        const end = new Date(`${this.endDate}T${this.endTime}`);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60));
    }

    /**
     * Check if reservation overlaps with date range
     */
    overlaps(startDate, endDate) {
        const resStart = new Date(this.startDate);
        const resEnd = new Date(this.endDate);
        const checkStart = new Date(startDate);
        const checkEnd = new Date(endDate);

        return resStart <= checkEnd && resEnd >= checkStart;
    }

    /**
     * Update reservation status
     */
    updateStatus(newStatus) {
        const validStatuses = ['reserved', 'rented', 'completed', 'cancelled'];
        if (validStatuses.includes(newStatus)) {
            this.status = newStatus;
            this.updatedAt = new Date();
            return true;
        }
        return false;
    }

    /**
     * Convert to plain object
     */
    toJSON() {
        return {
            id: this.id,
            vehicleId: this.vehicleId,
            vehicle: this.vehicle,
            client: this.client,
            contractNumber: this.contractNumber,
            startDate: this.startDate,
            endDate: this.endDate,
            startTime: this.startTime,
            endTime: this.endTime,
            status: this.status,
            notes: this.notes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    /**
     * Create from plain object
     */
    static fromJSON(json) {
        return new Reservation(json);
    }

    /**
     * Validate reservation data
     */
    validate() {
        const errors = [];

        if (!this.vehicleId) {
            errors.push('Vehículo es requerido');
        }

        if (!this.client) {
            errors.push('Cliente es requerido');
        }

        if (!this.startDate) {
            errors.push('Fecha de inicio es requerida');
        }

        if (!this.endDate) {
            errors.push('Fecha de fin es requerida');
        }

        if (this.startDate && this.endDate) {
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            if (end < start) {
                errors.push('Fecha de fin debe ser posterior a fecha de inicio');
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
