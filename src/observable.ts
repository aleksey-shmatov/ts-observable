import EventEmitter from 'eventemitter3';

export class PropertyChangeInfo {
    constructor(public readonly target: INotifyPropertyChanged, 
        public readonly propertyName: string,
        public readonly oldValue: any,
        public readonly newValue: any) {

    }
}

export class PropertyChangeEvent extends EventEmitter {
    listen(handler: (info: PropertyChangeInfo) => void, context: any = null): void {
        super.on('propertyChange', handler, context);
    }

    unlisten(handler: (info: PropertyChangeInfo) => void): void {
        super.off('propertyChange', handler);
    }

    notify(info: PropertyChangeInfo) {
        return super.emit('propertyChange', info);
    }
}

export interface INotifyPropertyChanged {
    propertyChanged: PropertyChangeEvent;
}

export function observable(target: any, key: string) {
    let _val = target[key];

    // Don't use arrow function because we want correct "this" to be current object
    const getter = function () {
        return _val;
    };

    const setter = function (this: any, newVal: any) {
        if (_val !== newVal) {
            const oldVal = _val;
            _val = newVal;
            const propertyChangeEvent: PropertyChangeEvent = this.propertyChanged;
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