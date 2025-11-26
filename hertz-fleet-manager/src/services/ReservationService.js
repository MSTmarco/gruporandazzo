/**
 * Reservation Service
 * Handles reservation business logic
 */

import { Reservation } from '../models/Reservation.js';

export class ReservationService {
    constructor() {
        this.reservations = [];
    }

    getAllReservations() {
        return this.reservations;
    }

    getReservationById(id) {
        return this.reservations.find(r => r.id === id);
    }

    createReservation(data) {
        const reservation = new Reservation({ ...data, id: this.generateId() });
        const validation = reservation.validate();
        
        if (!validation.isValid) {
            throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
        }

        this.reservations.push(reservation);
        return reservation;
    }

    updateReservation(id, updates) {
        const reservation = this.getReservationById(id);
        if (!reservation) {
            throw new Error('Reservation not found');
        }

        Object.assign(reservation, updates);
        return reservation;
    }

    deleteReservation(id) {
        const index = this.reservations.findIndex(r => r.id === id);
        if (index === -1) {
            throw new Error('Reservation not found');
        }

        this.reservations.splice(index, 1);
    }

    generateId() {
        return this.reservations.length > 0 
            ? Math.max(...this.reservations.map(r => r.id)) + 1 
            : 1;
    }
}
