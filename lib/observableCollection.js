"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("eventemitter3");
var CollectionChangeAction;
(function (CollectionChangeAction) {
    CollectionChangeAction[CollectionChangeAction["Add"] = 0] = "Add";
    CollectionChangeAction[CollectionChangeAction["Remove"] = 1] = "Remove";
    CollectionChangeAction[CollectionChangeAction["Replace"] = 2] = "Replace";
    CollectionChangeAction[CollectionChangeAction["Reset"] = 3] = "Reset";
})(CollectionChangeAction = exports.CollectionChangeAction || (exports.CollectionChangeAction = {}));
class CollectionChangeInfo {
    constructor(action, target, newIndex, newItems, oldIndex, oldItems) {
        this.action = action;
        this.target = target;
        this.newIndex = newIndex;
        this.newItems = newItems;
        this.oldIndex = oldIndex;
        this.oldItems = oldItems;
    }
}
exports.CollectionChangeInfo = CollectionChangeInfo;
class CollectionChangeEvent extends EventEmitter {
    listen(handler, context = null) {
        super.on('collectionChange', handler, context);
    }
    unlisten(handler) {
        super.off('collectionChange', handler);
    }
    notify(info) {
        return super.emit('collectionChange', info);
    }
}
exports.CollectionChangeEvent = CollectionChangeEvent;
class ObservableCollection {
    constructor() {
        this._source = new Array();
        this.collectionChanged = new CollectionChangeEvent();
    }
    get source() {
        return this._source;
    }
    getItemAt(index) {
        return this._source[index];
    }
    addItem(item) {
        this._source.push(item);
        let changeInfo = new CollectionChangeInfo(CollectionChangeAction.Add, this, this._source.length - 1, [item], -1, []);
        this.collectionChanged.notify(changeInfo);
    }
    addItemAt(item, index) {
        this._source.splice(index, 0, item);
        let changeInfo = new CollectionChangeInfo(CollectionChangeAction.Add, this, index, [item], -1, []);
        this.collectionChanged.notify(changeInfo);
    }
    getItemIndex(item) {
        let index = -1;
        let count = this._source.length;
        for (let i = 0; i < count; i++) {
            var currentItem = this._source[i];
            if (currentItem === item) {
                index = i;
                break;
            }
        }
        return index;
    }
    removeItem(item) {
        let index = this.getItemIndex(item);
        this.removeItemAt(index);
    }
    get numElements() {
        return this._source.length;
    }
    removeItemAt(itemIndex) {
        let deletedItems = this._source.splice(itemIndex, 1);
        let changeInfo = new CollectionChangeInfo(CollectionChangeAction.Remove, this, -1, [], itemIndex, deletedItems);
        this.collectionChanged.notify(changeInfo);
    }
}
exports.ObservableCollection = ObservableCollection;
