import {observable, INotifyPropertyChanged, PropertyChangeInfo, ObservableObject,
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
		(<any>actor).propertyChanged.listen((info)=>{
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
		(<any>actor).propertyChanged.listen((info)=>{
			propertyChangeInfo = info;
		});
		actor.property = "oldValue";
		expect(propertyChangeInfo).to.not.exist;
	});
})

class ObservableActor extends ObservableObject{
	@observable
	public property: any;
	
	constructor(property: any){
		super();
		this.property = property;
	}
}