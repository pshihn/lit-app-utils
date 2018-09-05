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
    const init = {};
    if (includeCredentials) {
        init.credentials = 'include';
    }
    const response = await fetch(url, init);
    if (!response.ok) {
        const message = await response.text();
        throw { status: response.status, message, response };
    }
    return (await response.json());
}
export async function post(url, data, includeCredentials = false) {
    const init = { method: 'POST', body: JSON.stringify(data) };
    if (includeCredentials) {
        init.credentials = 'include';
    }
    const request = new Request(url, init);
    const response = await fetch(request);
    if (!response.ok) {
        const message = await response.text();
        throw { status: response.status, message, response };
    }
    return (await response.json());
}
export async function del(url, includeCredentials = false) {
    const init = { method: 'DELETE' };
    if (includeCredentials) {
        init.credentials = 'include';
    }
    const request = new Request(url, init);
    const response = await fetch(request);
    if (!response.ok) {
        const message = await response.text();
        throw { status: response.status, message, response };
    }
    return response;
}
