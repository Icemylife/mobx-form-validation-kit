import { __decorate, __extends, __read, __spread, __values } from "tslib";
import { action, computed, observable, reaction, runInAction } from 'mobx';
import { FormAbstractGroup } from './form-abstract-group';
import { ControlTypes } from './сontrol-types';
var FormArray = /** @class */ (function (_super) {
    __extends(FormArray, _super);
    function FormArray(
    /** FormControls */
    controls, 
    /**
     * Validators
     * / Валидации
     */
    validators, 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate) {
        var e_1, _a;
        if (controls === void 0) { controls = []; }
        if (validators === void 0) { validators = []; }
        if (activate === void 0) { activate = null; }
        var _this = _super.call(this, activate) || this;
        _this.type = ControlTypes.Array;
        _this.validators = [];
        _this.dispose = function () {
            var e_2, _a;
            _this.baseDispose();
            _this.reactionOnIsActiveDisposer();
            try {
                for (var _b = __values(_this.controls), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        _this.checkArrayValidations = function () {
            _this.inProcessing = true;
            _this.onValidation(_this.validators, _this.checkArrayValidations, function () {
                return runInAction(function () {
                    _this.inProcessing = false;
                });
            });
        };
        _this.setDirty = function (dirty) {
            var e_3, _a;
            try {
                for (var _b = __values(_this.controls), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                for (var _b = __values(_this.controls), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        _this.executeAsyncValidation = function (validator) {
            return _this.baseExecuteAsyncValidation(validator, function () {
                _this.serverErrors = [];
                _this.checkArrayValidations();
            });
        };
        /**
         * Removes the last element from an array and returns it.
         */
        _this.pop = function () {
            var removeControl = _this.controls.pop();
            _this.onChange.call();
            return removeControl;
        };
        /**
         * Appends new elements to an array, and returns the new length of the array.
         * @param items New elements of the Array.
         */
        _this.push = function () {
            var _a;
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            var newIndex = (_a = _this.controls).push.apply(_a, __spread(items));
            _this.onChange.call();
            return newIndex;
        };
        /**
         * Combines two or more arrays.
         * @param items Additional items to add to the end of array1.
         */
        _this.concat = function () {
            var _a;
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            return (_a = _this.controls).concat.apply(_a, __spread(items));
        };
        /**
         * Combines two or more arrays.
         * @param items Additional items to add to the end of array1.
         */
        _this.clear = function () {
            _this.controls = [];
            _this.onChange.call();
        };
        /**
         * Reverses the elements in an Array.
         */
        _this.reverse = function () {
            return _this.controls.reverse();
        };
        /**
         * Removes the first element from an array and returns it.
         */
        _this.shift = function () {
            return _this.controls.shift();
        };
        /**
         * Returns a section of an array.
         * @param start The beginning of the specified portion of the array.
         * @param end The end of the specified portion of the array.
         */
        _this.slice = function (start, end) {
            return _this.controls.slice(start, end);
        };
        /**
         * Sorts an array.
         * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
         */
        _this.sort = function (compareFn) {
            return _this.controls.slice().sort(compareFn);
        };
        /**
         * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
         * @param start The zero-based location in the array from which to start removing elements.
         * @param deleteCount The number of elements to remove.
         */
        _this.splice = function (start, deleteCount) {
            return _this.controls.splice(start, deleteCount);
        };
        /**
         * Inserts new elements at the start of an array.
         * @param items  Elements to insert at the start of the Array.
         */
        _this.unshift = function () {
            var _a;
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            return (_a = _this.controls).unshift.apply(_a, __spread(items));
        };
        /**
         * Returns the index of the first occurrence of a value in an array.
         * @param searchElement The value to locate in the array.
         * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
         */
        _this.indexOf = function (searchElement, fromIndex) {
            return _this.controls.indexOf(searchElement, fromIndex);
        };
        /**
         * Returns the index of the last occurrence of a specified value in an array.
         * @param searchElement The value to locate in the array.
         * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
         */
        _this.lastIndexOf = function (searchElement, fromIndex) {
            return _this.controls.lastIndexOf(searchElement, fromIndex);
        };
        /**
         * Determines whether all the members of an array satisfy the specified test.
         * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        _this.every = function (callbackfn, thisArg) {
            return _this.controls.every(callbackfn, thisArg);
        };
        /**
         * Determines whether the specified callback function returns true for any element of an array.
         * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        _this.some = function (callbackfn, thisArg) {
            return _this.controls.some(callbackfn, thisArg);
        };
        /**
         * Performs the specified action for each element in an array.
         * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
         * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        _this.forEach = function (callbackfn, thisArg) {
            return _this.controls.forEach(callbackfn, thisArg);
        };
        /**
         * Calls a defined callback function on each element of an array, and returns an array that contains the results.
         * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        _this.map = function (callbackfn, thisArg) {
            return _this.controls.map(callbackfn, thisArg);
        };
        /**
         * Returns the elements of an array that meet the condition specified in a callback function.
         * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        _this.filter = function (callbackfn, thisArg) {
            return _this.controls.filter(callbackfn, thisArg);
        };
        /**
         * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
         * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
         * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
         */
        _this.reduce = function (callbackfn, initialValue) {
            return _this.controls.reduce(callbackfn, initialValue);
        };
        /**
         * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
         * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
         * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
         */
        _this.reduceRight = function (callbackfn, initialValue) {
            return _this.controls.reduceRight(callbackfn, initialValue);
        };
        _this.abbreviatedAND = function (getData) {
            var e_5, _a;
            try {
                for (var _b = __values(_this.controls), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                for (var _b = __values(_this.controls), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        _this.inProcessing = false;
        _this.controls = controls;
        _this.validators = validators;
        _this.reactionOnIsActiveDisposer = reaction(function () { return _this.isActive; }, function () {
            _this.checkArrayValidations();
            _this.onChange.call();
        });
        try {
            for (var _b = __values(_this.controls), _c = _b.next(); !_c.done; _c = _b.next()) {
                var control = _c.value;
                control.onChange.add(function () {
                    _this.serverErrors = [];
                    _this.checkArrayValidations();
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
        _this.checkArrayValidations();
        return _this;
    }
    Object.defineProperty(FormArray.prototype, "length", {
        get: function () {
            return this.controls.length;
        },
        enumerable: true,
        configurable: true
    });
    FormArray.of = function (
    /** FormControls */
    controls, 
    /**
     * Validators
     * / Валидации
     */
    validators, 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate) {
        if (controls === void 0) { controls = []; }
        if (validators === void 0) { validators = []; }
        if (activate === void 0) { activate = null; }
        return new FormArray(controls, validators, activate);
    };
    FormArray.prototype.get = function (index) {
        return this.controls[index];
    };
    FormArray.prototype.allControls = function () {
        var e_7, _a;
        var controls = [];
        try {
            for (var _b = __values(this.controls.map(function (c) { return c; })), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    __decorate([
        observable
    ], FormArray.prototype, "controls", void 0);
    __decorate([
        computed
    ], FormArray.prototype, "length", null);
    __decorate([
        action
    ], FormArray.prototype, "checkArrayValidations", void 0);
    __decorate([
        action
    ], FormArray.prototype, "setDirty", void 0);
    __decorate([
        action
    ], FormArray.prototype, "setTouched", void 0);
    __decorate([
        action
    ], FormArray.prototype, "allControls", null);
    __decorate([
        action
    ], FormArray.prototype, "pop", void 0);
    __decorate([
        action
    ], FormArray.prototype, "push", void 0);
    __decorate([
        action
    ], FormArray.prototype, "concat", void 0);
    __decorate([
        action
    ], FormArray.prototype, "clear", void 0);
    __decorate([
        action
    ], FormArray.prototype, "reverse", void 0);
    __decorate([
        action
    ], FormArray.prototype, "shift", void 0);
    __decorate([
        action
    ], FormArray.prototype, "sort", void 0);
    return FormArray;
}(FormAbstractGroup));
export { FormArray };
//# sourceMappingURL=form-array.js.map