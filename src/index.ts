import "reflect-metadata";
import { DebugLevel } from "./UrbanDick";
require("dotenv").config();
require("./UrbanDick").run(process.env.TOKEN, DebugLevel.Debug);
