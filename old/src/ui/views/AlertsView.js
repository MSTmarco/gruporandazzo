/**
 * Alerts View - Complete Implementation
 */

export class AlertsView {
    constructor(services) {
        this.services = services;
        this.container = null;
    }

    render(container) {
        this.container = container;
        
        container.innerHTML = `
            <div class="actions-bar">
                <h2>Sistema de Alertas</h2>
                <button class="btn btn-primary" onclick="alert('Configurar nueva alerta')">+ Configurar Nueva Alerta</button>
            </div>

            <div class="stats-grid" style="margin-bottom: 2rem;">
                <div class="stat-card">
                    <h3>Alertas Activas</h3>
                    <div class="value">2</div>
                </div>
                <div class="stat-card">
                    <h3>Notificaciones Enviadas (30 días)</h3>
                    <div class="value">47</div>
                </div>
                <div class="stat-card">
                    <h3>Usuarios Suscritos</h3>
                    <div class="value">4</div>
                </div>
            </div>

            <h3 style="margin-bottom: 1rem;">Alertas Configuradas</h3>
            
            <div style="display: grid; gap: 1.5rem; margin-bottom: 2rem;">
                ${this.renderConfiguredAlerts()}
            </div>

            <h3 style="margin-bottom: 1rem;">Historial de Notificaciones (Últimas 7 días)</h3>
            <div class="alerts-section">
                ${this.renderAlertHistory()}
            </div>
        `;
    }

    renderConfiguredAlerts() {
        return `
            <div style="background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid var(--warning);">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <h4 style="margin-bottom: 0.5rem;">⚠️ Vehículos próximos a cambio de uso (12 meses)
                            <span style="background: var(--success); color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem;">Activa</span>
                        </h4>
                        <p style="color: var(--gray-700); margin-bottom: 1rem;">Notifica cuando un vehículo alcanza 11 meses</p>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--gray-200);">
                            <div><div style="font-size: 0.85rem; color: var(--gray-700);">Frecuencia</div><div style="font-weight: 600;">Diaria (9:00 AM)</div></div>
                            <div><div style="font-size: 0.85rem; color: var(--gray-700);">Canal</div><div style="font-weight: 600;">📧 Email</div></div>
                            <div><div style="font-size: 0.85rem; color: var(--gray-700);">Última ejecución</div><div style="font-weight: 600;">Hoy, 09:00</div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid var(--info);">
                <div>
                    <h4 style="margin-bottom: 0.5rem;">🔔 Modificaciones de Reservas
                        <span style="background: var(--success); color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem;">Activa</span>
                    </h4>
                    <p style="color: var(--gray-700); margin-bottom: 1rem;">Notifica cuando se modifica una reserva</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--gray-200);">
                        <div><div style="font-size: 0.85rem; color: var(--gray-700);">Frecuencia</div><div style="font-weight: 600;">Tiempo real</div></div>
                        <div><div style="font-size: 0.85rem; color: var(--gray-700);">Canal</div><div style="font-weight: 600;">📧 Email</div></div>
                        <div><div style="font-size: 0.85rem; color: var(--gray-700);">Última ejecución</div><div style="font-weight: 600;">Hace 2 horas</div></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAlertHistory() {
        return `
            <div class="alert-card">
                <div class="alert-content">
                    <h4>⚠️ Vehículo próximo a cambio de uso</h4>
                    <p><strong>C-AH-919-BK</strong> - KWID 1.0 ICONIC OUTSIDER</p>
                    <p>Tiempo en renting: 11 meses. Cambio estimado en 30 días.</p>
                </div>
                <div class="alert-time">Hace 2 horas</div>
            </div>
            <div class="alert-card info">
                <div class="alert-content">
                    <h4>🔔 Nueva reserva creada</h4>
                    <p><strong>K-AH-080-IM</strong> - PRECISION CVT</p>
                    <p>Cliente: Prepago #1628844. Fechas: 22/11 al 30/11.</p>
                </div>
                <div class="alert-time">Hace 5 horas</div>
            </div>
            <div class="alert-card warning">
                <div class="alert-content">
                    <h4>🔧 Mantenimiento programado</h4>
                    <p><strong>H-AH-534-CO</strong> - SANDERO MANUAL</p>
                    <p>Service 10.000 km pendiente.</p>
                </div>
                <div class="alert-time">Ayer</div>
            </div>
        `;
    }

    cleanup() {}
}
