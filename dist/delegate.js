import { __values } from "tslib";
var Delegate = /** @class */ (function () {
    function Delegate() {
        var _this = this;
        this.funcs = [];
        this.add = function (method) {
            if (!_this.funcs.some(function (m) { return m === method; })) {
                _this.funcs.push(method);
            }
        };
        this.remove = function (method) {
            var index = _this.funcs.indexOf(method);
            if (index < 0) {
                return;
            }
            _this.funcs = _this.funcs.splice(index, 1);
        };
        this.call = function () {
            var e_1, _a;
            try {
                for (var _b = __values(_this.funcs), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var func = _c.value;
                    func();
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
        this.dispose = function () {
            _this.funcs = [];
        };
    }
    return Delegate;
}());
export { Delegate };
//# sourceMappingURL=delegate.js.map