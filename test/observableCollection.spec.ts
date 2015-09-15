import {default as ObservableCollection, INotifyCollectionChanged, CollectionChangeInfo,
	 CollectionChangeEvent, CollectionChangeAction} from '../lib/observableCollection';
import { assert } from 'chai';


describe('ObservableCollection',()=>{
	it('should add element', ()=>{
		let collection:ObservableCollection<string> = new ObservableCollection<string>();
		assert(collection.numElements == 0, "initial number of elements is 0");
		let collectionChangeInfo:CollectionChangeInfo = null;
		collection.collectionChanged.on('collectionChange', (info:CollectionChangeInfo)=>{
			collectionChangeInfo = info;
		});
		collection.addItem("Item");
		assert(collection.numElements == 1, "should have 1 elements");
		assert(collection.getItemAt(0) == "Item", "first element should be Item");
		assert.isNotNull(collectionChangeInfo, "should trigger collection change event");
		assert.equal(collectionChangeInfo.action, CollectionChangeAction.Add, "collection change type should be Add");
		assert.equal(collectionChangeInfo.newIndex, 0, "Collection change new index should be 0");
		assert.deepEqual(collectionChangeInfo.newItems, ["Item"], "Collection change new items should be [Item]");
	});
	it('should remove element',()=>{
		let collection:ObservableCollection<string> = new ObservableCollection<string>();
		collection.addItem("Item 1");
		collection.addItem("Item 2");
		let collectionChangeInfo:CollectionChangeInfo = null;
		collection.collectionChanged.on('collectionChange', (info:CollectionChangeInfo)=>{
			collectionChangeInfo = info;
		});
		collection.removeItem("Item 1");
		assert(collection.numElements == 1, "should have 1 elements");
		assert(collection.getItemAt(0) == "Item 2", "first element should be Item 2");
		assert.isNotNull(collectionChangeInfo, "should trigger collection change event");
		assert.equal(collectionChangeInfo.action, CollectionChangeAction.Remove, "collection change type should be Remove");
		assert.equal(collectionChangeInfo.oldIndex, 0, "Collection change old index should be 1");
		assert.deepEqual(collectionChangeInfo.oldItems, ["Item 1"], "Collection change old items should be [Item 1]");
	});
});

