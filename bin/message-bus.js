export class MessageBus {
    constructor() {
        this.listeners = {};
    }
    subscribe(name, handler, once = false) {
        const wrapper = { once, handler };
        if (!this.listeners[name]) {
            this.listeners[name] = [wrapper];
        }
        else {
            this.listeners[name].push(wrapper);
        }
    }
    async dispatch(name, value) {
        const keys = this.listeners[name];
        if (keys && keys.length) {
            const remaining = [];
            for (let i = 0; i < keys.length; i++) {
                const w = keys[i];
                try {
                    await w.handler(name, value);
                }
                catch (err) {
                    console.error(err);
                }
                if (!w.once) {
                    remaining.push(w);
                }
            }
            this.listeners[name] = remaining;
        }
    }
}
export const bus = new MessageBus();
