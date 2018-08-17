export const store = {
    get(key, json = false) {
        if (!key)
            return null;
        const stored = localStorage.getItem(key);
        if (stored && json) {
            return JSON.parse(stored);
        }
        return stored;
    },
    set(key, value) {
        if (key && value) {
            if (typeof value === 'string') {
                localStorage.setItem(key, value);
            }
            else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        }
    },
    delete(key) {
        if (key)
            localStorage.removeItem(key);
    }
};
