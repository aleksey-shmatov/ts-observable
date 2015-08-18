/// <reference path="../typings/tsd.d.ts" /> 
var observableCollection_1 = require('../lib/observableCollection');
var chai_1 = require('chai');
describe('ObservableCollection', function () {
    it('should add element', function () {
        var collection = new observableCollection_1.default();
        chai_1.assert(collection.numElements == 0, "initial number of elements is 0");
        var collectionChangeInfo = null;
        collection.collectionChanged.attach(function (info) {
            collectionChangeInfo = info;
        });
        collection.addItem("Item");
        chai_1.assert(collection.numElements == 1, "should have 1 elements");
        chai_1.assert(collection.getItemAt(0) == "Item", "first element should be Item");
        chai_1.assert.isNotNull(collectionChangeInfo, "should trigger collection change event");
        chai_1.assert.equal(collectionChangeInfo.action, observableCollection_1.CollectionChangeAction.Add, "collection change type should be Add");
        chai_1.assert.equal(collectionChangeInfo.newIndex, 0, "Collection change new index should be 0");
        chai_1.assert.deepEqual(collectionChangeInfo.newItems, ["Item"], "Collection change new items should be [Item]");
    });
    it('should remove element', function () {
        var collection = new observableCollection_1.default();
        collection.addItem("Item 1");
        collection.addItem("Item 2");
        var collectionChangeInfo = null;
        collection.collectionChanged.attach(function (info) {
            collectionChangeInfo = info;
        });
        collection.removeItem("Item 1");
        chai_1.assert(collection.numElements == 1, "should have 1 elements");
        chai_1.assert(collection.getItemAt(0) == "Item 2", "first element should be Item 2");
        chai_1.assert.isNotNull(collectionChangeInfo, "should trigger collection change event");
        chai_1.assert.equal(collectionChangeInfo.action, observableCollection_1.CollectionChangeAction.Remove, "collection change type should be Remove");
        chai_1.assert.equal(collectionChangeInfo.oldIndex, 0, "Collection change old index should be 1");
        chai_1.assert.deepEqual(collectionChangeInfo.oldItems, ["Item 1"], "Collection change old items should be [Item 1]");
    });
});
//# sourceMappingURL=observableCollection.spec.js.map