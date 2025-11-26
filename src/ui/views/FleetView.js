/**
 * Fleet View
 * Displays and manages fleet vehicles
 * Follows Single Responsibility Principle
 */

import { formatDate } from '../../utils/dateUtils.js';

export class FleetView {
    constructor(services) {
        this.services = services;
        this.container = null;
        this.filteredVehicles = [];
    }

    /**
     * Render the fleet view
     */
    render(container) {
        this.container = container;
        this.filteredVehicles = this.services.vehicle.getAllVehicles();

        container.innerHTML = `
            <div class="actions-bar">
                <div class="search-filter">
                    <input type="text" class="search-input" placeholder="Buscar por patente, modelo..." 
                           id="searchInput">
                    <select class="filter-select" id="categoryFilter">
                        <option value="">Todas las categorías</option>
                        <option value="C">Categoría C</option>
                        <option value="H">Categoría H</option>
                        <option value="K">Categoría K</option>
                    </select>
                    <select class="filter-select" id="statusFilter">
                        <option value="">Todos los estados</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Reservado">Reservado</option>
                        <option value="Alquilado">Alquilado</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                    </select>
                </div>
                <button class="btn btn-primary" id="addVehicleBtn">+ Agregar Vehículo</button>
            </div>

            <div class="table-container">
                ${this.renderTable()}
            </div>
        `;

        this.setupEventListeners();
    }

    /**
     * Render vehicles table
     */
    renderTable() {
        return `
            <table id="vehicleTable">
                <thead>
                    <tr>
                        <th>Categoría</th>
                        <th>Patente</th>
                        <th>Modelo</th>
                        <th>Estado</th>
                        <th>Cliente/Reserva</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Tiempo en Renting</th>
                        <th>Ubicación</th>
                        <th>Alertas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.renderTableRows()}
                </tbody>
            </table>
        `;
    }

    /**
     * Render table rows
     */
    renderTableRows() {
        if (this.filteredVehicles.length === 0) {
            return `
                <tr>
                    <td colspan="11" style="text-align: center; padding: 2rem;">
                        No se encontraron vehículos
                    </td>
                </tr>
            `;
        }

        return this.filteredVehicles.map(vehicle => `
            <tr data-vehicle-id="${vehicle.id}">
                <td><span class="category-badge">${vehicle.category}</span></td>
                <td>${vehicle.patent}</td>
                <td>${vehicle.model}</td>
                <td><span class="status-badge status-${vehicle.status.toLowerCase()}">${vehicle.status}</span></td>
                <td>${vehicle.client || '-'}</td>
                <td>${vehicle.startDate ? formatDate(vehicle.startDate) : '-'}</td>
                <td>${vehicle.endDate ? formatDate(vehicle.endDate) : '-'}</td>
                <td>${vehicle.monthsInRental} meses</td>
                <td><a href="#" class="view-location" data-vehicle-id="${vehicle.id}">Ver mapa</a></td>
                <td>${vehicle.hasAlert ? '<span class="alert-icon" title="' + vehicle.alertMessage + '">⚠️</span>' : ''}</td>
                <td>
                    <button class="action-btn edit-vehicle" data-vehicle-id="${vehicle.id}">Editar</button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Search input
        const searchInput = this.container.querySelector('#searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Category filter
        const categoryFilter = this.container.querySelector('#categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => this.handleFilter());
        }

        // Status filter
        const statusFilter = this.container.querySelector('#statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => this.handleFilter());
        }

        // Add vehicle button
        const addBtn = this.container.querySelector('#addVehicleBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.handleAddVehicle());
        }

        // Edit vehicle buttons
        const editButtons = this.container.querySelectorAll('.edit-vehicle');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const vehicleId = parseInt(e.target.getAttribute('data-vehicle-id'));
                this.handleEditVehicle(vehicleId);
            });
        });

        // View location links
        const locationLinks = this.container.querySelectorAll('.view-location');
        locationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const vehicleId = parseInt(e.target.getAttribute('data-vehicle-id'));
                this.handleViewLocation(vehicleId);
            });
        });
    }

    /**
     * Handle search
     */
    handleSearch(query) {
        if (query.trim()) {
            this.filteredVehicles = this.services.vehicle.searchVehicles(query);
        } else {
            this.applyFilters();
        }
        this.updateTable();
    }

    /**
     * Handle filter changes
     */
    handleFilter() {
        this.applyFilters();
        this.updateTable();
    }

    /**
     * Apply active filters
     */
    applyFilters() {
        const category = this.container.querySelector('#categoryFilter')?.value || '';
        const status = this.container.querySelector('#statusFilter')?.value || '';

        const filters = {};
        if (category) filters.category = category;
        if (status) filters.status = status;

        const allVehicles = this.services.vehicle.getAllVehicles();
        this.filteredVehicles = this.services.filter.filterVehicles(allVehicles, filters);
    }

    /**
     * Update table without full re-render
     */
    updateTable() {
        const tbody = this.container.querySelector('#vehicleTable tbody');
        if (tbody) {
            tbody.innerHTML = this.renderTableRows();
            this.setupEventListeners();
        }
    }

    /**
     * Handle add vehicle
     */
    handleAddVehicle() {
        alert('Abrir modal de agregar vehículo (implementación pendiente)');
    }

    /**
     * Handle edit vehicle
     */
    handleEditVehicle(vehicleId) {
        const vehicle = this.services.vehicle.getVehicleById(vehicleId);
        if (vehicle) {
            alert(`Editar vehículo: ${vehicle.patent} (implementación pendiente)`);
        }
    }

    /**
     * Handle view location
     */
    handleViewLocation(vehicleId) {
        const vehicle = this.services.vehicle.getVehicleById(vehicleId);
        if (vehicle) {
            alert(`Ver ubicación de: ${vehicle.patent}\nLat: ${vehicle.location?.lat}, Lng: ${vehicle.location?.lng}`);
        }
    }

    /**
     * Cleanup
     */
    cleanup() {
        // Remove event listeners
    }
}
