import { __awaiter, __decorate, __generator } from "tslib";
import { FormControl, FormGroup, required } from '.';
import { observable } from 'mobx';
describe('FormControl', function () {
    it('should not call setter when initialized by default', function () { return __awaiter(void 0, void 0, void 0, function () {
        var setter, form;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setter = jest.fn();
                    form = new FormGroup({
                        field: new FormControl('test', [required()], setter, { callSetterOnInitialize: false }),
                    });
                    return [4 /*yield*/, form.wait()];
                case 1:
                    _a.sent();
                    expect(setter).not.toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call setter once when value is changed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var setter, form;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setter = jest.fn();
                    form = new FormGroup({
                        field: new FormControl('test', [required()], setter, { callSetterOnInitialize: false }),
                    });
                    return [4 /*yield*/, form.wait()];
                case 1:
                    _a.sent();
                    form.controls.field.value = 'qwerty';
                    return [4 /*yield*/, form.wait()];
                case 2:
                    _a.sent();
                    expect(setter).toBeCalledTimes(1);
                    expect(setter).toBeCalledWith('qwerty');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should reflect initial value getter changes', function () { return __awaiter(void 0, void 0, void 0, function () {
        var model, setter, form;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    model = observable({ field: 'test' });
                    setter = jest.fn();
                    form = new FormGroup({
                        field: new FormControl(function () { return model.field; }, [required()], setter),
                    });
                    return [4 /*yield*/, form.wait()];
                case 1:
                    _a.sent();
                    expect(form.controls.field.value).toEqual('test');
                    model.field = 'qwerty';
                    return [4 /*yield*/, form.wait()];
                case 2:
                    _a.sent();
                    expect(form.controls.field.value).toEqual('qwerty');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not call setter when reinitialized by default', function () { return __awaiter(void 0, void 0, void 0, function () {
        var model, setter, form;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    model = observable({ field: 'test' });
                    setter = jest.fn();
                    form = new FormGroup({
                        field: new FormControl(function () { return model.field; }, [required()], setter),
                    });
                    return [4 /*yield*/, form.wait()];
                case 1:
                    _a.sent();
                    model.field = 'qwerty';
                    return [4 /*yield*/, form.wait()];
                case 2:
                    _a.sent();
                    expect(setter).not.toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not call setter when activated during initialization', function () { return __awaiter(void 0, void 0, void 0, function () {
        var primarySetter, dependentSetter, Component, component;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    primarySetter = jest.fn();
                    dependentSetter = jest.fn();
                    Component = /** @class */ (function () {
                        function Component() {
                            var _this = this;
                            this.form = new FormGroup({
                                primaryField: new FormControl('foo', [required()], primarySetter, { callSetterOnInitialize: false }),
                                dependentField: new FormControl('bar', [required()], dependentSetter, {
                                    activate: function () { return _this.form && _this.form.controls.primaryField.value === 'foo'; },
                                    callSetterOnInitialize: false,
                                }),
                            });
                        }
                        __decorate([
                            observable
                        ], Component.prototype, "form", void 0);
                        return Component;
                    }());
                    component = new Component();
                    return [4 /*yield*/, component.form.wait()];
                case 1:
                    _a.sent();
                    expect(primarySetter).not.toBeCalled();
                    expect(dependentSetter).not.toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call setter once when activated after initialization', function () { return __awaiter(void 0, void 0, void 0, function () {
        var primarySetter, dependentSetter, Component, component;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    primarySetter = jest.fn();
                    dependentSetter = jest.fn();
                    Component = /** @class */ (function () {
                        function Component() {
                            var _this = this;
                            this.form = new FormGroup({
                                primaryField: new FormControl(123, [required()], primarySetter, { callSetterOnInitialize: false }),
                                dependentField: new FormControl('bar', [required()], dependentSetter, {
                                    activate: function () { return _this.form && _this.form.controls.primaryField.value === 456; },
                                    callSetterOnInitialize: false,
                                }),
                            });
                        }
                        __decorate([
                            observable
                        ], Component.prototype, "form", void 0);
                        return Component;
                    }());
                    component = new Component();
                    return [4 /*yield*/, component.form.wait()];
                case 1:
                    _a.sent();
                    component.form.controls.primaryField.value = 456;
                    return [4 /*yield*/, component.form.wait()];
                case 2:
                    _a.sent();
                    expect(primarySetter).toBeCalledTimes(1);
                    expect(primarySetter).toBeCalledWith(456);
                    expect(dependentSetter).toBeCalledTimes(1);
                    expect(dependentSetter).toBeCalledWith('bar');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=form-control.test.js.map