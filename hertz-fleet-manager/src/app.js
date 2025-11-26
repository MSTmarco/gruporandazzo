/**
 * Main Application Entry Point
 * Initializes the application and manages global state
 */

import { VehicleService } from './services/VehicleService.js';
import { FilterService } from './services/FilterService.js';
import { TabManager } from './ui/TabManager.js';
import { DashboardView } from './ui/views/DashboardView.js';
import { FleetView } from './ui/views/FleetView.js';
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

    /**
     * Initialize the application
     */
    init() {
        console.log('Initializing Hertz Fleet Manager...');

        // Load user session
        this.loadUserSession();

        // Initialize tab manager
        this.tabManager = new TabManager();

        // Initialize views
        this.initializeViews();

        // Setup event listeners
        this.setupEventListeners();

        // Show default view
        this.tabManager.showTab('dashboard');

        console.log('Application initialized successfully');
    }

    /**
     * Load user session from storage
     */
    loadUserSession() {
        // In production, load from localStorage or API
        this.currentUser = {
            name: 'Admin Usuario',
            email: 'admin@gruporandazo.com',
            role: 'Administrador'
        };

        // Update UI
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = this.currentUser.name;
        }
    }

    /**
     * Initialize all views
     */
    initializeViews() {
        this.views.dashboard = new DashboardView(this.services);
        this.views.fleet = new FleetView(this.services);
        // Add more views as needed

        // Register views with tab manager
        this.tabManager.registerView('dashboard', this.views.dashboard);
        this.tabManager.registerView('flota', this.views.fleet);
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.tab) {
                this.tabManager.showTab(e.state.tab);
            }
        });

        // Handle errors
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.handleError(e.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.handleError(e.reason);
        });
    }

    /**
     * Handle application errors
     */
    handleError(error) {
        // In production, send to error tracking service
        console.error('Application error:', error);
        
        // Show user-friendly error message
        const message = error.message || 'Ha ocurrido un error inesperado';
        this.showNotification(message, 'error');
    }

    /**
     * Show notification to user
     */
    showNotification(message, type = 'info') {
        // Simple notification implementation
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
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
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Logout user
     */
    logout() {
        if (confirm('¿Desea cerrar sesión?')) {
            // Clear session
            this.currentUser = null;
            
            // In production, clear localStorage and redirect to login
            console.log('User logged out');
            this.showNotification('Sesión cerrada exitosamente');
            
            // Reload page after short delay
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    /**
     * Get service instance
     */
    getService(name) {
        return this.services[name];
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize application when DOM is ready
ready(() => {
    window.app = new Application();
    window.app.init();
});

// Export for global access if needed
export default Application;
