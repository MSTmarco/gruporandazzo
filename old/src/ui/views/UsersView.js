/**
 * Users View
 */

export class UsersView {
    constructor(services) {
        this.services = services;
    }

    render(container) {
        container.innerHTML = `
            <div class="actions-bar">
                <h2>Gestión de Usuarios</h2>
                <button class="btn btn-primary" onclick="alert('Agregar usuario')">+ Agregar Usuario</button>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Último Acceso</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Admin Usuario</td>
                            <td>admin@gruporandazo.com</td>
                            <td><span class="user-badge user-admin">Administrador</span></td>
                            <td>Hoy, 14:32</td>
                            <td><span class="status-badge status-alquilado">Activo</span></td>
                            <td><button class="action-btn" onclick="alert('Editar')">Editar</button></td>
                        </tr>
                        <tr>
                            <td>Juan Operador</td>
                            <td>operador@gruporandazo.com</td>
                            <td><span class="user-badge user-operator">Operador</span></td>
                            <td>Hoy, 12:15</td>
                            <td><span class="status-badge status-alquilado">Activo</span></td>
                            <td><button class="action-btn" onclick="alert('Editar')">Editar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style>
                .user-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 4px;
                    font-size: 0.85rem;
                    font-weight: 600;
                }
                .user-admin { background: #dbeafe; color: #1e40af; }
                .user-operator { background: #d1fae5; color: #065f46; }
            </style>
        `;
    }

    cleanup() {}
}
