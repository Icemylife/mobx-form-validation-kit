import { __decorate, __extends } from "tslib";
import { action, computed, observable, reaction } from 'mobx';
import { FormAbstractControl } from './form-abstract-control';
import { ControlTypes } from './сontrol-types';
import { noop } from './utilites';
function isOptions(arg) {
    return typeof arg === 'object' && arg !== null && arg.constructor === Object;
}
function getOptions(validators, setValidValue, activate, additionalData) {
    var options = {};
    if (validators) {
        if (isOptions(validators)) {
            Object.assign(options, validators);
        }
        else {
            options.validators = validators;
        }
    }
    if (setValidValue) {
        if (isOptions(setValidValue)) {
            Object.assign(options, setValidValue);
        }
        else {
            options.setValidValue = setValidValue;
        }
    }
    if (activate) {
        if (isOptions(activate)) {
            Object.assign(options, activate);
        }
        else {
            options.activate = activate;
        }
    }
    if (additionalData !== null) {
        options.additionalData = additionalData;
    }
    return options;
}
var FormControl = /** @class */ (function (_super) {
    __extends(FormControl, _super);
    function FormControl(
    /**
     * Initializing valueI
     * / Инициализирующие значение или его getter
     */
    valueOrGetter, 
    /**
     * Validators
     * / Валидаторы
     */
    validators, 
    /**
     * Callback get last valid value
     * / Передает последние валидное значение
     */
    setValidValue, 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate, 
    /**
     * Additional information
     * / Блок с дополнительной информацией
     */
    additionalData) {
        if (validators === void 0) { validators = []; }
        if (setValidValue === void 0) { setValidValue = null; }
        if (activate === void 0) { activate = null; }
        if (additionalData === void 0) { additionalData = null; }
        var _this = _super.call(this, getOptions(validators, setValidValue, activate, additionalData).activate) || this;
        _this.type = ControlTypes.Control;
        _this.isInitializedValue = false;
        _this.isInitializedActived = false;
        _this.isDirty = false;
        _this.isTouched = false;
        _this.isFocused = false;
        _this.setInitialValue = function (valueOrGetter) {
            var valueGetter = valueOrGetter instanceof Function ? valueOrGetter : function () { return valueOrGetter; };
            _this.reactionOnValueGetterDisposer && _this.reactionOnValueGetterDisposer();
            _this.reactionOnValueGetterDisposer = reaction(valueGetter, function (initialValue) {
                _this.reactionOnInternalValueDisposer && _this.reactionOnInternalValueDisposer();
                _this.internalValue = initialValue;
                _this.reactionOnInternalValueDisposer = reaction(function () { return _this.internalValue; }, function () {
                    _this.isDirty = true;
                    _this.serverErrors = [];
                    _this.checkInternalValue();
                    _this.onChange.call();
                });
                if (_this.isInitialized) {
                    _this.checkInternalValue(_this.callSetterOnReinitialize);
                }
                else {
                    _this.checkInternalValue(_this.callSetterOnInitialize);
                }
                _this.isInitializedValue = true;
            }, { fireImmediately: true });
            return _this;
        };
        _this.executeAsyncValidation = function (validator) {
            return _this.baseExecuteAsyncValidation(validator, function () {
                _this.serverErrors = [];
                _this.checkInternalValue();
            });
        };
        _this.runInAction = function (action) {
            return new Promise(function (resolve) {
                return _this.reactionOnValidatorDisposers.push(reaction(function () { return action().then(resolve); }, function () {
                    _this.serverErrors = [];
                    _this.checkInternalValue();
                }));
            });
        };
        _this.error = function (key) {
            return _this.errors.find(function (err) { return err.key === key; });
        };
        _this.setValue = function (value) {
            _this.internalValue = value;
            return _this;
        };
        _this.setDirty = function (dirty) {
            _this.isDirty = dirty;
            return _this;
        };
        _this.setTouched = function (touched) {
            _this.isTouched = touched;
            return _this;
        };
        _this.setFocused = function (focused) {
            _this.isFocused = focused;
            return _this;
        };
        _this.dispose = function () {
            _this.baseDispose();
            _this.reactionOnValueGetterDisposer && _this.reactionOnValueGetterDisposer();
            _this.reactionOnInternalValueDisposer && _this.reactionOnInternalValueDisposer();
            _this.reactionOnIsActiveDisposer();
            _this.reactionOnIsDirtyDisposer();
            _this.reactionOnIsFocusedDisposer();
        };
        _this.checkInternalValue = function (shouldCallSetter) {
            if (shouldCallSetter === void 0) { shouldCallSetter = true; }
            _this.inProcessing = true;
            _this.onValidation(_this.validators, _this.checkInternalValue, function () {
                if (shouldCallSetter && _this.setValidValue && _this.errors.length === 0) {
                    _this.setValidValue(_this.internalValue);
                }
                _this.inProcessing = false;
            });
        };
        var options = getOptions(validators, setValidValue, activate, additionalData);
        _this.validators = options.validators || [];
        _this.setValidValue = options.setValidValue || noop;
        _this.additionalData = options.additionalData || null;
        _this.callSetterOnInitialize = options.callSetterOnInitialize == null ? typeof valueOrGetter !== 'function' : options.callSetterOnInitialize;
        _this.callSetterOnReinitialize = options.callSetterOnReinitialize == null ? false : options.callSetterOnReinitialize;
        _this.reactionOnIsActiveDisposer = reaction(function () { return _this.isActive; }, function () {
            _this.checkInternalValue(_this.isInitialized || _this.callSetterOnInitialize);
            _this.isInitializedActived = true;
            _this.onChange.call();
        });
        _this.reactionOnIsDirtyDisposer = reaction(function () { return _this.isDirty; }, function (isDirty) {
            if (isDirty) {
                _this.serverErrors = [];
            }
        });
        _this.reactionOnIsFocusedDisposer = reaction(function () { return _this.isFocused; }, function (isFocused) {
            if (!isFocused) {
                _this.serverErrors = [];
            }
        });
        _this.setInitialValue(valueOrGetter);
        return _this;
    }
    Object.defineProperty(FormControl.prototype, "isInitialized", {
        get: function () {
            return this.isInitializedValue && this.isInitializedActived;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "processing", {
        get: function () {
            return this.inProcessing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "value", {
        get: function () {
            return this.internalValue;
        },
        set: function (value) {
            this.internalValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "invalid", {
        get: function () {
            return this.active && (this.errors.length > 0 || this.serverErrors.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "valid", {
        get: function () {
            return this.disabled || (this.errors.length === 0 && this.serverErrors.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "pristine", {
        get: function () {
            return !this.isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "dirty", {
        get: function () {
            return this.isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "untouched", {
        get: function () {
            return !this.isTouched;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "touched", {
        get: function () {
            return this.isTouched;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "focused", {
        get: function () {
            return this.isFocused;
        },
        enumerable: true,
        configurable: true
    });
    FormControl.for = function (
    /**
     * Model object containing the editable field
     * Объект модели, содержащий редактируемое поле
     */
    model, 
    /**
     * Field name of the model to edit
     * Имя редактируемого поля модели
     */
    fieldName, 
    /**
     * Validations
     * Валидациии
     */
    validators, 
    /**
     * Options
     * Опции
     */
    modelOptions) {
        var _a = getOptions(validators, function (value) { return (model[fieldName] = value); }, modelOptions).reflectModelChanges, reflectModelChanges = _a === void 0 ? true : _a;
        return new FormControl(reflectModelChanges ? function () { return model[fieldName]; } : model[fieldName], modelOptions);
    };
    __decorate([
        observable
    ], FormControl.prototype, "internalValue", void 0);
    __decorate([
        computed
    ], FormControl.prototype, "processing", null);
    __decorate([
        computed
    ], FormControl.prototype, "value", null);
    __decorate([
        computed
    ], FormControl.prototype, "invalid", null);
    __decorate([
        computed
    ], FormControl.prototype, "valid", null);
    __decorate([
        observable
    ], FormControl.prototype, "isDirty", void 0);
    __decorate([
        computed
    ], FormControl.prototype, "pristine", null);
    __decorate([
        computed
    ], FormControl.prototype, "dirty", null);
    __decorate([
        observable
    ], FormControl.prototype, "isTouched", void 0);
    __decorate([
        computed
    ], FormControl.prototype, "untouched", null);
    __decorate([
        computed
    ], FormControl.prototype, "touched", null);
    __decorate([
        observable
    ], FormControl.prototype, "isFocused", void 0);
    __decorate([
        computed
    ], FormControl.prototype, "focused", null);
    __decorate([
        observable
    ], FormControl.prototype, "additionalData", void 0);
    __decorate([
        action
    ], FormControl.prototype, "error", void 0);
    __decorate([
        action
    ], FormControl.prototype, "setValue", void 0);
    __decorate([
        action
    ], FormControl.prototype, "setDirty", void 0);
    __decorate([
        action
    ], FormControl.prototype, "setTouched", void 0);
    __decorate([
        action
    ], FormControl.prototype, "setFocused", void 0);
    __decorate([
        action
    ], FormControl.prototype, "checkInternalValue", void 0);
    return FormControl;
}(FormAbstractControl));
export { FormControl };
//# sourceMappingURL=form-control.js.map