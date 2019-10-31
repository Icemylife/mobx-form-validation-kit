import { ValidationEvent } from './validation-event';
export declare const noop: () => void;
export declare const identity: <T = any>(arg: T) => T;
export declare const combineErrors: (groutErrors: ValidationEvent[][]) => ValidationEvent[];
