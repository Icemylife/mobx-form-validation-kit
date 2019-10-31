import { __decorate, __extends, __generator, __values } from "tslib";
import { action, reaction, runInAction } from 'mobx';
import { FormAbstractGroup } from './form-abstract-group';
import { ControlTypes } from './сontrol-types';
var FormGroup = /** @class */ (function (_super) {
    __extends(FormGroup, _super);
    function FormGroup(
    /** controls */
    controls, 
    /**
     * Validators
     * / Валидаторы
     */
    validators, 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate) {
        var e_1, _a;
        if (validators === void 0) { validators = []; }
        if (activate === void 0) { activate = null; }
        var _this = _super.call(this, activate) || this;
        _this.type = ControlTypes.Group;
        _this.validators = [];
        _this.dispose = function () {
            var e_2, _a;
            _this.baseDispose();
            _this.reactionOnIsActiveDisposer();
            try {
                for (var _b = __values(_this.getControls()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var control = _c.value;
                    control.dispose();
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        _this.error = function (key) {
            return _this.errors.find(function (err) { return err.key === key; });
        };
        _this.setDirty = function (dirty) {
            var e_3, _a;
            try {
                for (var _b = __values(_this.getControls()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var control = _c.value;
                    control.setDirty(dirty);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return _this;
        };
        _this.setTouched = function (touched) {
            var e_4, _a;
            try {
                for (var _b = __values(_this.getControls()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var control = _c.value;
                    control.setTouched(touched);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return _this;
        };
        _this.checkGroupValidations = function () {
            _this.inProcessing = true;
            _this.onValidation(_this.validators, _this.checkGroupValidations, function () {
                return runInAction(function () {
                    _this.inProcessing = false;
                });
            });
        };
        _this.abbreviatedAND = function (getData) {
            var e_5, _a;
            try {
                for (var _b = __values(_this.getControls()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var control = _c.value;
                    if (!getData(control)) {
                        return false;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return true;
        };
        _this.abbreviatedOR = function (getData) {
            var e_6, _a;
            try {
                for (var _b = __values(_this.getControls()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var control = _c.value;
                    if (getData(control)) {
                        return true;
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return false;
        };
        _this.executeAsyncValidation = function (validator) {
            return _this.baseExecuteAsyncValidation(validator, function () {
                _this.serverErrors = [];
                _this.checkGroupValidations();
            });
        };
        _this.controls = controls;
        _this.validators = validators;
        _this.reactionOnIsActiveDisposer = reaction(function () { return _this.isActive; }, function () {
            _this.checkGroupValidations();
            _this.onChange.call();
        });
        try {
            for (var _b = __values(_this.getControls()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var control = _c.value;
                control.onChange.add(function () {
                    _this.serverErrors = [];
                    _this.checkGroupValidations();
                    _this.onChange.call();
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _this.checkGroupValidations();
        return _this;
    }
    FormGroup.of = function (
    /** controls */
    controls, 
    /**
     * Validators
     * / Валидаторы
     */
    validators, 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate) {
        if (validators === void 0) { validators = []; }
        if (activate === void 0) { activate = null; }
        return new FormGroup(controls, validators, activate);
    };
    FormGroup.prototype.allControls = function () {
        var e_7, _a;
        var controls = [];
        try {
            for (var _b = __values(this.getControls()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var control = _c.value;
                if (control.type === ControlTypes.Control) {
                    controls.push(control);
                }
                else if (control.type === ControlTypes.Group || control.type === ControlTypes.Array) {
                    controls = controls.concat(control.allControls());
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return controls;
    };
    FormGroup.prototype.getControls = function () {
        var _a, _b, _i, keyName, control, control_1, control_1_1, controlItem, e_8_1;
        var e_8, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = [];
                    for (_b in this.controls)
                        _a.push(_b);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 13];
                    keyName = _a[_i];
                    control = this.controls[keyName];
                    if (!(control instanceof Array)) return [3 /*break*/, 10];
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    control_1 = (e_8 = void 0, __values(control)), control_1_1 = control_1.next();
                    _d.label = 3;
                case 3:
                    if (!!control_1_1.done) return [3 /*break*/, 6];
                    controlItem = control_1_1.value;
                    return [4 /*yield*/, controlItem];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    control_1_1 = control_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_8_1 = _d.sent();
                    e_8 = { error: e_8_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (control_1_1 && !control_1_1.done && (_c = control_1.return)) _c.call(control_1);
                    }
                    finally { if (e_8) throw e_8.error; }
                    return [7 /*endfinally*/];
                case 9: return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, control];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12:
                    _i++;
                    return [3 /*break*/, 1];
                case 13: return [2 /*return*/];
            }
        });
    };
    __decorate([
        action
    ], FormGroup.prototype, "allControls", null);
    __decorate([
        action
    ], FormGroup.prototype, "error", void 0);
    __decorate([
        action
    ], FormGroup.prototype, "setDirty", void 0);
    __decorate([
        action
    ], FormGroup.prototype, "setTouched", void 0);
    __decorate([
        action
    ], FormGroup.prototype, "checkGroupValidations", void 0);
    return FormGroup;
}(FormAbstractGroup));
export { FormGroup };
//# sourceMappingURL=form-group.js.map