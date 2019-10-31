import { IReactionDisposer } from 'mobx';
import { Delegate } from './delegate';
import { ControlTypes } from './сontrol-types';
import { ValidationEvent } from './validation-event';
import { ValidationEventTypes } from './validation-event-types';
export declare abstract class AbstractControl {
    protected reactionOnValidatorDisposers: IReactionDisposer[];
    /**
     * Type
     * / Тип контрола
     */
    abstract type: ControlTypes;
    protected inProcessing: boolean;
    /**
     * Validation in progress
     * / В процессе анализа
     */
    abstract processing: boolean;
    private isActiveFunc;
    protected readonly isActive: boolean;
    /**
     * Error checking is disabled (control is always valid)
     * / Проверка ошибок отключена (контрол всегда валиден)
     */
    readonly disabled: boolean;
    /**
     * Error checking enabled
     * / Проверка ошибок включена
     */
    readonly active: boolean;
    /**
     * Invalid
     * / Невалидные данные
     */
    abstract invalid: boolean;
    /**
     * Valid
     * / Валидные данные
     */
    abstract valid: boolean;
    /**
     * The value has not changed
     * / Значение не изменялось
     */
    abstract pristine: boolean;
    /**
     * Value changed
     * / Значение изменялось
     */
    abstract dirty: boolean;
    /**
     * The field was out of focus
     * / Поле не было в фокусе
     */
    abstract untouched: boolean;
    /**
     * The field was in focus
     * / Поле было в фокусе
     */
    abstract touched: boolean;
    /**
     * The field is now in focus
     * / Поле сейчас в фокусе
     */
    abstract focused: boolean;
    /**
     * The field contains errors
     * / Поле содержит ошибки
     */
    errors: ValidationEvent[];
    hasErrors(): boolean;
    /**
     * The field contains warnings
     * / Сообщения "Внимание"
     */
    warnings: ValidationEvent[];
    hasWarnings(): boolean;
    /**
     * The field contains information messages
     * / Сообщения "Информационные сообщения"
     */
    informationMessages: ValidationEvent[];
    hasInformationMessages(): boolean;
    /**
     * The field contains successes messages
     * / Сообщения об удовлетворении необязательных условий валидации
     */
    successes: ValidationEvent[];
    hasSuccesses(): boolean;
    /**
     * Current message display level
     * / Текущий уровень отображения сообщении
     */
    readonly maxEventLevel: ValidationEventTypes;
    private _serverErrors;
    /**
     * Additional (server) errors
     * / Дополнительтные (серверные) ошибки
     */
    /**
    * Additional (server) errors
    * / Пополнительтные (серверные) ошибки
    */
    serverErrors: string[];
    /**
     * Callback function of on change
     * / Сообщает факт изменения данных
     */
    onChange: Delegate;
    /**
     * Set marker "value changed"
     * / Устанавливает значение измения данных
     */
    abstract setDirty(dirty: boolean): this;
    /**
     * Set marker "field was out of focus"
     * / Устанавливает значение фокуса
     */
    abstract setTouched(touched: boolean): this;
    /**
     * Dispose (call in unmount react control)
     * / Вызвать при удалении контрола
     */
    abstract dispose(): void;
    private newRequestValidation;
    constructor(
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | null);
    private lastValidators;
    private lastValidationFunction;
    protected onValidation: (validators: ((control: any) => Promise<ValidationEvent[]>)[], onValidationFunction: () => void, afterCheck: () => void) => Promise<void>;
    protected baseDispose: () => void;
    abstract executeAsyncValidation(validator: (control: this) => Promise<ValidationEvent[]>): Promise<ValidationEvent[]>;
    protected baseExecuteAsyncValidation: (validator: (control: this) => Promise<ValidationEvent[]>, onValidationFunction: () => void) => Promise<ValidationEvent[]>;
}
