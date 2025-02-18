import { action, computed, IReactionDisposer, observable, reaction, runInAction } from 'mobx';
import { Delegate } from './delegate';
import { ControlTypes } from './сontrol-types';
import { ValidationEvent } from './validation-event';
import { ValidationEventTypes } from './validation-event-types';
import { combineErrors, noop } from './utilites';

export abstract class AbstractControl {
  protected reactionOnValidatorDisposers: IReactionDisposer[] = [];
  /**
   * Type
   * / Тип контрола
   */
  abstract type: ControlTypes;
  @observable
  protected inProcessing: boolean;
  /**
   * Validation in progress
   * / В процессе анализа
   */
  abstract processing: boolean;
  private isActiveFunc: () => boolean;
  @computed
  protected get isActive() {
    return this.isActiveFunc();
  }
  /**
   * Error checking is disabled (control is always valid)
   * / Проверка ошибок отключена (контрол всегда валиден)
   */
  @computed get disabled(): boolean {
    return !this.isActive;
  }
  /**
   * Error checking enabled
   * / Проверка ошибок включена
   */
  @computed get active(): boolean {
    return this.isActive;
  }
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
  @observable.ref
  public errors: ValidationEvent[] = [];
  public hasErrors() {
    return (!!this.errors && this.errors.length > 0) || (!!this._serverErrors && this._serverErrors.length > 0);
  }
  /**
   * The field contains warnings
   * / Сообщения "Внимание"
   */
  @observable.ref
  public warnings: ValidationEvent[] = [];
  public hasWarnings() {
    return !!this.warnings && this.warnings.length > 0;
  }
  /**
   * The field contains information messages
   * / Сообщения "Информационные сообщения"
   */
  @observable.ref
  public informationMessages: ValidationEvent[] = [];
  public hasInformationMessages() {
    return !!this.informationMessages && this.informationMessages.length > 0;
  }
  /**
   * The field contains successes messages
   * / Сообщения об удовлетворении необязательных условий валидации
   */
  @observable.ref
  public successes: ValidationEvent[] = [];
  public hasSuccesses() {
    return !!this.successes && this.successes.length > 0;
  }
  /**
   * Current message display level
   * / Текущий уровень отображения сообщении
   */
  @computed get maxEventLevel(): ValidationEventTypes {
    if (this.hasErrors()) return ValidationEventTypes.Error;
    if (this.hasWarnings()) return ValidationEventTypes.Warning;
    if (this.hasInformationMessages()) return ValidationEventTypes.Info;
    return ValidationEventTypes.Success;
  }
  @observable
  private _serverErrors: string[] = [];
  /**
   * Additional (server) errors
   * / Дополнительтные (серверные) ошибки
   */
  @computed
  public get serverErrors(): string[] {
    return this._serverErrors;
  }
  /**
   * Additional (server) errors
   * / Пополнительтные (серверные) ошибки
   */
  public set serverErrors(value: string[]) {
    this._serverErrors = value || [];
  }
  /**
   * Callback function of on change
   * / Сообщает факт изменения данных
   */
  public onChange: Delegate = new Delegate();
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
  private newRequestValidation: number = 0;
  constructor(
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate: (() => boolean) | null = null,
  ) {
    this.inProcessing = false;
    this.isActiveFunc = activate === null ? () => true : activate;
  }

  private lastValidators: ((control: any) => Promise<ValidationEvent[]>)[] = [];
  private lastValidationFunction: () => void = noop;
  @action
  protected onValidation = async (
    validators: ((control: any) => Promise<ValidationEvent[]>)[],
    onValidationFunction: () => void,
    afterCheck: () => void,
  ): Promise<void> => {
    const haveRequestValidation: boolean = this.newRequestValidation !== 0;
    // tslint:disable-next-line: no-increment-decrement
    this.newRequestValidation++;
    this.lastValidators = validators;
    this.lastValidationFunction = onValidationFunction;
    if (haveRequestValidation) {
      return;
    }
    let groupErrors: ValidationEvent[][];
    let oldRequestValidation = 0;
    do {
      oldRequestValidation = this.newRequestValidation;
      this.reactionOnValidatorDisposers.forEach(r => r());
      this.reactionOnValidatorDisposers = [];
      if (this.active) {
        const errorsPromises = this.lastValidators.map(validator => {
          let isFirstReaction = true;
          return new Promise<ValidationEvent[]>(resolve =>
            this.reactionOnValidatorDisposers.push(
              reaction(() => {
                let result;
                if (isFirstReaction) {
                  result = validator(this).then(resolve);
                }
                isFirstReaction = false;
                return result;
              }, this.lastValidationFunction),
            ),
          );
        });
        groupErrors = await Promise.all(errorsPromises);
      } else {
        groupErrors = [];
      }
    } while (oldRequestValidation !== this.newRequestValidation);
    this.newRequestValidation = 0;
    const events = groupErrors && groupErrors.length > 0 ? combineErrors(groupErrors) : [];
    return runInAction(() => {
      this.errors = events.filter(e => e.type === ValidationEventTypes.Error);
      this.warnings = events.filter(e => e.type === ValidationEventTypes.Warning);
      this.informationMessages = events.filter(e => e.type === ValidationEventTypes.Info);
      this.successes = events.filter(e => e.type === ValidationEventTypes.Success);

      afterCheck();
    });
  };

  protected baseDispose = (): void => {
    this.onChange.dispose();
    for (const reactionOnValidator of this.reactionOnValidatorDisposers) {
      reactionOnValidator();
    }
  };

  public abstract executeAsyncValidation(validator: (control: this) => Promise<ValidationEvent[]>): Promise<ValidationEvent[]>;

  protected baseExecuteAsyncValidation = (
    validator: (control: this) => Promise<ValidationEvent[]>,
    onValidationFunction: () => void,
  ): Promise<ValidationEvent[]> => {
    let isFirstReaction = true;
    return new Promise<ValidationEvent[]>(resolve =>
      this.reactionOnValidatorDisposers.push(
        reaction(() => {
          let result;
          if (isFirstReaction) {
            result = validator(this).then(resolve);
          }
          isFirstReaction = false;
          return result;
        }, onValidationFunction),
      ),
    );
  };
}
