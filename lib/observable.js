var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventEmitter = require('eventemitter3');
var PropertyChangeInfo = (function () {
    function PropertyChangeInfo(target, propertyName, oldValue, newValue) {
        this.target = target;
        this.propertyName = propertyName;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
    return PropertyChangeInfo;
})();
exports.PropertyChangeInfo = PropertyChangeInfo;
var PropertyChangeEvent = (function (_super) {
    __extends(PropertyChangeEvent, _super);
    function PropertyChangeEvent() {
        _super.apply(this, arguments);
    }
    PropertyChangeEvent.prototype.listen = function (handler, context) {
        if (context === void 0) { context = null; }
        _super.prototype.on.call(this, 'propertyChange', handler, context);
    };
    PropertyChangeEvent.prototype.unlisten = function (handler) {
        _super.prototype.off.call(this, 'propertyChange', handler);
    };
    PropertyChangeEvent.prototype.notify = function (info) {
        return _super.prototype.emit.call(this, 'propertyChange', info);
    };
    return PropertyChangeEvent;
})(EventEmitter);
exports.PropertyChangeEvent = PropertyChangeEvent;
var ObservableObject = (function () {
    function ObservableObject() {
        this.propertyChanged = new PropertyChangeEvent();
    }
    return ObservableObject;
})();
exports.ObservableObject = ObservableObject;
function observable(target, key) {
    var _val = this[key];
    // Don't use arrow function because we want correct "this" to be current object
    var getter = function () {
        return _val;
    };
    var setter = function (newVal) {
        if (_val !== newVal) {
            var oldVal = _val;
            _val = newVal;
            var propertyChangeEvent = this.propertyChanged;
            propertyChangeEvent.emit('propertyChange', new PropertyChangeInfo(this, key, oldVal, newVal));
        }
    };
    // Delete property.
    if (delete this[key]) {
        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}
exports.observable = observable;
//# sourceMappingURL=observable.js.map