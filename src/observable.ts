import EventEmitter from 'eventemitter3';

export class PropertyChangeInfo {
    public readonly target: NotifyPropertyChanged;
    public readonly propertyName: string;
    public readonly oldValue: any;
    public readonly newValue: any;

    public constructor(target: NotifyPropertyChanged,
        propertyName: string,
        oldValue: any,
        newValue: any) {
        this.target = target;
        this.propertyName = propertyName;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}

export class PropertyChangeEvent extends EventEmitter {
    public listen(handler: (info: PropertyChangeInfo) => void, context: any = null): void {
        super.on('propertyChange', handler, context);
    }

    public unlisten(handler: (info: PropertyChangeInfo) => void): void {
        super.off('propertyChange', handler);
    }

    public notify(info: PropertyChangeInfo): boolean {
        return super.emit('propertyChange', info);
    }
}

export interface NotifyPropertyChanged {
    propertyChanged: PropertyChangeEvent;
}

export function observable(target: any, key: string): void {
    let _val = target[key];

    // Don't use arrow function because we want correct "this" to be current object
    const getter = function (): any {
        return _val;
    };

    const setter = function (this: any, newVal: any): void {
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