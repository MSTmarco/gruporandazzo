/**
 * Sheet View - Vista Planilla
 * Complete Excel-style view with hourly/daily calendar
 */

import { formatDate } from '../../utils/dateUtils.js';

export class SheetView {
    constructor(services) {
        this.services = services;
        this.container = null;
        this.viewMode = 'hour'; // 'hour' or 'day'
        this.currentMonth = '2025-11';
    }

    render(container) {
        this.container = container;

        container.innerHTML = `
            <div class="sheet-actions">
                <div>
                    <h2 style="margin-bottom: 0.5rem;">Vista Planilla - Disponibilidad</h2>
                    <p style="color: var(--gray-700); font-size: 0.9rem;">Vista completa con calendario por horas</p>
                </div>
                <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <label style="font-size: 0.9rem; font-weight: 600;">Vista:</label>
                        <select id="viewMode" class="filter-select" style="width: 120px;">
                            <option value="day">Por Día</option>
                            <option value="hour" selected>Por Hora</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <label style="font-size: 0.9rem; font-weight: 600;">Mes:</label>
                        <select id="monthSelector" class="filter-select" style="width: 150px;">
                            <option value="2025-11" selected>Noviembre 2025</option>
                            <option value="2025-12">Diciembre 2025</option>
                            <option value="2026-01">Enero 2026</option>
                            <option value="2026-02">Febrero 2026</option>
                        </select>
                    </div>
                    <button class="btn btn-secondary" onclick="alert('Exportando a Excel...')">Exportar a Excel</button>
                    <button class="btn btn-primary" onclick="alert('Imprimiendo...')">Imprimir</button>
                </div>
            </div>

            <!-- Filters -->
            <div style="padding: 1rem; background: white; border-bottom: 1px solid var(--gray-200); display: flex; gap: 1rem; flex-wrap: wrap;">
                <input type="text" class="search-input" placeholder="Buscar patente..." style="flex: 1; max-width: 200px;">
                <input type="text" class="search-input" placeholder="Buscar modelo..." style="flex: 1; max-width: 200px;">
                <select class="filter-select">
                    <option value="">Todas las categorías</option>
                    <option value="C">Categoría C</option>
                    <option value="H">Categoría H</option>
                    <option value="K">Categoría K</option>
                </select>
            </div>

            <!-- Day View -->
            <div id="dayView" class="sheet-view" style="display: none;">
                ${this.renderDayView()}
            </div>

            <!-- Hour View -->
            <div id="hourView" class="sheet-view">
                ${this.renderHourView()}
            </div>

            <!-- Legend -->
            <div class="sheet-legend">
                <div class="sheet-legend-item">
                    <div class="sheet-legend-color" style="background: #10b981;"></div>
                    <span>Alquilado</span>
                </div>
                <div class="sheet-legend-item">
                    <div class="sheet-legend-color" style="background: #3b82f6;"></div>
                    <span>Reservado</span>
                </div>
                <div class="sheet-legend-item">
                    <div class="sheet-legend-color" style="background: white;"></div>
                    <span>Disponible</span>
                </div>
                <div class="sheet-legend-item">
                    <div class="sheet-legend-color" style="background: #fee2e2;"></div>
                    <span>Feriado</span>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    renderDayView() {
        return `
            <div class="hour-view-container">
                <div class="hour-grid">
                    <!-- Vehicle Column -->
                    <div class="hour-header-vehicles">
                        <div class="hour-header-cell">Vehículo</div>
                        
                        <div class="hour-category-label">CATEGORÍA C</div>
                        <div class="hour-vehicle-cell"><strong>C-AH-919-BK</strong><div style="font-size:0.7rem;color:var(--gray-700)">KWID 1.0 ICONIC</div></div>
                        <div class="hour-vehicle-cell"><strong>C-AH-919-BH</strong><div style="font-size:0.7rem;color:var(--gray-700)">KWID 1.0 ICONIC</div></div>
                        <div class="hour-vehicle-cell"><strong>C-AH-916-WL</strong><div style="font-size:0.7rem;color:var(--gray-700)">KWID 1.0 ICONIC</div></div>
                        
                        <div class="hour-category-label">CATEGORÍA H</div>
                        <div class="hour-vehicle-cell"><strong>H-AH-534-CO</strong><div style="font-size:0.7rem;color:var(--gray-700)">SANDERO MANUAL</div></div>
                        <div class="hour-vehicle-cell"><strong>H-AH-287-WG</strong><div style="font-size:0.7rem;color:var(--gray-700)">ARGO DRIVE 1.3</div></div>
                        
                        <div class="hour-category-label">CATEGORÍA K</div>
                        <div class="hour-vehicle-cell"><strong>K-AH-080-IM</strong><div style="font-size:0.7rem;color:var(--gray-700)">PRECISION CVT</div></div>
                    </div>

                    <!-- Timeline -->
                    <div class="hour-timeline-container">
                        <div class="hour-timeline-header">
                            ${this.generateDayHeaders()}
                        </div>
                        <div class="hour-timeline-body">
                            ${this.generateDayReservations()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderHourView() {
        return `
            <div class="hour-view-container">
                <div class="hour-grid">
                    <!-- Vehicle Column -->
                    <div class="hour-header-vehicles">
                        <div class="hour-header-cell">Vehículo</div>
                        
                        <div class="hour-category-label">CATEGORÍA C</div>
                        <div class="hour-vehicle-cell"><strong>C-AH-919-BK</strong><div style="font-size:0.7rem;color:var(--gray-700)">KWID 1.0 ICONIC</div></div>
                        <div class="hour-vehicle-cell"><strong>C-AH-919-BH</strong><div style="font-size:0.7rem;color:var(--gray-700)">KWID 1.0 ICONIC</div></div>
                        <div class="hour-vehicle-cell"><strong>C-AH-916-WL</strong><div style="font-size:0.7rem;color:var(--gray-700)">KWID 1.0 ICONIC</div></div>
                        
                        <div class="hour-category-label">CATEGORÍA H</div>
                        <div class="hour-vehicle-cell"><strong>H-AH-534-CO</strong><div style="font-size:0.7rem;color:var(--gray-700)">SANDERO MANUAL</div></div>
                        <div class="hour-vehicle-cell"><strong>H-AH-287-WG</strong><div style="font-size:0.7rem;color:var(--gray-700)">ARGO DRIVE 1.3</div></div>
                        
                        <div class="hour-category-label">CATEGORÍA K</div>
                        <div class="hour-vehicle-cell"><strong>K-AH-080-IM</strong><div style="font-size:0.7rem;color:var(--gray-700)">PRECISION CVT</div></div>
                    </div>

                    <!-- Timeline -->
                    <div class="hour-timeline-container">
                        <div class="hour-timeline-header hour-header-grid">
                            ${this.generateHourHeaders()}
                        </div>
                        <div class="hour-timeline-body">
                            ${this.generateHourReservations()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateDayHeaders() {
        const days = ['Vie 1/11', 'Sáb 2/11', 'Dom 3/11', 'Lun 4/11', 'Mar 5/11', 'Mié 6/11', 'Jue 7/11', 
                      'Vie 8/11', 'Sáb 9/11', 'Dom 10/11', 'Lun 11/11', 'Mar 12/11', 'Mié 13/11', 'Jue 14/11',
                      'Vie 15/11', 'Sáb 16/11', 'Dom 17/11', 'Lun 18/11', 'Mar 19/11', 'Mié 20/11', 'Jue 21/11',
                      'Vie 22/11', 'Sáb 23/11', 'Dom 24/11', 'Lun 25/11', 'Mar 26/11', 'Mié 27/11', 'Jue 28/11',
                      'Vie 29/11', 'Sáb 30/11'];
        
        return days.map(day => `<div class="day-date-cell">${day}</div>`).join('');
    }

    generateHourHeaders() {
        return `
            <div class="hour-date-group">
                <div class="hour-date-label">Vie 18/11</div>
                <div class="hour-slots">
                    <div class="hour-slot">6</div>
                    <div class="hour-slot">12</div>
                    <div class="hour-slot">18</div>
                    <div class="hour-slot">24</div>
                </div>
            </div>
            <div class="hour-date-group">
                <div class="hour-date-label">Sáb 19/11</div>
                <div class="hour-slots">
                    <div class="hour-slot">6</div>
                    <div class="hour-slot">12</div>
                    <div class="hour-slot">18</div>
                    <div class="hour-slot">24</div>
                </div>
            </div>
            <div class="hour-date-group">
                <div class="hour-date-label">Dom 20/11</div>
                <div class="hour-slots">
                    <div class="hour-slot">6</div>
                    <div class="hour-slot">12</div>
                    <div class="hour-slot">18</div>
                    <div class="hour-slot">24</div>
                </div>
            </div>
            <div class="hour-date-group" style="background:#fee2e2;">
                <div class="hour-date-label">Lun 21/11</div>
                <div class="hour-slots">
                    <div class="hour-slot">6</div>
                    <div class="hour-slot">12</div>
                    <div class="hour-slot">18</div>
                    <div class="hour-slot">24</div>
                </div>
            </div>
            <div class="hour-date-group">
                <div class="hour-date-label">Mar 22/11</div>
                <div class="hour-slots">
                    <div class="hour-slot">6</div>
                    <div class="hour-slot">12</div>
                    <div class="hour-slot">18</div>
                    <div class="hour-slot">24</div>
                </div>
            </div>
        `;
    }

    generateDayReservations() {
        return `
            <div class="hour-category-spacer"></div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar rented" style="left:0%;width:100%;" onclick="alert('Cliente A - #1509661')">
                    <div class="reservation-label">Cliente A - #1509661</div>
                </div>
            </div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar rented" style="left:13.33%;width:46.67%;" onclick="alert('#06856')">
                    <div class="reservation-label">#06856</div>
                </div>
            </div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar reserved" style="left:0%;width:40%;" onclick="alert('Prepago - #1514206')">
                    <div class="reservation-label">Prepago - #1514206</div>
                </div>
            </div>
            
            <div class="hour-category-spacer"></div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar reserved" style="left:63.33%;width:20%;" onclick="alert('Prepago XYZ')">
                    <div class="reservation-label">Prepago XYZ</div>
                </div>
            </div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar rented" style="left:0%;width:66.67%;" onclick="alert('SIHORSKI - #1504157')">
                    <div class="reservation-label">SIHORSKI - #1504157</div>
                </div>
            </div>
            
            <div class="hour-category-spacer"></div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar reserved" style="left:70%;width:30%;" onclick="alert('Prepago - #1628844')">
                    <div class="reservation-label">Prepago - #1628844</div>
                </div>
            </div>
        `;
    }

    generateHourReservations() {
        return `
            <div class="hour-category-spacer"></div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar rented" style="left:0%;width:100%;" onclick="alert('Cliente A')">
                    <div class="reservation-label">Cliente A - #1509661</div>
                </div>
            </div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar rented" style="left:25%;width:55%;" onclick="alert('#06856')">
                    <div class="reservation-label">#06856</div>
                </div>
            </div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar reserved" style="left:0%;width:30%;" onclick="alert('Prepago')">
                    <div class="reservation-label">Prepago - #1514206</div>
                </div>
            </div>
            
            <div class="hour-category-spacer"></div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar reserved" style="left:52.5%;width:37.5%;" onclick="alert('Prepago XYZ')">
                    <div class="reservation-label">Prepago XYZ</div>
                </div>
            </div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar rented" style="left:0%;width:62.5%;" onclick="alert('SIHORSKI')">
                    <div class="reservation-label">SIHORSKI - #1504157</div>
                </div>
            </div>
            
            <div class="hour-category-spacer"></div>
            <div class="hour-vehicle-row">
                <div class="reservation-bar reserved" style="left:80%;width:20%;" onclick="alert('Prepago')">
                    <div class="reservation-label">Prepago - #1628844</div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const viewModeSelect = this.container.querySelector('#viewMode');
        if (viewModeSelect) {
            viewModeSelect.addEventListener('change', (e) => {
                this.viewMode = e.target.value;
                this.toggleView();
            });
        }
    }

    toggleView() {
        const dayView = this.container.querySelector('#dayView');
        const hourView = this.container.querySelector('#hourView');
        
        if (this.viewMode === 'day') {
            dayView.style.display = 'block';
            hourView.style.display = 'none';
        } else {
            dayView.style.display = 'none';
            hourView.style.display = 'block';
        }
    }

    cleanup() {
        // Cleanup if needed
    }
}
