export function createUrl(path, params, baseUrl = '') {
    const url = new URL(`/p/${path}`, baseUrl);
    if (params) {
        let q = '?';
        let first = true;
        for (const name in params) {
            q = `${q}${first ? '' : '&'}${name}=${encodeURIComponent(params[name])}`;
            first = false;
        }
        url.search = q;
    }
    return url.toString();
}
export async function get(url, includeCredentials = false) {
    const init = { credentials: includeCredentials ? 'include' : 'same-origin' };
    const response = await fetch(url, init);
    if (!response.ok) {
        const message = await response.text();
        throw { status: response.status, message, response };
    }
    return (await response.json());
}
export async function post(url, data, includeCredentials = false) {
    const init = { method: 'POST', credentials: includeCredentials ? 'include' : 'same-origin', body: JSON.stringify(data) };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    init.headers = headers;
    const request = new Request(url, init);
    const response = await fetch(request);
    if (!response.ok) {
        const message = await response.text();
        throw { status: response.status, message, response };
    }
    return (await response.json());
}
export async function del(url, includeCredentials = false) {
    const init = { method: 'DELETE', credentials: includeCredentials ? 'include' : 'same-origin' };
    const request = new Request(url, init);
    const response = await fetch(request);
    if (!response.ok) {
        const message = await response.text();
        throw { status: response.status, message, response };
    }
    return response;
}
