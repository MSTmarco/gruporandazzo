/**
 * Dashboard View
 * Displays dashboard with statistics and alerts
 * Follows Single Responsibility Principle
 */

import { createElement } from '../../utils/domUtils.js';
import { getRelativeTime } from '../../utils/dateUtils.js';

export class DashboardView {
    constructor(services) {
        this.services = services;
        this.container = null;
    }

    /**
     * Render the dashboard
     */
    render(container) {
        this.container = container;
        
        const stats = this.services.vehicle.getFleetStatistics();
        
        container.innerHTML = `
            <div class="stats-grid">
                ${this.renderStatCard('Flota Total', stats.total, '+2 este mes', 'positive')}
                ${this.renderStatCard('Disponibles', stats.available)}
                ${this.renderStatCard('Alquilados', stats.rented, `Ocupación: ${stats.occupancyRate}%`, 'positive')}
                ${this.renderStatCard('Reservados', stats.reserved)}
                ${this.renderStatCard('Alertas Activas', 3)}
                ${this.renderStatCard('Próximo a Venta', stats.approachingSale)}
            </div>

            <h2 style="margin-bottom: 1rem;">Alertas Recientes</h2>
            <div class="alerts-section">
                ${this.renderAlerts()}
            </div>
        `;
    }

    /**
     * Render a stat card
     */
    renderStatCard(title, value, change = '', changeType = '') {
        return `
            <div class="stat-card">
                <h3>${title}</h3>
                <div class="value">${value}</div>
                ${change ? `<div class="change ${changeType}">${change}</div>` : ''}
            </div>
        `;
    }

    /**
     * Render alerts section
     */
    renderAlerts() {
        const vehicles = this.services.vehicle.getVehiclesApproachingSale();
        
        let alertsHTML = '';

        // Alert for vehicles approaching sale
        if (vehicles.length > 0) {
            vehicles.forEach(vehicle => {
                alertsHTML += `
                    <div class="alert-card">
                        <div class="alert-content">
                            <h4>Vehículo próximo a cambio de uso</h4>
                            <p>${vehicle.model} (${vehicle.patent}) - ${vehicle.monthsInRental} meses en renting</p>
                        </div>
                        <div class="alert-time">Hace 2 horas</div>
                    </div>
                `;
            });
        }

        // Sample alerts
        alertsHTML += `
            <div class="alert-card warning">
                <div class="alert-content">
                    <h4>Mantenimiento programado</h4>
                    <p>H-AH-534-CO - SANDERO MANUAL - Service 10.000 km pendiente</p>
                </div>
                <div class="alert-time">Ayer</div>
            </div>
            <div class="alert-card info">
                <div class="alert-content">
                    <h4>Devolución programada</h4>
                    <p>H-AH-287-WG - ARGO DRIVE 1.3 MANUAL - Devolución el 20/11/2025</p>
                </div>
                <div class="alert-time">Hace 5 horas</div>
            </div>
        `;

        return alertsHTML || '<p>No hay alertas recientes</p>';
    }

    /**
     * Cleanup when view is destroyed
     */
    cleanup() {
        // Remove event listeners if any
    }
}
