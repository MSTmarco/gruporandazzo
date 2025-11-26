/**
 * Reports View
 */

export class ReportsView {
    constructor(services) {
        this.services = services;
    }

    render(container) {
        container.innerHTML = `
            <h2 style="margin-bottom: 1.5rem;">Reportes Automáticos</h2>
            
            <div class="reports-grid">
                <div class="report-card">
                    <h3>📊 Reporte de Ocupación</h3>
                    <p>Análisis de ocupación de flota por período</p>
                    <button class="btn btn-primary" onclick="alert('Generando reporte...')">Generar Reporte</button>
                </div>
                <div class="report-card">
                    <h3>💰 Reporte Financiero</h3>
                    <p>Ingresos y facturación por cliente</p>
                    <button class="btn btn-primary" onclick="alert('Generando reporte...')">Generar Reporte</button>
                </div>
                <div class="report-card">
                    <h3>🚗 Estado de Flota</h3>
                    <p>Resumen completo de todos los vehículos</p>
                    <button class="btn btn-primary" onclick="alert('Generando reporte...')">Generar Reporte</button>
                </div>
                <div class="report-card">
                    <h3>📅 Próximas Reservas</h3>
                    <p>Reservas confirmadas próximos 30 días</p>
                    <button class="btn btn-primary" onclick="alert('Generando reporte...')">Generar Reporte</button>
                </div>
                <div class="report-card">
                    <h3>⚠️ Vehículos Próximos a Venta</h3>
                    <p>Vehículos cerca del tiempo máximo de renting</p>
                    <button class="btn btn-primary" onclick="alert('Generando reporte...')">Generar Reporte</button>
                </div>
                <div class="report-card">
                    <h3>🔧 Historial de Mantenimiento</h3>
                    <p>Registro completo de mantenimientos</p>
                    <button class="btn btn-primary" onclick="alert('Generando reporte...')">Generar Reporte</button>
                </div>
            </div>

            <style>
                .reports-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                .report-card {
                    background: white;
                    border-radius: 8px;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .report-card h3 { margin-bottom: 1rem; }
                .report-card p { color: var(--gray-700); margin-bottom: 1.5rem; }
            </style>
        `;
    }

    cleanup() {}
}
