/// <reference path="../typings/tsd.d.ts" /> 
import {default as observable, INotifyPropertyChanged, PropertyChangeInfo,
	 PropertyChangeEvent} from '../lib/observable';
import { expect } from 'chai';

describe('observable', ()=>{
	it("should correctly set new value of observable property", ()=>{
		let actor = new ObservableActor("oldValue");
		actor.property = "newValue";
		expect(actor.property).to.equal("newValue");
	});
	it("should trigger propertyChanged on new value",()=>{
		let actor = new ObservableActor("oldValue");
		let propertyChangeInfo:PropertyChangeInfo;
		actor.propertyChanged.attach((info)=>{
			propertyChangeInfo = info;
		});
		actor.property = "newValue";
		expect(propertyChangeInfo).to.exist;
		expect(propertyChangeInfo.propertyName).to.equal("property");
		expect(propertyChangeInfo.newValue).to.equal("newValue");
		expect(propertyChangeInfo.oldValue).to.equal("oldValue");
	});
	it("should not trigger propertyChanged on same value", ()=>{
		let actor = new ObservableActor("oldValue");
		let propertyChangeInfo:PropertyChangeInfo;
		actor.propertyChanged.attach((info)=>{
			propertyChangeInfo = info;
		});
		actor.property = "oldValue";
		expect(propertyChangeInfo).to.not.exist;
	});
})

class ObservableActor implements INotifyPropertyChanged{
	@observable
	public property: any;
	
	public propertyChanged:PropertyChangeEvent = new PropertyChangeEvent();
	
	constructor(property: any){
		this.property = property;
	}
}