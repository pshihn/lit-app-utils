export declare type MessageHandler = (name: string, data?: any) => void;
export declare class MessageBus {
    private listeners;
    subscribe(name: string, handler: MessageHandler, once?: boolean): void;
    dispatch(name: string, value?: any): Promise<void>;
}
export declare const bus: MessageBus;
