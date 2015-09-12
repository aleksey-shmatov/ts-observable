var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventEmitter = require('eventemitter3');
(function (CollectionChangeAction) {
    CollectionChangeAction[CollectionChangeAction["Add"] = 0] = "Add";
    CollectionChangeAction[CollectionChangeAction["Remove"] = 1] = "Remove";
    CollectionChangeAction[CollectionChangeAction["Replace"] = 2] = "Replace";
    CollectionChangeAction[CollectionChangeAction["Reset"] = 3] = "Reset";
})(exports.CollectionChangeAction || (exports.CollectionChangeAction = {}));
var CollectionChangeAction = exports.CollectionChangeAction;
var CollectionChangeInfo = (function () {
    function CollectionChangeInfo(action) {
        this.action = action;
    }
    return CollectionChangeInfo;
})();
exports.CollectionChangeInfo = CollectionChangeInfo;
var CollectionChangeEvent = (function (_super) {
    __extends(CollectionChangeEvent, _super);
    function CollectionChangeEvent() {
        _super.apply(this, arguments);
    }
    CollectionChangeEvent.prototype.listen = function (handler, context) {
        if (context === void 0) { context = null; }
        _super.prototype.on.call(this, 'collectionChange', handler, context);
    };
    CollectionChangeEvent.prototype.unlisten = function (handler) {
        _super.prototype.off.call(this, 'collectionChange', handler);
    };
    CollectionChangeEvent.prototype.notify = function (info) {
        return _super.prototype.emit.call(this, 'collectionChange', info);
    };
    return CollectionChangeEvent;
})(EventEmitter);
exports.CollectionChangeEvent = CollectionChangeEvent;
var ObservableCollection = (function () {
    function ObservableCollection() {
        this._source = new Array();
        this.collectionChanged = new CollectionChangeEvent();
    }
    Object.defineProperty(ObservableCollection.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    ObservableCollection.prototype.getItemAt = function (index) {
        return this._source[index];
    };
    ObservableCollection.prototype.addItem = function (item) {
        this._source.push(item);
        var changeInfo = new CollectionChangeInfo(CollectionChangeAction.Add);
        changeInfo.target = this;
        changeInfo.newIndex = this._source.length - 1;
        changeInfo.newItems = [item];
        this.collectionChanged.notify(changeInfo);
    };
    ObservableCollection.prototype.addItemAt = function (item, index) {
        this._source.splice(index, 0, item);
        var changeInfo = new CollectionChangeInfo(CollectionChangeAction.Add);
        changeInfo.target = this;
        changeInfo.newIndex = index;
        changeInfo.newItems = [item];
        this.collectionChanged.notify(changeInfo);
    };
    ObservableCollection.prototype.getItemIndex = function (item) {
        var index = -1;
        var count = this._source.length;
        for (var i = 0; i < count; i++) {
            var currentItem = this._source[i];
            if (currentItem === item) {
                index = i;
                break;
            }
        }
        return index;
    };
    ObservableCollection.prototype.removeItem = function (item) {
        var index = this.getItemIndex(item);
        this.removeItemAt(index);
    };
    Object.defineProperty(ObservableCollection.prototype, "numElements", {
        get: function () {
            return this._source.length;
        },
        enumerable: true,
        configurable: true
    });
    ObservableCollection.prototype.removeItemAt = function (itemIndex) {
        var deletedItems = this._source.splice(itemIndex, 1);
        var changeInfo = new CollectionChangeInfo(CollectionChangeAction.Remove);
        changeInfo.target = this;
        changeInfo.oldIndex = itemIndex;
        changeInfo.oldItems = deletedItems;
        this.collectionChanged.notify(changeInfo);
    };
    return ObservableCollection;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObservableCollection;
//# sourceMappingURL=observableCollection.js.map