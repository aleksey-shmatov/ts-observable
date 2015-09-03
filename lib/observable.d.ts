/// <reference path="../node_modules/ts-events/ts-events.d.ts" />
import events = require("ts-events");
export declare class PropertyChangeInfo {
    target: INotifyPropertyChanged;
    propertyName: any;
    oldValue: any;
    newValue: any;
    constructor(target: INotifyPropertyChanged, propertyName: any, oldValue: any, newValue: any);
}
export declare class PropertyChangeEvent extends events.SyncEvent<PropertyChangeInfo> {
}
export interface INotifyPropertyChanged {
    propertyChanged: PropertyChangeEvent;
}
export default function observable(target: any, key: string): void;
