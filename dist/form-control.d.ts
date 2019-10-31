import { ValidationEvent } from './validation-event';
import { ValidatorFunctionFormControlHandler, UpdateValidValueHandler } from './events';
import { FormAbstractControl } from './form-abstract-control';
import { ControlTypes } from './сontrol-types';
interface Options<TEntity, TAdditionalData> {
    /**
     * Function enable validation by condition (always enabled by default)
     * Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | null;
    /**
     * Additional information
     * Блок с дополнительной информацией
     */
    additionalData?: TAdditionalData | null;
    /**
     * Validations
     * Валидациии
     */
    validators?: ValidatorFunctionFormControlHandler<TEntity>[];
    /**
     * Callback get last valid value
     * Передает последние валидное значение
     */
    setValidValue?: UpdateValidValueHandler<TEntity> | null;
    /**
     * Invoke `setValidValue` when `FormControl` is created.
     * Вызвать `setValidValue` при создании `FormControl`.
     * @default false if `valueOrGetter` is function and `true` otherwise
     * @example
     * const model = observable({ value: 123 });
     * new FormControl(
     *   () => model.value,
     *   [],
     *   value => { console.log({ value }); },
     *   { callSetterOnInitialize: true }
     * ); // then we see { value: 123 } in console immediately
     */
    callSetterOnInitialize?: boolean;
    /**
     * Invoke `setValidValue` when value-getter that passed as first argument changes its underlying value.
     * Вызывать `setValidValue` при каждом изменении результата функции-геттера из первого аргумента.
     * @default false
     * @example
     * const model = observable({ value: 123 });
     * new FormControl(
     *   () => model.value,
     *   [],
     *   value => { console.log({ value }); },
     *   { callSetterOnReinitialize: true }
     * );
     * model.value = 456; // then we see { value: 456 } in console
     */
    callSetterOnReinitialize?: boolean;
    /**
     * Apply model field changes to FormControl value changes.
     * Применять изменения поля модели к полю формы.
     * @default true
     */
    reflectModelChanges?: boolean;
}
export declare class FormControl<TEntity = string, TAdditionalData = any> extends FormAbstractControl {
    private reactionOnValueGetterDisposer;
    private reactionOnInternalValueDisposer;
    private readonly reactionOnIsActiveDisposer;
    private readonly reactionOnIsDirtyDisposer;
    private readonly reactionOnIsFocusedDisposer;
    private readonly validators;
    private readonly setValidValue;
    private readonly callSetterOnInitialize;
    private readonly callSetterOnReinitialize;
    readonly type: ControlTypes;
    private isInitializedValue;
    private isInitializedActived;
    private readonly isInitialized;
    private internalValue;
    readonly processing: boolean;
    value: TEntity;
    readonly invalid: boolean;
    readonly valid: boolean;
    private isDirty;
    readonly pristine: boolean;
    readonly dirty: boolean;
    private isTouched;
    readonly untouched: boolean;
    readonly touched: boolean;
    private isFocused;
    readonly focused: boolean;
    additionalData: TAdditionalData | null;
    static for<M extends Object, K extends keyof M, TAdditionalData = any>(
    /**
     * Model object containing the editable field
     * Объект модели, содержащий редактируемое поле
     */
    model: M, 
    /**
     * Field name of the model to edit
     * Имя редактируемого поля модели
     */
    fieldName: K, 
    /**
     * Validations
     * Валидациии
     */
    validators?: ValidatorFunctionFormControlHandler<M[K]>[] | Options<M[K], TAdditionalData>, 
    /**
     * Options
     * Опции
     */
    modelOptions?: Options<M[K], TAdditionalData>): FormControl<M[K], TAdditionalData>;
    constructor(
    /**
     * Initializing valueI
     * / Инициализирующие значение или его getter
     */
    valueOrGetter: TEntity | (() => TEntity), 
    /**
     * Validators
     * / Валидаторы
     */
    validators?: ValidatorFunctionFormControlHandler<TEntity>[] | Options<TEntity, TAdditionalData>, 
    /**
     * Callback get last valid value
     * / Передает последние валидное значение
     */
    setValidValue?: UpdateValidValueHandler<TEntity> | Options<TEntity, TAdditionalData> | null, 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | Options<TEntity, TAdditionalData> | null, 
    /**
     * Additional information
     * / Блок с дополнительной информацией
     */
    additionalData?: TAdditionalData | null);
    setInitialValue: (valueOrGetter: TEntity | (() => TEntity)) => this;
    executeAsyncValidation: (validator: (control: this) => Promise<ValidationEvent[]>) => Promise<ValidationEvent[]>;
    runInAction: <TData = void>(action: () => Promise<TData>) => Promise<TData>;
    error: (key: string) => ValidationEvent | undefined;
    setValue: (value: TEntity) => this;
    setDirty: (dirty: boolean) => this;
    setTouched: (touched: boolean) => this;
    setFocused: (focused: boolean) => this;
    dispose: () => void;
    private checkInternalValue;
}
export {};
