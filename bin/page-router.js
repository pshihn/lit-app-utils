import { LitElement } from '@polymer/lit-element';
import { html } from 'lit-html';
import { bus } from './message-bus';
export class PageRouter extends LitElement {
    constructor() {
        super(...arguments);
        this.currentPage = null;
    }
    _render() {
        return html `
    <style>
      :host {
        display: block;
      }
    
      .hidden {
        display: none !important;
      }
    
      ::slotted(.hidden) {
        display: none !important;
      }
    </style>
    <slot id="slot" on-slotchange="${() => this.slotChange()}"></slot>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        bus.subscribe('route', (_, route) => {
            if (route) {
                this.onRoute(route);
            }
        });
    }
    slotChange() {
        if (this.pendingSlotResolve) {
            this.pendingSlotResolve(this.slotElements);
            delete this.pendingSlotResolve;
        }
    }
    get pageSlot() {
        if (!this._slot) {
            this._slot = this.shadowRoot.querySelector('slot');
        }
        return this._slot;
    }
    get slotElements() {
        const list = [];
        const assigned = this.pageSlot.assignedNodes();
        if (assigned && assigned.length) {
            for (let i = 0; i < assigned.length; i++) {
                const n = assigned[i];
                if (n.nodeType === Node.ELEMENT_NODE) {
                    list.push(n);
                }
            }
        }
        return list;
    }
    async getPages() {
        return new Promise((resolve) => {
            const list = this.slotElements;
            if (list.length) {
                resolve(list);
                return;
            }
            this.pendingSlotResolve = resolve;
            setTimeout(() => {
                this.slotChange();
            }, 2000);
        });
    }
    findPage(pages, name) {
        for (const page of pages) {
            if (page.classList.contains(name)) {
                return page;
            }
        }
        return null;
    }
    async onRoute(route) {
        const pages = await this.getPages();
        const path = route.segments[0] || 'home';
        let newPage = this.findPage(pages, path);
        if (!newPage) {
            newPage = this.findPage(pages, 'home');
            if (!newPage) {
                newPage = pages[0];
            }
        }
        const samePage = newPage === this.currentPage;
        if (this.currentPage && (!samePage) && this.currentPage.onDeactivate) {
            try {
                this.currentPage.onDeactivate();
            }
            catch (err) {
                console.error(err);
            }
        }
        for (let i = 0; i < pages.length; i++) {
            const p = pages[i];
            if (p === newPage) {
                p.classList.remove('hidden');
            }
            else {
                p.classList.add('hidden');
            }
        }
        this.currentPage = newPage;
        if (this.pageListener) {
            await this.pageListener.onPageChange(this.currentPage);
        }
        if (this.currentPage.onActivate) {
            try {
                this.currentPage.onActivate();
            }
            catch (err) {
                console.error(err);
            }
        }
    }
}
customElements.define('page-router', PageRouter);
