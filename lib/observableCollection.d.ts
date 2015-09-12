import EventEmitter = require('eventemitter3');
export declare enum CollectionChangeAction {
    Add = 0,
    Remove = 1,
    Replace = 2,
    Reset = 3,
}
export declare class CollectionChangeInfo {
    action: CollectionChangeAction;
    target: ObservableCollection<any>;
    newItems: Array<any>;
    oldItems: Array<any>;
    newIndex: number;
    oldIndex: number;
    constructor(action: CollectionChangeAction);
}
export declare class CollectionChangeEvent extends EventEmitter {
    listen(handler: (info: CollectionChangeInfo) => void, context?: any): void;
    unlisten(handler: (info: CollectionChangeInfo) => void): void;
    notify(info: CollectionChangeInfo): boolean;
}
export interface INotifyCollectionChanged {
    collectionChanged: CollectionChangeEvent;
}
export default class ObservableCollection<T> implements INotifyCollectionChanged {
    private _source;
    collectionChanged: CollectionChangeEvent;
    constructor();
    source: Array<T>;
    getItemAt(index: number): T;
    addItem(item: T): void;
    addItemAt(item: T, index: number): void;
    getItemIndex(item: T): number;
    removeItem(item: T): void;
    numElements: number;
    removeItemAt(itemIndex: number): void;
}
