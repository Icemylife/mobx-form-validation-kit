import { __awaiter, __generator, __values } from "tslib";
import { combineErrors } from './utilites';
import { ValidationEventTypes } from './validation-event-types';
export var requiredValidator = 'required';
export var required = function (message, eventType) {
    if (message === void 0) { message = 'Поле обязательно'; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (control.value == null || control.value === '') {
                return [2 /*return*/, [
                        {
                            message: message,
                            key: requiredValidator,
                            type: eventType,
                        },
                    ]];
            }
            return [2 /*return*/, []];
        });
    }); };
};
export var notEmptyOrSpacesValidator = 'notEmptyOrSpaces';
export var notEmptyOrSpaces = function (message, eventType) {
    if (message === void 0) { message = 'Отсутствует значение'; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (control.value != null && control.value.trim() !== '') {
                return [2 /*return*/, []];
            }
            return [2 /*return*/, [
                    {
                        message: message,
                        key: notEmptyOrSpacesValidator,
                        type: eventType,
                    },
                ]];
        });
    }); };
};
export var patternValidator = 'pattern';
/**
 * Error if there is no pattern matching
 * / Ошибка, если нет соответствия паттерну
 */
export var pattern = function (regExp, message, eventType) {
    if (message === void 0) { message = 'Присутствуют недопустимые символы'; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (regExp.test(control.value)) {
                return [2 /*return*/, []];
            }
            return [2 /*return*/, [
                    {
                        message: message,
                        key: patternValidator,
                        type: eventType,
                    },
                ]];
        });
    }); };
};
/**
 * Error if there is a pattern match
 * / Ошибка, если есть соответствие паттерну
 */
export var invertPattern = function (regExp, message, eventType) {
    if (message === void 0) { message = 'Присутствуют недопустимые символы'; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (regExp.test(control.value)) {
                return [2 /*return*/, [
                        {
                            message: message,
                            key: patternValidator,
                            type: eventType,
                        },
                    ]];
            }
            return [2 /*return*/, []];
        });
    }); };
};
export var minLengthValidator = 'minlength';
export var minLength = function (minlength, message, eventType) {
    if (message === void 0) { message = "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 " + minlength; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (control.value == null || minlength <= control.value.length || control.value === '') {
                return [2 /*return*/, []];
            }
            return [2 /*return*/, [
                    {
                        message: message,
                        key: minLengthValidator,
                        type: eventType,
                    },
                ]];
        });
    }); };
};
export var maxLengthValidator = 'maxlength';
export var maxLength = function (maxlength, message, eventType) {
    if (message === void 0) { message = "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 " + maxlength; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (control.value == null || control.value.length <= maxlength) {
                return [2 /*return*/, []];
            }
            return [2 /*return*/, [
                    {
                        message: message,
                        key: maxLengthValidator,
                        type: eventType,
                    },
                ]];
        });
    }); };
};
export var absoluteLengthValidator = 'absoluteLength';
export var absoluteLength = function (length, message, eventType) {
    if (message === void 0) { message = "\u0414\u043B\u0438\u043D\u0430 \u043E\u0442\u043B\u0438\u0447\u043D\u0430 \u043E\u0442 " + length; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (control.value == null || control.value.length === length) {
                return [2 /*return*/, []];
            }
            return [2 /*return*/, [
                    {
                        message: message,
                        key: maxLengthValidator,
                        type: eventType,
                    },
                ]];
        });
    }); };
};
export var minValueValidator = 'minValue';
export var minValue = function (min, message, eventType) {
    if (message === void 0) { message = 'Дата слишком маленькая'; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    var getMin = typeof min === 'function' ? min : function () { return min; };
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (control.value == null) {
                return [2 /*return*/, []];
            }
            if (control.value < getMin()) {
                return [2 /*return*/, [
                        {
                            message: message,
                            key: minValueValidator,
                            type: eventType,
                        },
                    ]];
            }
            return [2 /*return*/, []];
        });
    }); };
};
export var maxValueValidator = 'minValue';
export var maxValue = function (max, message, eventType) {
    if (message === void 0) { message = 'Дата слишком большая'; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    var getMax = typeof max === 'function' ? max : function () { return max; };
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (control.value == null) {
                return [2 /*return*/, []];
            }
            if (getMax() < control.value) {
                return [2 /*return*/, [
                        {
                            message: message,
                            key: maxValueValidator,
                            type: eventType,
                        },
                    ]];
            }
            return [2 /*return*/, []];
        });
    }); };
};
export var notContainSpacesValidator = 'notContainSpaces';
/**
 * Not contain spaces
 * / Не содержит проблелов
 */
