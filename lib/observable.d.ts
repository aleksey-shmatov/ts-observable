import EventEmitter from 'eventemitter3';
export declare class PropertyChangeInfo {
    readonly target: NotifyPropertyChanged;
    readonly propertyName: string;
    readonly oldValue: any;
    readonly newValue: any;
    constructor(target: NotifyPropertyChanged, propertyName: string, oldValue: any, newValue: any);
}
export declare class PropertyChangeEvent extends EventEmitter {
    listen(handler: (info: PropertyChangeInfo) => void, context?: any): void;
    unlisten(handler: (info: PropertyChangeInfo) => void): void;
    notify(info: PropertyChangeInfo): boolean;
}
export interface NotifyPropertyChanged {
    propertyChanged: PropertyChangeEvent;
}
export declare function observable(target: any, key: string): void;
