"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("logging");
var DebugLevel;
(function (DebugLevel) {
    DebugLevel[DebugLevel["Trace"] = 0] = "Trace";
    DebugLevel[DebugLevel["Debug"] = 1] = "Debug";
    DebugLevel[DebugLevel["Warn"] = 2] = "Warn";
    DebugLevel[DebugLevel["Error"] = 3] = "Error";
    DebugLevel[DebugLevel["None"] = 4] = "None";
})(DebugLevel = exports.DebugLevel || (exports.DebugLevel = {}));
class Logger {
    constructor(name = "UrbanLog", logLevel = DebugLevel.Warn) {
        this._logger = logging_1.default(name);
        this._logLevel = logLevel;
        this.Trace(`Logger Started at Level ${DebugLevel[logLevel]}`);
    }
    static Get() {
        if (!this.Logger)
            this.Logger = new Logger();
        return this.Logger;
    }
    SetLogLevel(logLevel) {
        // If changing log level to trace then output the change.
        if (logLevel == DebugLevel.Trace)
            this._logger.trace(`Changed Level to ${DebugLevel[logLevel]}`);
        this._logLevel = logLevel;
    }
    Trace(...message) {
        if (DebugLevel.Trace >= this._logLevel) {
            this._logger.trace(message);
        }
    }
    Debug(...message) {
        if (DebugLevel.Debug >= this._logLevel) {
            this._logger.info(message);
        }
    }
    Warn(...message) {
        if (DebugLevel.Debug >= this._logLevel) {
            this._logger.warn(message);
        }
    }
    Error(...message) {
        if (DebugLevel.Debug >= this._logLevel) {
            this._logger.error(message);
        }
    }
}
exports.Logger = Logger;
