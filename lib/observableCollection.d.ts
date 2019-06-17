import EventEmitter = require('eventemitter3');
export declare enum CollectionChangeAction {
    Add = 0,
    Remove = 1,
    Replace = 2,
    Reset = 3
}
export declare class CollectionChangeInfo {
    readonly action: CollectionChangeAction;
    readonly target: ObservableCollection<any>;
    readonly newIndex: number;
    readonly newItems: Array<any>;
    readonly oldIndex: number;
    readonly oldItems: Array<any>;
    constructor(action: CollectionChangeAction, target: ObservableCollection<any>, newIndex: number, newItems: Array<any>, oldIndex: number, oldItems: Array<any>);
}
export declare class CollectionChangeEvent extends EventEmitter {
    listen(handler: (info: CollectionChangeInfo) => void, context?: null): void;
    unlisten(handler: (info: CollectionChangeInfo) => void): void;
    notify(info: CollectionChangeInfo): boolean;
}
export interface INotifyCollectionChanged {
    collectionChanged: CollectionChangeEvent;
}
export declare class ObservableCollection<T> implements INotifyCollectionChanged {
    private _source;
    collectionChanged: CollectionChangeEvent;
    constructor();
    readonly source: Array<T>;
    getItemAt(index: number): T;
    addItem(item: T): void;
    addItemAt(item: T, index: number): void;
    getItemIndex(item: T): number;
    removeItem(item: T): void;
    readonly numElements: number;
    removeItemAt(itemIndex: number): void;
}
