import { AbstractControl } from './abstract-control';
import { FormControl } from './form-control';
import { ValidatorFunctionFormControlHandler } from './events';
import { ValidationEventTypes } from './validation-event-types';
import { ValidationEvent } from './validation-event';
export declare const requiredValidator = "required";
export declare const required: <TEntity>(message?: string, eventType?: ValidationEventTypes) => (control: FormControl<TEntity, any>) => Promise<ValidationEvent[]>;
export declare const notEmptyOrSpacesValidator = "notEmptyOrSpaces";
export declare const notEmptyOrSpaces: (message?: string, eventType?: ValidationEventTypes) => (control: FormControl<string, any>) => Promise<ValidationEvent[]>;
export declare const patternValidator = "pattern";
/**
 * Error if there is no pattern matching
 * / Ошибка, если нет соответствия паттерну
 */
export declare const pattern: (regExp: RegExp, message?: string, eventType?: ValidationEventTypes) => (control: FormControl<string, any>) => Promise<ValidationEvent[]>;
/**
 * Error if there is a pattern match
 * / Ошибка, если есть соответствие паттерну
 */
export declare const invertPattern: (regExp: RegExp, message?: string, eventType?: ValidationEventTypes) => (control: FormControl<string, any>) => Promise<ValidationEvent[]>;
export declare const minLengthValidator = "minlength";
export declare const minLength: (minlength: number, message?: string, eventType?: ValidationEventTypes) => (control: FormControl<string, any>) => Promise<ValidationEvent[]>;
export declare const maxLengthValidator = "maxlength";
export declare const maxLength: (maxlength: number, message?: string, eventType?: ValidationEventTypes) => (control: FormControl<string, any>) => Promise<ValidationEvent[]>;
export declare const absoluteLengthValidator = "absoluteLength";
export declare const absoluteLength: (length: number, message?: string, eventType?: ValidationEventTypes) => (control: FormControl<string, any>) => Promise<ValidationEvent[]>;
export declare const minValueValidator = "minValue";
export declare const minValue: <TEntity extends number | Date>(min: TEntity | (() => TEntity), message?: string, eventType?: ValidationEventTypes) => (control: FormControl<TEntity, any>) => Promise<ValidationEvent[]>;
export declare const maxValueValidator = "minValue";
export declare const maxValue: <TEntity extends number | Date>(max: TEntity | (() => TEntity), message?: string, eventType?: ValidationEventTypes) => (control: FormControl<TEntity, any>) => Promise<ValidationEvent[]>;
export declare const notContainSpacesValidator = "notContainSpaces";
/**
 * Not contain spaces
 * / Не содержит проблелов
 */
export declare const notContainSpaces: (message?: string, eventType?: ValidationEventTypes) => (control: FormControl<string, any>) => Promise<ValidationEvent[]>;
export declare const compairValidator = "compair";
/**
 * Wrapper for complex validation (error if validation returns false)
 * / Обёртка для сложной проверки (ошибка, если проверка вернула false)
 */
export declare const compare: <TEntity>(expression: (value: TEntity) => boolean, message?: string, eventType?: ValidationEventTypes) => (control: FormControl<TEntity, any>) => Promise<ValidationEvent[]>;
export declare const isEqualValidator = "isEqual";
/**
 * Equals to {value}
 * / Равно значению {value}
 */
export declare const isEqual: (value: string, message?: string, eventType?: ValidationEventTypes) => (control: FormControl<string, any>) => Promise<ValidationEvent[]>;
/**
 * Runs validations only if activation conditions are met
 * / Запускает валидации только если условие активации выполнено
 */
export declare const wrapperActivateValidation: <TAbstractControl extends AbstractControl>(activate: () => boolean, validators: ((control: TAbstractControl) => Promise<ValidationEvent[]>)[], elseValidators?: ((control: TAbstractControl) => Promise<ValidationEvent[]>)[]) => (control: TAbstractControl) => Promise<ValidationEvent[]>;
/**
 * Wrapper for sequential validations (The next validation is launched only after the previous one passed without errors)
 * / Обертка для последовательных валидаций (Следующая валидация запускается, только после того, что предыдущая прошла без ошибок)
 */
export declare const wrapperSequentialCheck: <TEntity>(validators: ValidatorFunctionFormControlHandler<TEntity>[]) => (control: FormControl<TEntity, any>) => Promise<ValidationEvent[]>;
