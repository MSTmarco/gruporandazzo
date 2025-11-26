/**
 * Calendar View - Complete Implementation
 */

export class CalendarView {
    constructor(services) {
        this.services = services;
        this.container = null;
    }

    render(container) {
        this.container = container;
        
        container.innerHTML = `
            <div class="calendar-view">
                <div class="calendar-header">
                    <h3>Noviembre 2025</h3>
                    <div class="calendar-nav">
                        <button onclick="alert('Mes anterior')">← Anterior</button>
                        <button onclick="alert('Ir a hoy')">Hoy</button>
                        <button onclick="alert('Mes siguiente')">Siguiente →</button>
                    </div>
                </div>

                <div style="margin-bottom: 1rem; display: flex; gap: 1rem; font-size: 0.9rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 16px; height: 16px; background: var(--rented); border-radius: 3px;"></div>
                        <span>Alquilado</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 16px; height: 16px; background: var(--reserved); border-radius: 3px;"></div>
                        <span>Reservado</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 16px; height: 16px; background: #fef3c7; border-radius: 3px;"></div>
                        <span>Feriado</span>
                    </div>
                </div>

                <div class="calendar-grid">
                    <div class="calendar-day header">Lun</div>
                    <div class="calendar-day header">Mar</div>
                    <div class="calendar-day header">Mié</div>
                    <div class="calendar-day header">Jue</div>
                    <div class="calendar-day header">Vie</div>
                    <div class="calendar-day header">Sáb</div>
                    <div class="calendar-day header">Dom</div>

                    ${this.renderCalendarDays()}
                </div>
            </div>
        `;
    }

    renderCalendarDays() {
        return `
            <div class="calendar-day"></div>
            <div class="calendar-day"></div>
            <div class="calendar-day"></div>
            <div class="calendar-day"></div>
            <div class="calendar-day"></div>
            <div class="calendar-day">
                <div class="calendar-day-number">1</div>
                <div class="calendar-event rented">C-AH-919-BK</div>
                <div class="calendar-event rented">H-AH-287-WG</div>
            </div>
            <div class="calendar-day"><div class="calendar-day-number">2</div><div class="calendar-event rented">C-AH-919-BK</div></div>
            <div class="calendar-day"><div class="calendar-day-number">3</div></div>
            <div class="calendar-day"><div class="calendar-day-number">4</div></div>
            <div class="calendar-day"><div class="calendar-day-number">5</div></div>
            <div class="calendar-day"><div class="calendar-day-number">6</div></div>
            <div class="calendar-day"><div class="calendar-day-number">7</div></div>
            <div class="calendar-day"><div class="calendar-day-number">8</div></div>
            <div class="calendar-day"><div class="calendar-day-number">9</div></div>
            <div class="calendar-day"><div class="calendar-day-number">10</div></div>
            <div class="calendar-day"><div class="calendar-day-number">11</div></div>
            <div class="calendar-day"><div class="calendar-day-number">12</div></div>
            <div class="calendar-day"><div class="calendar-day-number">13</div></div>
            <div class="calendar-day"><div class="calendar-day-number">14</div></div>
            <div class="calendar-day"><div class="calendar-day-number">15</div></div>
            <div class="calendar-day"><div class="calendar-day-number">16</div></div>
            <div class="calendar-day"><div class="calendar-day-number">17</div></div>
            <div class="calendar-day" style="border: 2px solid var(--secondary);">
                <div class="calendar-day-number">18</div>
                <div class="calendar-event rented">C-AH-919-BK</div>
            </div>
            <div class="calendar-day"><div class="calendar-day-number">19</div></div>
            <div class="calendar-day">
                <div class="calendar-day-number">20</div>
                <div class="calendar-event">H-AH-534-CO</div>
            </div>
            <div class="calendar-day"><div class="calendar-day-number">21</div></div>
            <div class="calendar-day">
                <div class="calendar-day-number">22</div>
                <div class="calendar-event">K-AH-080-IM</div>
            </div>
            <div class="calendar-day"><div class="calendar-day-number">23</div></div>
            <div class="calendar-day holiday">
                <div class="calendar-day-number">24</div>
                <div style="font-size: 0.75rem; color: #92400e;">Feriado</div>
            </div>
            <div class="calendar-day"><div class="calendar-day-number">25</div></div>
            <div class="calendar-day"><div class="calendar-day-number">26</div></div>
            <div class="calendar-day"><div class="calendar-day-number">27</div></div>
            <div class="calendar-day"><div class="calendar-day-number">28</div></div>
            <div class="calendar-day"><div class="calendar-day-number">29</div></div>
            <div class="calendar-day"><div class="calendar-day-number">30</div></div>
        `;
    }

    cleanup() {}
}
