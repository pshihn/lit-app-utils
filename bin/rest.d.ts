export declare function urlize(path: string, map: {
    [key: string]: string;
}, baseUrl?: string): string;
export declare function get<T>(url: string, includeCredentials?: boolean): Promise<T>;
export declare function post<T>(url: string, data: any, includeCredentials?: boolean): Promise<T>;
export declare function del(url: string, includeCredentials?: boolean): Promise<Response>;
