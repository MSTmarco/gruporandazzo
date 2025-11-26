/**
 * Modal Component
 * Reusable modal dialog component
 */

import { createElement, addClass, removeClass } from '../../utils/domUtils.js';

export class Modal {
    constructor(config = {}) {
        this.config = {
            title: config.title || 'Modal',
            content: config.content || '',
            size: config.size || 'medium',
            onClose: config.onClose || (() => {}),
            ...config
        };

        this.element = null;
        this.isOpen = false;
    }

    render() {
        this.element = createElement('div', { className: 'modal' },
            createElement('div', { className: 'modal-content' },
                this.renderHeader(),
                this.renderBody(),
                this.renderFooter()
            )
        );

        document.body.appendChild(this.element);
        return this.element;
    }

    renderHeader() {
        const header = createElement('div', { className: 'modal-header' },
            createElement('h2', {}, this.config.title),
            createElement('button', {
                className: 'close-btn',
                onclick: () => this.close()
            }, '×')
        );
        return header;
    }

    renderBody() {
        return createElement('div', { className: 'modal-body' }, this.config.content);
    }

    renderFooter() {
        if (!this.config.footer) return '';
        return createElement('div', { className: 'modal-footer' }, this.config.footer);
    }

    open() {
        if (!this.element) this.render();
        addClass(this.element, 'active');
        this.isOpen = true;
    }

    close() {
        removeClass(this.element, 'active');
        this.isOpen = false;
        if (this.config.onClose) {
            this.config.onClose();
        }
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}
