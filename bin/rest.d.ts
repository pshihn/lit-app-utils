export declare function urlize(path: string, map: {
    [key: string]: string;
}, baseUrl?: string): string;
export declare function get<T>(url: string): Promise<T>;
export declare function post<T>(url: string, data: any): Promise<T>;
export declare function del(url: string): Promise<Response>;
