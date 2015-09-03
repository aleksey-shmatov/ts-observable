/// <reference path="../node_modules/ts-events/ts-events.d.ts" /> 
import events = require("ts-events");

export class PropertyChangeInfo{
  constructor(public target:INotifyPropertyChanged, public propertyName, public oldValue, public newValue){
    
  }
}

export class PropertyChangeEvent extends events.SyncEvent<PropertyChangeInfo>{
  
}

export interface INotifyPropertyChanged{
    propertyChanged:PropertyChangeEvent;
}

export default function observable(target: any, key: string) {
  var _val = this[key];
  
  var getter = function () {
    return _val;
  };

  var setter = function (newVal) {
    if(_val !== newVal){
      var oldVal = _val;
      _val = newVal; 
      var propertyChangeEvent:PropertyChangeEvent = this.propertyChanged;
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