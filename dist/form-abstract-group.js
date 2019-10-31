import { __decorate, __extends } from "tslib";
import { action, computed, when } from 'mobx';
import { AbstractControl } from './abstract-control';
var FormAbstractGroup = /** @class */ (function (_super) {
    __extends(FormAbstractGroup, _super);
    function FormAbstractGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormAbstractGroup.prototype, "processing", {
        get: function () {
            return this.inProcessing || this.abbreviatedOR(function (control) { return control.processing; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "invalid", {
        get: function () {
            return this.active && (this.errors.length > 0 || this.serverErrors.length > 0 || this.abbreviatedOR(function (control) { return control.invalid; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "valid", {
        get: function () {
            return this.disabled || (this.errors.length === 0 && this.serverErrors.length === 0 && this.abbreviatedAND(function (control) { return control.valid; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "pristine", {
        get: function () {
            return this.abbreviatedAND(function (control) { return control.pristine; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "dirty", {
        get: function () {
            return this.abbreviatedOR(function (control) { return control.dirty; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "untouched", {
        get: function () {
            return this.abbreviatedAND(function (control) { return control.untouched; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "touched", {
        get: function () {
            return this.abbreviatedOR(function (control) { return control.touched; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "focused", {
        get: function () {
            return this.abbreviatedOR(function (control) { return control.focused; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Waiting for end of validation
     * Ожидание окончания проверки
     */
    FormAbstractGroup.prototype.wait = function () {
        var _this = this;
        return when(function () { return !_this.processing; });
    };
    __decorate([
        computed
    ], FormAbstractGroup.prototype, "processing", null);
    __decorate([
        computed
    ], FormAbstractGroup.prototype, "invalid", null);
    __decorate([
        computed
    ], FormAbstractGroup.prototype, "valid", null);
    __decorate([
        computed
    ], FormAbstractGroup.prototype, "pristine", null);
    __decorate([
        computed
    ], FormAbstractGroup.prototype, "dirty", null);
    __decorate([
        computed
    ], FormAbstractGroup.prototype, "untouched", null);
    __decorate([
        computed
    ], FormAbstractGroup.prototype, "touched", null);
    __decorate([
        computed
    ], FormAbstractGroup.prototype, "focused", null);
    __decorate([
        action
    ], FormAbstractGroup.prototype, "wait", null);
    return FormAbstractGroup;
}(AbstractControl));
export { FormAbstractGroup };
//# sourceMappingURL=form-abstract-group.js.map