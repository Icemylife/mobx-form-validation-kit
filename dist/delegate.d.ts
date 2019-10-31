declare type Method = () => void;
export declare class Delegate {
    private funcs;
    add: (method: Method) => void;
    remove: (method: Method) => void;
    call: () => void;
    dispose: () => void;
}
export {};
