var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
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
        actor.propertyChanged.listen(function (info) {
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
        actor.propertyChanged.listen(function (info) {
            propertyChangeInfo = info;
        });
        actor.property = "oldValue";
        chai_1.expect(propertyChangeInfo).to.not.exist;
    });
});
var ObservableActor = (function (_super) {
    __extends(ObservableActor, _super);
    function ObservableActor(property) {
        _super.call(this);
        this.property = property;
    }
    __decorate([
        observable_1.observable
    ], ObservableActor.prototype, "property");
    return ObservableActor;
})(observable_1.ObservableObject);
//# sourceMappingURL=observable.spec.js.map