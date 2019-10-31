import { __read, __spread } from "tslib";
export var noop = function () { };
export var identity = function (arg) { return arg; };
export var combineErrors = function (groutErrors) {
    return groutErrors.reduce(function (acumulator, value) { return __spread(acumulator, value); }).filter(function (err) { return !!err; });
};
//# sourceMappingURL=utilites.js.map