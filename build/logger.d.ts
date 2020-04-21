export declare enum DebugLevel {
    Trace = 0,
    Debug = 1,
    Warn = 2,
    Error = 3,
    None = 4
}
export declare class Logger {
    private static Logger;
    private _logger;
    private _logLevel;
    constructor(name?: string, logLevel?: DebugLevel);
    static Get(): Logger;
    SetLogLevel(logLevel: DebugLevel): void;
    Trace(...message: string[]): void;
    Debug(...message: string[]): void;
    Warn(...message: string[]): void;
    Error(...message: string[]): void;
}
