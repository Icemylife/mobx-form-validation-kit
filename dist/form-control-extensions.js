var InputFormControl = /** @class */ (function () {
    function InputFormControl() {
    }
    InputFormControl.bindActions = function (formControl, events) {
        return {
            ref: function (element) {
                formControl.element = element;
                if (!!events) {
                    events.ref && events.ref(element);
                }
            },
            onChange: function (event) {
                formControl.value = event.target.value;
                if (!!events) {
                    events.onChange && events.onChange(event);
                }
            },
            onBlur: function (event) {
                formControl.setTouched(true);
                formControl.setFocused(false);
                if (!!events) {
                    events.onBlur && events.onBlur(event);
                }
            },
            onFocus: function (event) {
                formControl.setFocused(true);
                if (!!events) {
                    events.onFocus && events.onFocus(event);
                }
            },
        };
    };
    return InputFormControl;
}());
export { InputFormControl };
var TextAreaFormControl = /** @class */ (function () {
    function TextAreaFormControl() {
    }
    TextAreaFormControl.bindActions = function (formControl, events) {
        return {
            ref: function (element) {
                formControl.element = element;
                if (!!events) {
                    events.ref && events.ref(element);
                }
            },
            onChange: function (event) {
                formControl.value = event.target.value;
                if (!!events) {
                    events.onChange && events.onChange(event);
                }
            },
            onBlur: function (event) {
                formControl.setTouched(true);
                formControl.setFocused(false);
                if (!!events) {
                    events.onBlur && events.onBlur(event);
                }
            },
            onFocus: function (event) {
                formControl.setFocused(true);
                if (!!events) {
                    events.onFocus && events.onFocus(event);
                }
            },
        };
    };
    return TextAreaFormControl;
}());
export { TextAreaFormControl };
//# sourceMappingURL=form-control-extensions.js.map