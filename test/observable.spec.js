var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/// <reference path="../typings/tsd.d.ts" /> 
var observable_1 = require('../lib/observable');
var chai_1 = require('chai');
describe('observable', function () {
    it("should correctly set new value of observable property", function () {
        var actor = new ObservableActor("oldValue");
        actor.property = "newValue";
        chai_1.expect(actor.property).to.equal("newValue");
    });
    it("should trigger propertyChanged on new value", function () {
        var actor = new ObservableActor("oldValue");
        var propertyChangeInfo;
        actor.propertyChanged.attach(function (info) {
            propertyChangeInfo = info;
        });
        actor.property = "newValue";
        chai_1.expect(propertyChangeInfo).to.exist;
        chai_1.expect(propertyChangeInfo.propertyName).to.equal("property");
        chai_1.expect(propertyChangeInfo.newValue).to.equal("newValue");
        chai_1.expect(propertyChangeInfo.oldValue).to.equal("oldValue");
    });
    it("should not trigger propertyChanged on same value", function () {
        var actor = new ObservableActor("oldValue");
        var propertyChangeInfo;
        actor.propertyChanged.attach(function (info) {
            propertyChangeInfo = info;
        });
        actor.property = "oldValue";
        chai_1.expect(propertyChangeInfo).to.not.exist;
    });
});
var ObservableActor = (function () {
    function ObservableActor(property) {
        this.propertyChanged = new observable_1.PropertyChangeEvent();
        this.property = property;
    }
    __decorate([
        observable_1.default
    ], ObservableActor.prototype, "property");
    return ObservableActor;
})();
//# sourceMappingURL=observable.spec.js.map