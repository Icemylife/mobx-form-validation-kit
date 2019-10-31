import { AbstractControl } from './abstract-control';
import { FormAbstractGroup } from './form-abstract-group';
import { ControlTypes } from './сontrol-types';
import { ValidatorFunctionFormArrayHandler } from './events';
import { FormAbstractControl } from './form-abstract-control';
import { ValidationEvent } from './validation-event';
export declare class FormArray<TControl extends AbstractControl> extends FormAbstractGroup {
    readonly type: ControlTypes;
    private readonly reactionOnIsActiveDisposer;
    private controls;
    readonly length: number;
    private readonly validators;
    static of<TControl extends AbstractControl>(
    /** FormControls */
    controls?: TControl[], 
    /**
     * Validators
     * / Валидации
     */
    validators?: ValidatorFunctionFormArrayHandler<TControl>[], 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | null): FormArray<TControl>;
    constructor(
    /** FormControls */
    controls?: TControl[], 
    /**
     * Validators
     * / Валидации
     */
    validators?: ValidatorFunctionFormArrayHandler<TControl>[], 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | null);
    get(index: number): TControl;
    dispose: () => void;
    private checkArrayValidations;
    setDirty: (dirty: boolean) => this;
    setTouched: (touched: boolean) => this;
    allControls(): FormAbstractControl[];
    executeAsyncValidation: (validator: (control: this) => Promise<ValidationEvent[]>) => Promise<ValidationEvent[]>;
    /**
     * Removes the last element from an array and returns it.
     */
    pop: () => TControl | undefined;
    /**
     * Appends new elements to an array, and returns the new length of the array.
     * @param items New elements of the Array.
     */
    push: (...items: TControl[]) => number;
    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    concat: (...items: (TControl | ConcatArray<TControl>)[]) => TControl[];
    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    clear: () => void;
    /**
     * Reverses the elements in an Array.
     */
    reverse: () => TControl[];
    /**
     * Removes the first element from an array and returns it.
     */
    shift: () => TControl | undefined;
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    slice: (start?: number | undefined, end?: number | undefined) => TControl[];
    /**
     * Sorts an array.
     * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
     */
    sort: (compareFn?: ((a: TControl, b: TControl) => number) | undefined) => TControl[];
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     */
    splice: (start: number, deleteCount?: number | undefined) => TControl[];
    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    unshift: (...items: TControl[]) => number;
    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    indexOf: (searchElement: TControl, fromIndex?: number | undefined) => number;
    /**
     * Returns the index of the last occurrence of a specified value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
     */
    lastIndexOf: (searchElement: TControl, fromIndex?: number | undefined) => number;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    every: (callbackfn: (value: TControl, index: number, array: TControl[]) => unknown, thisArg?: any) => boolean;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    some: (callbackfn: (value: TControl, index: number, array: TControl[]) => unknown, thisArg?: any) => boolean;
    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach: (callbackfn: (value: TControl, index: number, array: TControl[]) => void, thisArg?: any) => void;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    map: <U>(callbackfn: (value: TControl, index: number, array: TControl[]) => U, thisArg?: any) => U[];
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    filter: (callbackfn: (value: TControl, index: number, array: TControl[]) => unknown, thisArg?: any) => TControl[];
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce: <U = TControl>(callbackfn: (previousValue: U, currentValue: TControl, currentIndex: number, array: TControl[]) => U, initialValue: U) => U;
    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduceRight: <U>(callbackfn: (previousValue: U, currentValue: TControl, currentIndex: number, array: TControl[]) => U, initialValue: U) => U;
    protected abbreviatedAND: (getData: (control: AbstractControl) => boolean) => boolean;
    protected abbreviatedOR: (getData: (control: AbstractControl) => boolean) => boolean;
}
