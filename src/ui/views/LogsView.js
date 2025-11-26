/**
 * Logs View
 */

export class LogsView {
    constructor(services) {
        this.services = services;
    }

    render(container) {
        container.innerHTML = `
            <div class="actions-bar">
                <h2>Registro de Actividad</h2>
                <select class="filter-select">
                    <option>Últimas 24 horas</option>
                    <option>Última semana</option>
                    <option>Último mes</option>
                </select>
            </div>

            <div class="table-container">
                <div class="log-entry">
                    <div class="timestamp">18/11/2025 14:32</div>
                    <div><strong>Admin Usuario</strong> <span class="action">generó reporte de ocupación</span></div>
                </div>
                <div class="log-entry">
                    <div class="timestamp">18/11/2025 12:15</div>
                    <div><strong>Juan Operador</strong> <span class="action">actualizó estado de vehículo H-AH-287-WG</span></div>
                </div>
                <div class="log-entry">
                    <div class="timestamp">18/11/2025 10:22</div>
                    <div><strong>Sistema</strong> <span class="action">envió alerta: Vehículo próximo a cambio</span></div>
                </div>
                <div class="log-entry">
                    <div class="timestamp">17/11/2025 18:45</div>
                    <div><strong>María Supervisor</strong> <span class="action">creó nueva reserva para K-AH-080-IM</span></div>
                </div>
            </div>

            <style>
                .log-entry {
                    padding: 1rem;
                    border-bottom: 1px solid var(--gray-200);
                }
                .log-entry:last-child { border-bottom: none; }
                .timestamp {
                    color: var(--gray-700);
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                    font-size: 0.9rem;
                }
                .action { color: var(--primary); }
            </style>
        `;
    }

    cleanup() {}
}
