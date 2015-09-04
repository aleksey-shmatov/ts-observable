/// <reference path="../node_modules/ts-events/ts-events.d.ts" />
import events = require("ts-events");
export declare enum CollectionChangeAction {
    Add = 0,
    Remove = 1,
    Replace = 2,
    Reset = 3,
}
export declare class CollectionChangeInfo {
    action: CollectionChangeAction;
    newItems: Array<any>;
    oldItems: Array<any>;
    newIndex: number;
    oldIndex: number;
    constructor(action: CollectionChangeAction);
}
export declare class CollectionChangeEvent extends events.SyncEvent<CollectionChangeInfo> {
}
export interface INotifyCollectionChanged {
    collectionChanged: CollectionChangeEvent;
}
export default class ObservableCollection<T> implements INotifyCollectionChanged {
    private _source;
    collectionChanged: CollectionChangeEvent;
    constructor();
    getItemAt(index: number): T;
    addItem(item: T): void;
    addItemAt(item: T, index: number): void;
    getItemIndex(item: T): number;
    removeItem(item: T): void;
    numElements: number;
    removeItemAt(itemIndex: number): void;
}
