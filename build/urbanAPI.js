"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const encodeurl_1 = require("encodeurl");
function GetTermString(termstring) {
    return termstring.split(" ").join("+");
}
exports.GetTermString = GetTermString;
function GetDefinition(termstring) {
    let terms = GetTermString(termstring);
    return axios_1.default
        .get(`http://api.urbandictionary.com/v0/define?term=${unicodeEscape(terms)}`)
        .then((resp) => {
        let data = resp.data;
        return data;
    });
}
exports.GetDefinition = GetDefinition;
function GetLink(termstring) {
    let terms = GetTermString(termstring);
    return `https://www.urbandictionary.com/define.php?term=${unicodeEscape(terms)}`;
}
exports.GetLink = GetLink;
function GetRandomDefinition() {
    // Page is a random number between 0 and 10000 (I think. never actually tested this. It's fine. I promise)
    return axios_1.default
        .get(`https://api.urbandictionary.com/v0/random?page=${Math.round(Math.random() * 10000)}`)
        .then((resp) => {
        let data = resp.data;
        return data;
    });
}
exports.GetRandomDefinition = GetRandomDefinition;
/**
 * Used to escape unicode characters, such as emojies.
 * Otherwise get requests will fail
 * @param str
 */
function unicodeEscape(str) {
    // let temp = str.replace(/[\s\S]/g, function (escape) {
    //   return "\\u" + ("0000" + escape.charCodeAt(0).toString(16)).slice(-4);
    // });
    let temp = encodeurl_1.default(str);
    console.log(temp);
    return temp;
}
exports.unicodeEscape = unicodeEscape;