export var notContainSpaces = function (message, eventType) {
    if (message === void 0) { message = 'Не должен содержать пробелы'; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (control.value == null || !/\s/.test(control.value)) {
                return [2 /*return*/, []];
            }
            return [2 /*return*/, [
                    {
                        message: message,
                        key: notContainSpacesValidator,
                        type: eventType,
                    },
                ]];
        });
    }); };
};
export var compairValidator = 'compair';
/**
 * Wrapper for complex validation (error if validation returns false)
 * / Обёртка для сложной проверки (ошибка, если проверка вернула false)
 */
export var compare = function (expression, message, eventType) {
    if (message === void 0) { message = 'Поле не валидно'; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expression(control.value)];
                case 1:
                    if (_a.sent()) {
                        return [2 /*return*/, []];
                    }
                    return [2 /*return*/, [
                            {
                                message: message,
                                key: compairValidator,
                                type: eventType,
                            },
                        ]];
            }
        });
    }); };
};
export var isEqualValidator = 'isEqual';
/**
 * Equals to {value}
 * / Равно значению {value}
 */
export var isEqual = function (value, message, eventType) {
    if (message === void 0) { message = 'Поля не совпадают'; }
    if (eventType === void 0) { eventType = ValidationEventTypes.Error; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (control.value == null || control.value !== value) {
                return [2 /*return*/, []];
            }
            return [2 /*return*/, [
                    {
                        message: message,
                        key: isEqualValidator,
                        type: eventType,
                    },
                ]];
        });
    }); };
};
/**
 * Runs validations only if activation conditions are met
 * / Запускает валидации только если условие активации выполнено
 */
export var wrapperActivateValidation = function (activate, validators, elseValidators) {
    if (elseValidators === void 0) { elseValidators = []; }
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        var validations, validations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!activate()) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all(validators.map(function (validator) { return control.executeAsyncValidation(validator); }))];
                case 1:
                    validations = _a.sent();
                    return [2 /*return*/, combineErrors(validations)];
                case 2:
                    if (!(elseValidators && elseValidators.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.all(elseValidators.map(function (validator) { return control.executeAsyncValidation(validator); }))];
                case 3:
                    validations = _a.sent();
                    return [2 /*return*/, combineErrors(validations)];
                case 4: return [2 /*return*/, []];
            }
        });
    }); };
};
/**
 * Wrapper for sequential validations (The next validation is launched only after the previous one passed without errors)
 * / Обертка для последовательных валидаций (Следующая валидация запускается, только после того, что предыдущая прошла без ошибок)
 */
export var wrapperSequentialCheck = function (validators) {
    return function (control) { return __awaiter(void 0, void 0, void 0, function () {
        var validators_1, validators_1_1, validator, validationResult, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    validators_1 = __values(validators), validators_1_1 = validators_1.next();
                    _b.label = 1;
                case 1:
                    if (!!validators_1_1.done) return [3 /*break*/, 4];
                    validator = validators_1_1.value;
                    return [4 /*yield*/, control.executeAsyncValidation(validator)];
                case 2:
                    validationResult = _b.sent();
                    if (validationResult.length > 0) {
                        return [2 /*return*/, validationResult];
                    }
                    _b.label = 3;
                case 3:
                    validators_1_1 = validators_1.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (validators_1_1 && !validators_1_1.done && (_a = validators_1.return)) _a.call(validators_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/, []];
            }
        });
    }); };
};
//# sourceMappingURL=validators.js.map