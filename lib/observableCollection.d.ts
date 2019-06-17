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
    readonly newItems: any[];
    readonly oldIndex: number;
    readonly oldItems: any[];
    constructor(action: CollectionChangeAction, target: ObservableCollection<any>, newIndex: number, newItems: any[], oldIndex: number, oldItems: any[]);
}
export declare class CollectionChangeEvent extends EventEmitter {
    listen(handler: (info: CollectionChangeInfo) => void, context?: any): void;
    unlisten(handler: (info: CollectionChangeInfo) => void): void;
    notify(info: CollectionChangeInfo): boolean;
}
export interface NotifyCollectionChanged {
    collectionChanged: CollectionChangeEvent;
}
export declare class ObservableCollection<T> implements NotifyCollectionChanged {
    private _source;
    collectionChanged: CollectionChangeEvent;
    constructor();
    readonly source: T[];
    getItemAt(index: number): T;
    addItem(item: T): void;
    addItemAt(item: T, index: number): void;
    getItemIndex(item: T): number;
    removeItem(item: T): void;
    readonly numElements: number;
    removeItemAt(itemIndex: number): void;
}
