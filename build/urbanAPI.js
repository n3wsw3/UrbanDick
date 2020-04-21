"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
function GetTermString(termstring) {
    return termstring.split(" ").join("+");
}
exports.GetTermString = GetTermString;
function GetDefinition(termstring) {
    let terms = GetTermString(termstring);
    return axios_1.default
        .get(`http://api.urbandictionary.com/v0/define?term=${terms}`)
        .then((resp) => {
        let data = resp.data;
        return data;
    });
}
exports.GetDefinition = GetDefinition;
function GetLink(termstring) {
    let terms = GetTermString(termstring);
    return `https://www.urbandictionary.com/define.php?term=${terms}`;
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
