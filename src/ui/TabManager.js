/**
 * Tab Manager
 * Manages tab navigation and view rendering
 * Follows Single Responsibility Principle
 */

import { $, $$, addClass, removeClass } from '../utils/domUtils.js';

export class TabManager {
    constructor() {
        this.views = new Map();
        this.currentTab = null;
        this.tabContainer = $('#tabContent');
        this.tabButtons = $$('.tab');
        
        this.setupTabListeners();
    }

    /**
     * Register a view with a tab
     */
    registerView(tabId, view) {
        this.views.set(tabId, view);
    }

    /**
     * Setup tab click listeners
     */
    setupTabListeners() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                this.showTab(tabId);
                
                // Update URL without reload
                const url = new URL(window.location);
                url.searchParams.set('tab', tabId);
                window.history.pushState({ tab: tabId }, '', url);
            });
        });
    }

    /**
     * Show a specific tab
     */
    showTab(tabId) {
        // Update active tab button
        this.tabButtons.forEach(button => {
            if (button.getAttribute('data-tab') === tabId) {
                addClass(button, 'active');
            } else {
                removeClass(button, 'active');
            }
        });

        // Get view for this tab
        const view = this.views.get(tabId);
        
        if (view) {
            // Cleanup previous view
            if (this.currentTab && this.currentTab !== tabId) {
                const previousView = this.views.get(this.currentTab);
                if (previousView && previousView.cleanup) {
                    previousView.cleanup();
                }
            }

            // Render new view
            this.tabContainer.innerHTML = '';
            view.render(this.tabContainer);

            this.currentTab = tabId;
        } else {
            // Show placeholder for unimplemented views
            this.showPlaceholder(tabId);
        }
    }

    /**
     * Show placeholder for unimplemented views
     */
    showPlaceholder(tabId) {
        this.tabContainer.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
                <h2>Vista "${tabId}" en desarrollo</h2>
                <p style="color: var(--gray-700); margin-top: 1rem;">
                    Esta funcionalidad está siendo implementada.
                </p>
            </div>
        `;
    }

    /**
     * Get current active tab
     */
    getCurrentTab() {
        return this.currentTab;
    }

    /**
     * Navigate to tab programmatically
     */
    navigateTo(tabId) {
        this.showTab(tabId);
    }
}
