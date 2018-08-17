export type MessageHandler = (name: string, data?: any) => void;

interface HandlerWrapper {
  once: boolean,
  handler: MessageHandler
}

export class MessageBus {
  private listeners: { [key: string]: HandlerWrapper[] } = {};

  subscribe(name: string, handler: MessageHandler, once: boolean = false) {
    const wrapper: HandlerWrapper = { once, handler };
    if (!this.listeners[name]) {
      this.listeners[name] = [wrapper];
    } else {
      this.listeners[name].push(wrapper);
    }
  }

  async dispatch(name: string, value?: any): Promise<void> {
    const keys = this.listeners[name];
    if (keys && keys.length) {
      const remaining: HandlerWrapper[] = [];
      for (let i = 0; i < keys.length; i++) {
        const w = keys[i];
        try {
          await w.handler(name, value);
        } catch (err) {
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