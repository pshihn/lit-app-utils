export const store = {
  get(key: string, json: boolean = false) {
    if (!key) return null;
    const stored = localStorage.getItem(key);
    if (stored && json) {
      return JSON.parse(stored);
    }
    return stored;
  },
  set(key: string, value: any) {
    if (key && value) {
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  },
  delete(key: string) {
    if (key) localStorage.removeItem(key);
  }
};