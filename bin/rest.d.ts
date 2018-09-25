export declare type Params = {
    [name: string]: string;
};
export declare function createUrl(path: string, params: Params, baseUrl?: string): string;
export declare function get<T>(url: string, includeCredentials?: boolean): Promise<T>;
export declare function post<T>(url: string, data: any, includeCredentials?: boolean): Promise<T>;
export declare function del(url: string, includeCredentials?: boolean): Promise<Response>;
