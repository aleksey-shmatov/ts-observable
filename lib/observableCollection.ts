/// <reference path="../node_modules/ts-events/ts-events.d.ts" /> 
import events = require("ts-events");

export enum CollectionChangeAction{
	Add,
	Remove,
	Replace,
	Reset
}

export class CollectionChangeInfo{
  public newItems:Array<any>;
  public oldItems:Array<any>;
  public newIndex:number;
  public oldIndex:number;
  constructor(public action:CollectionChangeAction){
    
  }
}

export class CollectionChangeEvent extends events.SyncEvent<CollectionChangeInfo>{

}

export interface INotifyCollectionChanged{
    collectionChanged:CollectionChangeEvent;
}

export default class ObservableCollection<T> implements INotifyCollectionChanged{
	private _source:Array<T>;
	public collectionChanged:CollectionChangeEvent;
	
	constructor(){
		this._source = new Array<T>();
		this.collectionChanged = new CollectionChangeEvent();
	}
	
	public getItemAt(index:number):T{
		return this._source[index];
	}
	
	public addItem(item:T):void{
		this._source.push(item);
		let changeInfo:CollectionChangeInfo = new CollectionChangeInfo(CollectionChangeAction.Add);
		changeInfo.newIndex = this._source.length - 1;
		changeInfo.newItems = [item];
		this.collectionChanged.post(changeInfo);
	}
	
	public getItemIndex(item:T):number{
		let index = -1; 
		let count = this._source.length;
		for(let i:number = 0; i < count;i++){
			var currentItem:T = this._source[i];
			if(currentItem === item){
				index = i;
				break;
			}
		}
		return index;
	}
	
	public removeItem(item:T):void{
		let index:number = this.getItemIndex(item);
		this.removeItemAt(index);
	}
	
	public get numElements():number{
		return this._source.length;
	}
	
	public removeItemAt(itemIndex:number):void{
		let deletedItems:Array<T> = this._source.splice(itemIndex, 1);
		let changeInfo:CollectionChangeInfo = new CollectionChangeInfo(CollectionChangeAction.Remove);
		changeInfo.oldIndex = itemIndex;
		changeInfo.oldItems = deletedItems;
		this.collectionChanged.post(changeInfo);
	}
}