"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = __importDefault(require("eventemitter3"));
class PropertyChangeInfo {
    constructor(target, propertyName, oldValue, newValue) {
        this.target = target;
        this.propertyName = propertyName;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}
exports.PropertyChangeInfo = PropertyChangeInfo;
class PropertyChangeEvent extends eventemitter3_1.default {
    listen(handler, context = null) {
        super.on('propertyChange', handler, context);
    }
    unlisten(handler) {
        super.off('propertyChange', handler);
    }
    notify(info) {
        return super.emit('propertyChange', info);
    }
}
exports.PropertyChangeEvent = PropertyChangeEvent;
function observable(target, key) {
    let _val = target[key];
    // Don't use arrow function because we want correct "this" to be current object
    const getter = function () {
        return _val;
    };
    const setter = function (newVal) {
        if (_val !== newVal) {
            const oldVal = _val;
            _val = newVal;
            const propertyChangeEvent = this.propertyChanged;
            propertyChangeEvent.emit('propertyChange', new PropertyChangeInfo(this, key, oldVal, newVal));
        }
    };
    // Delete property.
    if (delete target[key]) {
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
