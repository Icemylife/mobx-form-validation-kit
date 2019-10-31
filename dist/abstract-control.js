import { __awaiter, __decorate, __generator, __values } from "tslib";
import { action, computed, observable, reaction, runInAction } from 'mobx';
import { Delegate } from './delegate';
import { ValidationEventTypes } from './validation-event-types';
import { combineErrors, noop } from './utilites';
var AbstractControl = /** @class */ (function () {
    function AbstractControl(
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate) {
        var _this = this;
        if (activate === void 0) { activate = null; }
        this.reactionOnValidatorDisposers = [];
        /**
         * The field contains errors
         * / Поле содержит ошибки
         */
        this.errors = [];
        /**
         * The field contains warnings
         * / Сообщения "Внимание"
         */
        this.warnings = [];
        /**
         * The field contains information messages
         * / Сообщения "Информационные сообщения"
         */
        this.informationMessages = [];
        /**
         * The field contains successes messages
         * / Сообщения об удовлетворении необязательных условий валидации
         */
        this.successes = [];
        this._serverErrors = [];
        /**
         * Callback function of on change
         * / Сообщает факт изменения данных
         */
        this.onChange = new Delegate();
        this.newRequestValidation = 0;
        this.lastValidators = [];
        this.lastValidationFunction = noop;
        this.onValidation = function (validators, onValidationFunction, afterCheck) { return __awaiter(_this, void 0, void 0, function () {
            var haveRequestValidation, groupErrors, oldRequestValidation, errorsPromises, events;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        haveRequestValidation = this.newRequestValidation !== 0;
                        // tslint:disable-next-line: no-increment-decrement
                        this.newRequestValidation++;
                        this.lastValidators = validators;
                        this.lastValidationFunction = onValidationFunction;
                        if (haveRequestValidation) {
                            return [2 /*return*/];
                        }
                        oldRequestValidation = 0;
                        _a.label = 1;
                    case 1:
                        oldRequestValidation = this.newRequestValidation;
                        this.reactionOnValidatorDisposers.forEach(function (r) { return r(); });
                        this.reactionOnValidatorDisposers = [];
                        if (!this.active) return [3 /*break*/, 3];
                        errorsPromises = this.lastValidators.map(function (validator) {
                            var isFirstReaction = true;
                            return new Promise(function (resolve) {
                                return _this.reactionOnValidatorDisposers.push(reaction(function () {
                                    var result;
                                    if (isFirstReaction) {
                                        result = validator(_this).then(resolve);
                                    }
                                    isFirstReaction = false;
                                    return result;
                                }, _this.lastValidationFunction));
                            });
                        });
                        return [4 /*yield*/, Promise.all(errorsPromises)];
                    case 2:
                        groupErrors = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        groupErrors = [];
                        _a.label = 4;
                    case 4:
                        if (oldRequestValidation !== this.newRequestValidation) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5:
                        this.newRequestValidation = 0;
                        events = groupErrors && groupErrors.length > 0 ? combineErrors(groupErrors) : [];
                        return [2 /*return*/, runInAction(function () {
                                _this.errors = events.filter(function (e) { return e.type === ValidationEventTypes.Error; });
                                _this.warnings = events.filter(function (e) { return e.type === ValidationEventTypes.Warning; });
                                _this.informationMessages = events.filter(function (e) { return e.type === ValidationEventTypes.Info; });
                                _this.successes = events.filter(function (e) { return e.type === ValidationEventTypes.Success; });
                                afterCheck();
                            })];
                }
            });
        }); };
        this.baseDispose = function () {
            var e_1, _a;
            _this.onChange.dispose();
            try {
                for (var _b = __values(_this.reactionOnValidatorDisposers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var reactionOnValidator = _c.value;
                    reactionOnValidator();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        this.baseExecuteAsyncValidation = function (validator, onValidationFunction) {
            var isFirstReaction = true;
            return new Promise(function (resolve) {
                return _this.reactionOnValidatorDisposers.push(reaction(function () {
                    var result;
                    if (isFirstReaction) {
                        result = validator(_this).then(resolve);
                    }
                    isFirstReaction = false;
                    return result;
                }, onValidationFunction));
            });
        };
        this.inProcessing = false;
        this.isActiveFunc = activate === null ? function () { return true; } : activate;
    }
    Object.defineProperty(AbstractControl.prototype, "isActive", {
        get: function () {
            return this.isActiveFunc();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "disabled", {
        /**
         * Error checking is disabled (control is always valid)
         * / Проверка ошибок отключена (контрол всегда валиден)
         */
        get: function () {
            return !this.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "active", {
        /**
         * Error checking enabled
         * / Проверка ошибок включена
         */
        get: function () {
            return this.isActive;
        },
        enumerable: true,
        configurable: true
    });
    AbstractControl.prototype.hasErrors = function () {
        return (!!this.errors && this.errors.length > 0) || (!!this._serverErrors && this._serverErrors.length > 0);
    };
    AbstractControl.prototype.hasWarnings = function () {
        return !!this.warnings && this.warnings.length > 0;
    };
    AbstractControl.prototype.hasInformationMessages = function () {
        return !!this.informationMessages && this.informationMessages.length > 0;
    };
    AbstractControl.prototype.hasSuccesses = function () {
        return !!this.successes && this.successes.length > 0;
    };
    Object.defineProperty(AbstractControl.prototype, "maxEventLevel", {
        /**
         * Current message display level
         * / Текущий уровень отображения сообщении
         */
        get: function () {
            if (this.hasErrors())
                return ValidationEventTypes.Error;
            if (this.hasWarnings())
                return ValidationEventTypes.Warning;
            if (this.hasInformationMessages())
                return ValidationEventTypes.Info;
            return ValidationEventTypes.Success;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "serverErrors", {
        /**
         * Additional (server) errors
         * / Дополнительтные (серверные) ошибки
         */
        get: function () {
            return this._serverErrors;
        },
        /**
         * Additional (server) errors
         * / Пополнительтные (серверные) ошибки
         */
        set: function (value) {
            this._serverErrors = value || [];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        observable
    ], AbstractControl.prototype, "inProcessing", void 0);
    __decorate([
        computed
    ], AbstractControl.prototype, "isActive", null);
    __decorate([
        computed
    ], AbstractControl.prototype, "disabled", null);
    __decorate([
        computed
    ], AbstractControl.prototype, "active", null);
    __decorate([
        observable.ref
    ], AbstractControl.prototype, "errors", void 0);
    __decorate([
        observable.ref
    ], AbstractControl.prototype, "warnings", void 0);
    __decorate([
        observable.ref
    ], AbstractControl.prototype, "informationMessages", void 0);
    __decorate([
        observable.ref
    ], AbstractControl.prototype, "successes", void 0);
    __decorate([
        computed
    ], AbstractControl.prototype, "maxEventLevel", null);
    __decorate([
        observable
    ], AbstractControl.prototype, "_serverErrors", void 0);
    __decorate([
        computed
    ], AbstractControl.prototype, "serverErrors", null);
    __decorate([
        action
    ], AbstractControl.prototype, "onValidation", void 0);
    return AbstractControl;
}());
export { AbstractControl };
//# sourceMappingURL=abstract-control.js.map