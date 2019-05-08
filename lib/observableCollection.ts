import EventEmitter = require('eventemitter3');

export enum CollectionChangeAction {
	Add,
	Remove,
	Replace,
	Reset
}

export class CollectionChangeInfo {
	public target: ObservableCollection<any>;
	public newItems: Array<any>;
	public oldItems: Array<any>;
	public newIndex: number;
	public oldIndex: number;
	constructor(public action: CollectionChangeAction) {

	}
}

export class CollectionChangeEvent extends EventEmitter {
	listen(handler: (info: CollectionChangeInfo) => void, context = null): void {
		super.on('collectionChange', handler, context);
	}

	unlisten(handler: (info: CollectionChangeInfo) => void): void {
		super.off('collectionChange', handler);
	}

	notify(info: CollectionChangeInfo): boolean {
		return super.emit('collectionChange', info);
	}
}

export interface INotifyCollectionChanged {
	collectionChanged: CollectionChangeEvent;
}

export class ObservableCollection<T> implements INotifyCollectionChanged {
	private _source: Array<T>;
	public collectionChanged: CollectionChangeEvent;

	constructor() {
		this._source = new Array<T>();
		this.collectionChanged = new CollectionChangeEvent();
	}

	public get source(): Array<T> {
		return this._source;
	}

	public getItemAt(index: number): T {
		return this._source[index];
	}

	public addItem(item: T): void {
		this._source.push(item);
		let changeInfo: CollectionChangeInfo = new CollectionChangeInfo(CollectionChangeAction.Add);
		changeInfo.target = this;
		changeInfo.newIndex = this._source.length - 1;
		changeInfo.newItems = [item];
		this.collectionChanged.notify(changeInfo);
	}

	public addItemAt(item: T, index: number): void {
		this._source.splice(index, 0, item);
		let changeInfo: CollectionChangeInfo = new CollectionChangeInfo(CollectionChangeAction.Add);
		changeInfo.target = this;
		changeInfo.newIndex = index;
		changeInfo.newItems = [item];
		this.collectionChanged.notify(changeInfo);
	}

	public getItemIndex(item: T): number {
		let index = -1;
		let count = this._source.length;
		for (let i: number = 0; i < count; i++) {
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
		let deletedItems: Array<T> = this._source.splice(itemIndex, 1);
		let changeInfo: CollectionChangeInfo = new CollectionChangeInfo(CollectionChangeAction.Remove);
		changeInfo.target = this;
		changeInfo.oldIndex = itemIndex;
		changeInfo.oldItems = deletedItems;
		this.collectionChanged.notify(changeInfo);
	}
}