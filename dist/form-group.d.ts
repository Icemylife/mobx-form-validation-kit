import { AbstractControls, ValidatorFunctionFormGroupHandler } from './events';
import { AbstractControl } from './abstract-control';
import { ValidationEvent } from './validation-event';
import { FormAbstractGroup } from './form-abstract-group';
import { FormAbstractControl } from './form-abstract-control';
import { ControlTypes } from './сontrol-types';
export declare class FormGroup<TControls extends AbstractControls = AbstractControls> extends FormAbstractGroup {
    readonly type: ControlTypes;
    private readonly reactionOnIsActiveDisposer;
    private readonly validators;
    controls: TControls;
    static of<TControls extends AbstractControls = AbstractControls>(
    /** controls */
    controls: TControls, 
    /**
     * Validators
     * / Валидаторы
     */
    validators?: ValidatorFunctionFormGroupHandler<TControls>[], 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | null): FormGroup<TControls>;
    constructor(
    /** controls */
    controls: TControls, 
    /**
     * Validators
     * / Валидаторы
     */
    validators?: ValidatorFunctionFormGroupHandler<TControls>[], 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | null);
    dispose: () => void;
    allControls(): FormAbstractControl[];
    error: (key: string) => ValidationEvent | undefined;
    setDirty: (dirty: boolean) => this;
    setTouched: (touched: boolean) => this;
    private checkGroupValidations;
    protected abbreviatedAND: (getData: (control: AbstractControl) => boolean) => boolean;
    protected abbreviatedOR: (getData: (control: AbstractControl) => boolean) => boolean;
    private getControls;
    executeAsyncValidation: (validator: (control: this) => Promise<ValidationEvent[]>) => Promise<ValidationEvent[]>;
}
