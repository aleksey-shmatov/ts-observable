import EventEmitter = require('eventemitter3');

export enum CollectionChangeAction {
    Add,
    Remove,
    Replace,
    Reset
}

export class CollectionChangeInfo {
    public readonly action: CollectionChangeAction;
    public readonly target: ObservableCollection<any>;
    public readonly newIndex: number;
    public readonly newItems: any[];
    public readonly oldIndex: number;
    public readonly oldItems: any[];
    
    public constructor(action: CollectionChangeAction,
        target: ObservableCollection<any>,
        newIndex: number,
        newItems: any[],
        oldIndex: number,
        oldItems: any[]
    ) {
        this.action = action;
        this.target = target;
        this.newIndex = newIndex;
        this.newItems = newItems;
        this.oldIndex = oldIndex;
        this.oldItems = oldItems;
    }
}

export class CollectionChangeEvent extends EventEmitter {
    public listen(handler: (info: CollectionChangeInfo) => void, context: any = null): void {
        super.on('collectionChange', handler, context);
    }

    public unlisten(handler: (info: CollectionChangeInfo) => void): void {
        super.off('collectionChange', handler);
    }

    public notify(info: CollectionChangeInfo): boolean {
        return super.emit('collectionChange', info);
    }
}

export interface NotifyCollectionChanged {
    collectionChanged: CollectionChangeEvent;
}

export class ObservableCollection<T> implements NotifyCollectionChanged {
    private _source: T[];
    public collectionChanged: CollectionChangeEvent;

    public constructor() {
        this._source = new Array<T>();
        this.collectionChanged = new CollectionChangeEvent();
    }

    public get source(): T[] {
        return this._source;
    }

    public getItemAt(index: number): T {
        return this._source[index];
    }

    public addItem(item: T): void {
        this._source.push(item);
        let changeInfo: CollectionChangeInfo = new CollectionChangeInfo(CollectionChangeAction.Add,
            this,
            this._source.length - 1,
            [item],
            -1,
            []
        );
        this.collectionChanged.notify(changeInfo);
    }

    public addItemAt(item: T, index: number): void {
        this._source.splice(index, 0, item);
        let changeInfo: CollectionChangeInfo = new CollectionChangeInfo(CollectionChangeAction.Add,
            this,
            index,
            [item],
            -1,
            []
        );
        this.collectionChanged.notify(changeInfo);
    }

    public getItemIndex(item: T): number {
        let index = -1;
        let count = this._source.length;
        for (let i = 0; i < count; i++) {
            var currentItem: T = this._source[i];
            if (currentItem === item) {
                index = i;
                break;
            }
        }
        return index;
    }

    public removeItem(item: T): void {
        let index: number = this.getItemIndex(item);
        this.removeItemAt(index);
    }

    public get numElements(): number {
        return this._source.length;
    }

    public removeItemAt(itemIndex: number): void {
        let deletedItems: T[] = this._source.splice(itemIndex, 1);
        let changeInfo: CollectionChangeInfo = new CollectionChangeInfo(CollectionChangeAction.Remove,
            this,
            -1,
            [],
            itemIndex,
            deletedItems
        );
        this.collectionChanged.notify(changeInfo);
    }
}