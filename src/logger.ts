import createLogger from "logging";

export enum DebugLevel {
  Trace,
  Debug,
  Warn,
  Error,
  None,
}

export class Logger {
  private static Logger: Logger;
  private _logger;
  private _logLevel: DebugLevel;
  constructor(
    name: string = "UrbanLog",
    logLevel: DebugLevel = DebugLevel.Warn
  ) {
    this._logger = createLogger(name);
    this._logLevel = logLevel;

    this.Trace(`Logger Started at Level ${DebugLevel[logLevel]}`);
  }

  public static Get(): Logger {
    if (!this.Logger) this.Logger = new Logger();
    return this.Logger;
  }

  public SetLogLevel(logLevel: DebugLevel) {
    // If changing log level to trace then output the change.
    if (logLevel == DebugLevel.Trace)
      this._logger.trace(`Changed Level to ${DebugLevel[logLevel]}`);
    this._logLevel = logLevel;
  }

  public Trace(...message: string[]) {
    if (DebugLevel.Trace >= this._logLevel) {
      this._logger.trace(message);
    }
  }

  public Debug(...message: string[]) {
    if (DebugLevel.Debug >= this._logLevel) {
      this._logger.info(message);
    }
  }

  public Warn(...message: string[]) {
    if (DebugLevel.Debug >= this._logLevel) {
      this._logger.warn(message);
    }
  }

  public Error(...message: string[]) {
    if (DebugLevel.Debug >= this._logLevel) {
      this._logger.error(message);
    }
  }
}
