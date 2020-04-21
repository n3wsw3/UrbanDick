"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UrbanDick_1 = require("./UrbanDick");
require("dotenv").config();
require("./UrbanDick").run(process.env.TOKEN, UrbanDick_1.DebugLevel.Debug);
