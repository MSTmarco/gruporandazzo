/**
 * Vehicle Service
 * Handles all vehicle-related business logic
 * Follows Single Responsibility Principle
 */

import { Vehicle } from '../models/Vehicle.js';
import { VEHICLE_STATUS, RENTAL_THRESHOLD_MONTHS } from '../config/constants.js';

export class VehicleService {
    constructor() {
        this.vehicles = this.loadVehicles();
    }

    /**
     * Load vehicles from storage (mock data for now)
     */
    loadVehicles() {
        // In production, this would fetch from API
        const mockData = [
            {
                id: 1,
                category: 'C',
                patent: 'C-AH-919-BK',
                model: 'KWID 1.0 ICONIC OUTSIDER',
                status: VEHICLE_STATUS.RENTED,
                client: 'Cliente A',
                contractNumber: '1509661',
                startDate: '2025-01-15',
                endDate: null,
                monthsInRental: 11,
                location: { lat: -34.603722, lng: -58.381592 },
                hasAlert: true,
                alertMessage: 'Próximo a venta'
            },
            {
                id: 2,
                category: 'H',
                patent: 'H-AH-534-CO',
                model: 'SANDERO MANUAL',
                status: VEHICLE_STATUS.RESERVED,
                client: 'Prepago XYZ',
                contractNumber: null,
                startDate: '2025-11-20',
                endDate: '2025-11-25',
                monthsInRental: 3,
                location: { lat: -34.603722, lng: -58.381592 }
            },
            {
                id: 3,
                category: 'H',
                patent: 'H-AH-287-WG',
                model: 'ARGO DRIVE 1.3 MANUAL',
                status: VEHICLE_STATUS.RENTED,
                client: 'SIHORSKI',
                contractNumber: '1504157',
                startDate: '2025-11-01',
                endDate: '2025-11-20',
                monthsInRental: 5,
                location: { lat: -34.603722, lng: -58.381592 }
            }
        ];

        return mockData.map(data => new Vehicle(data));
    }

    /**
     * Get all vehicles
     */
    getAllVehicles() {
        return this.vehicles;
    }

    /**
     * Get vehicle by ID
     */
    getVehicleById(id) {
        return this.vehicles.find(v => v.id === id);
    }

    /**
     * Get vehicle by patent
     */
    getVehicleByPatent(patent) {
        return this.vehicles.find(v => v.patent === patent);
    }

    /**
     * Get vehicles by category
     */
    getVehiclesByCategory(category) {
        return this.vehicles.filter(v => v.category === category);
    }

    /**
     * Get vehicles by status
     */
    getVehiclesByStatus(status) {
        return this.vehicles.filter(v => v.status === status);
    }

    /**
     * Get available vehicles
     */
    getAvailableVehicles() {
        return this.vehicles.filter(v => v.isAvailable());
    }

    /**
     * Get vehicles approaching sale period
     */
    getVehiclesApproachingSale() {
        return this.vehicles.filter(v => v.isApproachingSale(RENTAL_THRESHOLD_MONTHS));
    }

    /**
     * Add new vehicle
     */
    addVehicle(vehicleData) {
        const vehicle = new Vehicle({
            ...vehicleData,
            id: this.generateId()
        });

        const validation = vehicle.validate();
        if (!validation.isValid) {
            throw new Error(`Validación falló: ${validation.errors.join(', ')}`);
        }

        this.vehicles.push(vehicle);
        this.saveVehicles();
        return vehicle;
    }

    /**
     * Update vehicle
     */
    updateVehicle(id, updates) {
        const vehicle = this.getVehicleById(id);
        if (!vehicle) {
            throw new Error('Vehículo no encontrado');
        }

        Object.assign(vehicle, updates);

        const validation = vehicle.validate();
        if (!validation.isValid) {
            throw new Error(`Validación falló: ${validation.errors.join(', ')}`);
        }

        this.saveVehicles();
        return vehicle;
    }

    /**
     * Delete vehicle
     */
    deleteVehicle(id) {
        const index = this.vehicles.findIndex(v => v.id === id);
        if (index === -1) {
            throw new Error('Vehículo no encontrado');
        }

        this.vehicles.splice(index, 1);
        this.saveVehicles();
    }

    /**
     * Assign vehicle to client
     */
    assignVehicle(id, client, contractNumber, startDate, endDate) {
        const vehicle = this.getVehicleById(id);
        if (!vehicle) {
            throw new Error('Vehículo no encontrado');
        }

        if (!vehicle.isAvailable()) {
            throw new Error('Vehículo no está disponible');
        }

        vehicle.assignToClient(client, contractNumber, startDate, endDate);
        this.saveVehicles();
        return vehicle;
    }

    /**
     * Release vehicle from client
     */
    releaseVehicle(id) {
        const vehicle = this.getVehicleById(id);
        if (!vehicle) {
            throw new Error('Vehículo no encontrado');
        }

        vehicle.releaseFromClient();
        this.saveVehicles();
        return vehicle;
    }

    /**
     * Update vehicle status
     */
    updateVehicleStatus(id, newStatus) {
        const vehicle = this.getVehicleById(id);
        if (!vehicle) {
            throw new Error('Vehículo no encontrado');
        }

        if (!vehicle.updateStatus(newStatus)) {
            throw new Error('Estado no válido');
        }

        this.saveVehicles();
        return vehicle;
    }

    /**
     * Get fleet statistics
     */
    getFleetStatistics() {
        const total = this.vehicles.length;
        const available = this.vehicles.filter(v => v.isAvailable()).length;
        const rented = this.vehicles.filter(v => v.isRented()).length;
        const reserved = this.vehicles.filter(v => v.isReserved()).length;
        const maintenance = this.vehicles.filter(v => v.needsMaintenance()).length;
        const approachingSale = this.getVehiclesApproachingSale().length;

        return {
            total,
            available,
            rented,
            reserved,
            maintenance,
            approachingSale,
            occupancyRate: total > 0 ? ((rented / total) * 100).toFixed(1) : 0
        };
    }

    /**
     * Search vehicles
     */
    searchVehicles(query) {
        const lowerQuery = query.toLowerCase();
        return this.vehicles.filter(v => 
            v.patent.toLowerCase().includes(lowerQuery) ||
            v.model.toLowerCase().includes(lowerQuery) ||
            (v.client && v.client.toLowerCase().includes(lowerQuery))
        );
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return this.vehicles.length > 0 
            ? Math.max(...this.vehicles.map(v => v.id)) + 1 
            : 1;
    }

    /**
     * Save vehicles to storage
     */
    saveVehicles() {
        // In production, this would persist to API
        // For now, just keep in memory
        console.log('Vehicles saved:', this.vehicles.length);
    }

    /**
     * Export vehicles data
     */
    exportVehicles() {
        return this.vehicles.map(v => v.toJSON());
    }

    /**
     * Import vehicles data
     */
    importVehicles(data) {
        this.vehicles = data.map(d => Vehicle.fromJSON(d));
        this.saveVehicles();
    }
}
