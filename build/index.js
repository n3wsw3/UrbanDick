"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const logger_1 = require("./logger");
require("dotenv").config();
require("./UrbanDick").run(process.env.TOKEN, logger_1.DebugLevel.Debug);
