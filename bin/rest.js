export function urlize(path, map, baseUrl = '') {
    let url = baseUrl || '';
    if (url && (url.lastIndexOf('/') === (url.length - 1))) {
        url = url.substring(0, url.length - 1);
    }
    url += path;
    let firstParam = true;
    for (const key in map) {
        if (key && map[key]) {
            if (firstParam) {
                firstParam = false;
                url += '?';
            }
            else {
                url += '&';
            }
            url += `${key}=${encodeURIComponent(map[key])}`;
        }
    }
    return url;
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
