import {
    observable, INotifyPropertyChanged, PropertyChangeInfo,
    PropertyChangeEvent
} from '../src/observable';

describe('observable', () => {
    it("should correctly set new value of observable property", () => {
        let actor = new ObservableActor("oldValue");
        actor.property = "newValue";
        expect(actor.property).toBe("newValue");
    });
    it("should trigger propertyChanged on new value", () => {
        let actor = new ObservableActor("oldValue");
        let propertyChangeInfo: PropertyChangeInfo | null = null;
        actor.propertyChanged.listen((info: PropertyChangeInfo) => {
            propertyChangeInfo = info;
        });
        actor.property = "newValue";
        expect(propertyChangeInfo).not.toBe(null);
        expect(propertyChangeInfo!.propertyName).toBe("property");
        expect(propertyChangeInfo!.newValue).toBe("newValue");
        expect(propertyChangeInfo!.oldValue).toBe("oldValue");
    });
    it("should not trigger propertyChanged on same value", () => {
        let actor = new ObservableActor("oldValue");
        let propertyChangeInfo: PropertyChangeInfo | null = null;
        actor.propertyChanged.listen((info) => {
            propertyChangeInfo = info;
        });
        actor.property = "oldValue";
        expect(propertyChangeInfo).toBeNull();
    });
})

class ObservableActor implements INotifyPropertyChanged {
    public propertyChanged: PropertyChangeEvent = new PropertyChangeEvent();

    @observable
    public property: string;

    constructor(property: string) {
        this.property = property;
    }
}