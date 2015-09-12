import EventEmitter = require('eventemitter3');
export declare class PropertyChangeInfo {
    target: INotifyPropertyChanged;
    propertyName: any;
    oldValue: any;
    newValue: any;
    constructor(target: INotifyPropertyChanged, propertyName: any, oldValue: any, newValue: any);
}
export declare class PropertyChangeEvent extends EventEmitter {
    listen(handler: (info: PropertyChangeInfo) => void, context?: any): void;
    unlisten(handler: (info: PropertyChangeInfo) => void): void;
    notify(info: PropertyChangeInfo): boolean;
}
export interface INotifyPropertyChanged {
    propertyChanged: PropertyChangeEvent;
}
export declare class ObservableObject implements INotifyPropertyChanged {
    propertyChanged: PropertyChangeEvent;
    constructor();
}
export declare function observable(target: any, key: string): void;
