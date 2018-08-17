import { LitElement } from '@polymer/lit-element';
import { TemplateResult } from 'lit-html';
import { Route } from './router';
export interface ActivePageListener {
    onPageChange(page: PageElement): Promise<void>;
}
export declare abstract class PageElement extends HTMLElement {
    onActivate(): void;
    onDeactivate(): void;
}
export declare class PageRouter extends LitElement {
    pageListener?: ActivePageListener;
    private currentPage;
    private pendingSlotResolve?;
    private _slot?;
    _render(): TemplateResult;
    connectedCallback(): void;
    slotChange(): void;
    readonly pageSlot: HTMLSlotElement;
    private readonly slotElements;
    getPages(): Promise<HTMLElement[]>;
    private findPage;
    onRoute(route: Route): Promise<void>;
}