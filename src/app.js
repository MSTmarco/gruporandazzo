/**
 * Main Application Entry Point - COMPLETE VERSION
 * Initializes ALL views from original code
 */

import { VehicleService } from './services/VehicleService.js';
import { FilterService } from './services/FilterService.js';
import { TabManager } from './ui/TabManager.js';
import { DashboardView } from './ui/views/DashboardView.js';
import { FleetView } from './ui/views/FleetView.js';
import { SheetView } from './ui/views/SheetView.js';
import { AlertsView } from './ui/views/AlertsView.js';
import { CalendarView } from './ui/views/CalendarView.js';
import { ReportsView } from './ui/views/ReportsView.js';
import { UsersView } from './ui/views/UsersView.js';
import { LogsView } from './ui/views/LogsView.js';
import { ready } from './utils/domUtils.js';

class Application {
    constructor() {
        this.services = {
            vehicle: new VehicleService(),
            filter: new FilterService()
        };

        this.views = {};
        this.tabManager = null;
        this.currentUser = null;
    }

    init() {
        console.log('🚀 Initializing Hertz Fleet Manager - COMPLETE VERSION');

        this.loadUserSession();
        this.tabManager = new TabManager();
        this.initializeViews();
        this.setupEventListeners();
        this.tabManager.showTab('dashboard');

        console.log('✅ Application initialized with ALL 8 views!');
    }

    loadUserSession() {
        this.currentUser = {
            name: 'Admin Usuario',
            email: 'admin@gruporandazo.com',
            role: 'Administrador'
        };

        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = this.currentUser.name;
        }
    }

    initializeViews() {
        // Create ALL view instances
        this.views.dashboard = new DashboardView(this.services);
        this.views.sheet = new SheetView(this.services);
        this.views.fleet = new FleetView(this.services);
        this.views.alerts = new AlertsView(this.services);
        this.views.calendar = new CalendarView(this.services);
        this.views.reports = new ReportsView(this.services);
        this.views.users = new UsersView(this.services);
        this.views.logs = new LogsView(this.services);

        // Register ALL views with tab manager
        this.tabManager.registerView('dashboard', this.views.dashboard);
        this.tabManager.registerView('vista-planilla', this.views.sheet);
        this.tabManager.registerView('flota', this.views.fleet);
        this.tabManager.registerView('alertas', this.views.alerts);
        this.tabManager.registerView('calendario', this.views.calendar);
        this.tabManager.registerView('reportes', this.views.reports);
        this.tabManager.registerView('usuarios', this.views.users);
        this.tabManager.registerView('logs', this.views.logs);

        console.log('📋 Registered views: Dashboard, Vista Planilla, Flota, Alertas, Calendario, Reportes, Usuarios, Logs');
    }

    setupEventListeners() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.tab) {
                this.tabManager.showTab(e.state.tab);
            }
        });

        window.addEventListener('error', (e) => {
            console.error('Error:', e.error);
            this.handleError(e.error);
        });
    }

    handleError(error) {
        console.error('Application error:', error);
        const message = error.message || 'Ha ocurrido un error';
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 10000;
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    logout() {
        if (confirm('¿Desea cerrar sesión?')) {
            this.showNotification('Sesión cerrada');
            setTimeout(() => window.location.reload(), 1000);
        }
    }
}

ready(() => {
    window.app = new Application();
    window.app.init();
});

export default Application;
