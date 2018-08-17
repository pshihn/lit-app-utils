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
export async function get(url) {
    const response = await fetch(url, { credentials: 'include' });
    if (!response.ok) {
        const message = await response.text();
        throw { status: response.status, message, response };
    }
    return (await response.json());
}
export async function post(url, data) {
    const request = new Request(url, { method: 'POST', credentials: 'include', body: JSON.stringify(data) });
    const response = await fetch(request);
    if (!response.ok) {
        const message = await response.text();
        throw { status: response.status, message, response };
    }
    return (await response.json());
}
export async function del(url) {
    const request = new Request(url, { method: 'DELETE', credentials: 'include' });
    const response = await fetch(request);
    if (!response.ok) {
        const message = await response.text();
        throw { status: response.status, message, response };
    }
    return response;
}
