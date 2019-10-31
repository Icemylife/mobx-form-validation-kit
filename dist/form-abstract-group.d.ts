import { AbstractControl } from './abstract-control';
import { FormAbstractControl } from './form-abstract-control';
export declare abstract class FormAbstractGroup extends AbstractControl {
    readonly processing: boolean;
    readonly invalid: boolean;
    readonly valid: boolean;
    readonly pristine: boolean;
    readonly dirty: boolean;
    readonly untouched: boolean;
    readonly touched: boolean;
    readonly focused: boolean;
    /**
     * Waiting for end of validation
     * Ожидание окончания проверки
     */
    wait(): Promise<void>;
    abstract allControls(): FormAbstractControl[];
    protected abstract abbreviatedAND(getData: (control: AbstractControl) => boolean): boolean;
    protected abstract abbreviatedOR(getData: (control: AbstractControl) => boolean): boolean;
}
