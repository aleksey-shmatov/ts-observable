var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../node_modules/ts-events/ts-events.d.ts" /> 
var events = require("ts-events");
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
    return PropertyChangeEvent;
})(events.SyncEvent);
exports.PropertyChangeEvent = PropertyChangeEvent;
function observable(target, key) {
    var _val = this[key];
    var getter = function () {
        return _val;
    };
    var setter = function (newVal) {
        if (_val !== newVal) {
            var oldVal = _val;
            _val = newVal;
            var propertyChangeEvent = this.propertyChanged;
            propertyChangeEvent.post(new PropertyChangeInfo(this, key, oldVal, newVal));
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = observable;
//# sourceMappingURL=observable.js.map