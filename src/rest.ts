export function urlize(path: string, map: { [key: string]: string }, baseUrl: string = '') {
  let url = baseUrl || ''
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
      } else {
        url += '&';
      }
      url += `${key}=${encodeURIComponent(map[key])}`;
    }
  }
  return url;
}

export async function get<T>(url: string, includeCredentials: boolean = false): Promise<T> {
  const init: RequestInit = { credentials: includeCredentials ? 'include' : 'same-origin' };
  const response = await fetch(url, init);
  if (!response.ok) {
    const message = await response.text();
    throw { status: response.status, message, response };
  }
  return (await response.json()) as T;
}

export async function post<T>(url: string, data: any, includeCredentials: boolean = false): Promise<T> {
  const init: RequestInit = { method: 'POST', credentials: includeCredentials ? 'include' : 'same-origin', body: JSON.stringify(data) };
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  init.headers = headers;
  const request = new Request(url, init);
  const response = await fetch(request);
  if (!response.ok) {
    const message = await response.text();
    throw { status: response.status, message, response };
  }
  return (await response.json()) as T;
}

export async function del(url: string, includeCredentials: boolean = false): Promise<Response> {
  const init: RequestInit = { method: 'DELETE', credentials: includeCredentials ? 'include' : 'same-origin' };
  const request = new Request(url, init);
  const response = await fetch(request);
  if (!response.ok) {
    const message = await response.text();
    throw { status: response.status, message, response };
  }
  return response;
}