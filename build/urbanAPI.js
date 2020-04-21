"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const logger_1 = require("./logger");
const encodeUrl = require("encodeurl");
function GetTermString(termstring) {
    return termstring.split(" ").join("+");
}
exports.GetTermString = GetTermString;
function GetDefinition(termstring) {
    logger_1.Logger.Get().Trace("BEGIN GetDefinition");
    logger_1.Logger.Get().Trace(`Searched Word: ${termstring}`);
    let terms = unicodeEscape(GetTermString(termstring));
    logger_1.Logger.Get().Trace(`Escaped and url encoded: ${terms}`);
    return new Promise((resolve, reject) => {
        logger_1.Logger.Get().Trace("BEFORE AXIOS");
        axios_1.default
            .get(`http://api.urbandictionary.com/v0/define?term=${terms}`)
            .then((resp) => {
            logger_1.Logger.Get().Trace("RESPONSE FROM AXIOS");
            let data = resp.data;
            resolve(data);
        })
            .catch((err) => {
            logger_1.Logger.Get().Warn(`${err}`);
            reject(err);
        });
    });
}
exports.GetDefinition = GetDefinition;
function GetLink(termstring) {
    let terms = GetTermString(termstring);
    return `https://www.urbandictionary.com/define.php?term=${unicodeEscape(terms)}`;
}
exports.GetLink = GetLink;
function GetRandomDefinition() {
    logger_1.Logger.Get().Trace("BEGIN GetRandomDefinition");
    // Page is a random number between 0 and 10000 (I think. never actually tested this. It's fine. I promise)
    return new Promise((resolve, reject) => {
        logger_1.Logger.Get().Trace("BEFORE AXIOS");
        axios_1.default
            .get(`https://api.urbandictionary.com/v0/random?page=${Math.round(Math.random() * 10000)}`)
            .then((resp) => {
            logger_1.Logger.Get().Trace("RESPONSE FROM AXIOS");
            let data = resp.data;
            resolve(data);
        })
            .catch((err) => {
            logger_1.Logger.Get().Warn(`${err}`);
            reject(err);
        });
    });
}
exports.GetRandomDefinition = GetRandomDefinition;
/**
 * Used to escape unicode characters, such as emojies.
 * Otherwise get requests will fail
 * @param str
 */
function unicodeEscape(str) {
    let temp = encodeUrl(str);
    // console.log(temp);
    return temp;
}
exports.unicodeEscape = unicodeEscape;
