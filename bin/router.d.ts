export interface Route {
    path: string;
    segments: string[];
    context?: any;
}
export interface ReturnPath {
    successPath: string;
    cancelPath: string;
}
export declare class Router {
    route?: Route;
    private changeListener;
    private clickEvent;
    private clickListener;
    goto(url: string, context?: any): void;
    goHome(): void;
    goAppHome(context?: any): void;
    updateContext(context: any): void;
    replace(url: string, context?: any): void;
    connect(): void;
    private _which(e);
    private _isSameOrigin(href);
    private onLinkClick(e);
    private detachHandlers();
    private onChanged();
}
