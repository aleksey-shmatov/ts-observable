import EventEmitter = require('eventemitter3');

export class PropertyChangeInfo{
  constructor(public target:INotifyPropertyChanged, public propertyName, public oldValue, public newValue){

  }
}

export class PropertyChangeEvent extends EventEmitter{
  listen(handler:(info:PropertyChangeInfo)=>void, context = null):void{
     super.on('propertyChange', handler, context);
  }
	
  unlisten(handler:(info:PropertyChangeInfo)=>void):void{
    super.off('propertyChange', handler);		
  }
	
  notify(info:PropertyChangeInfo){
    return super.emit('propertyChange', info);
  }
}

export interface INotifyPropertyChanged{
    propertyChanged:PropertyChangeEvent;
}

export class ObservableObject implements INotifyPropertyChanged{
  public propertyChanged:PropertyChangeEvent;
  
  constructor(){
    this.propertyChanged = new PropertyChangeEvent();
  }
}

export function observable(target: any, key: string) {
  let _val = this[key];
  
  // Don't use arrow function because we want correct "this" to be current object
  const getter = function () {
    return _val;
  };

  const setter = function (newVal) {
    if(_val !== newVal){
      const oldVal = _val;
      _val = newVal; 
      const propertyChangeEvent:PropertyChangeEvent = this.propertyChanged;
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
