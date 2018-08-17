import { LitElement } from '@polymer/lit-element';
import { TemplateResult, html } from 'lit-html';
import { bus } from './message-bus';
import { Route } from './router';

export interface ActivePageListener {
  onPageChange(page: PageElement): Promise<void>;
}

export interface PageElement extends HTMLElement {
  onActivate(): void;
  onDeactivate(): void;
}

export class PageRouter extends LitElement {
  pageListener?: ActivePageListener;
  private currentPage: PageElement | null = null;
  private pendingSlotResolve?: (value?: HTMLElement[] | PromiseLike<HTMLElement[]> | undefined) => void;
  private _slot?: HTMLSlotElement;

  _render(): TemplateResult {
    return html`
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
    bus.subscribe('route', (_, route?: Route) => {
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

  get pageSlot(): HTMLSlotElement {
    if (!this._slot) {
      this._slot = this.shadowRoot!.querySelector('slot') as HTMLSlotElement;
    }
    return this._slot;
  }

  private get slotElements(): HTMLElement[] {
    const list: HTMLElement[] = [];
    const assigned = this.pageSlot.assignedNodes();
    if (assigned && assigned.length) {
      for (let i = 0; i < assigned.length; i++) {
        const n = assigned[i];
        if (n.nodeType === Node.ELEMENT_NODE) {
          list.push(n as HTMLElement);
        }
      }
    }
    return list;
  }

  async getPages(): Promise<HTMLElement[]> {
    return new Promise<HTMLElement[]>((resolve) => {
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

  private findPage(pages: HTMLElement[], name: string): PageElement | null {
    for (const page of pages) {
      if (page.classList.contains(name)) {
        return page as PageElement;
      }
    }
    return null;
  }

  async onRoute(route: Route) {
    const pages = await this.getPages();
    const path = route.segments[0] || 'home';
    let newPage = this.findPage(pages, path);
    if (!newPage) {
      newPage = this.findPage(pages, 'home');
      if (!newPage) {
        newPage = pages[0] as PageElement;
      }
    }
    const samePage = newPage === this.currentPage;
    if (this.currentPage && (!samePage) && this.currentPage.onDeactivate) {
      try {
        this.currentPage.onDeactivate();
      } catch (err) { console.error(err); }
    }
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      if (p === newPage as any) {
        p.classList.remove('hidden');
      } else {
        p.classList.add('hidden');
      }
    }
    this.currentPage = newPage as PageElement;
    if (this.pageListener) {
      await this.pageListener.onPageChange(this.currentPage);
    }
    if (this.currentPage.onActivate) {
      try {
        this.currentPage.onActivate();
      } catch (err) { console.error(err); }
    }
  }
}
customElements.define('page-router', PageRouter);