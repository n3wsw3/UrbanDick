"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const urbanAPI_1 = require("./urbanAPI");
function CreateEmbedded(post) {
    return (new discord_js_1.MessageEmbed()
        // Trevlig grön färg
        .setColor(6855505)
        .setTitle(post.word)
        .setDescription(ReplaceLinkedWords(post.definition))
        .setURL(post.permalink)
        .setTimestamp(new Date(post.written_on))
        .setAuthor(post.author)
        .addField("Examples", ReplaceLinkedWords(post.example)));
}
exports.CreateEmbedded = CreateEmbedded;
function LinkedWords(str) {
    // If str.match doesn't find anything it returns null
    // instead of just an empty array (which would make much more sense).
    // So it the first part is falsy just return an empty array.
    let temp = str.match(/\[(.*?)\]/g) || [];
    return temp;
}
exports.LinkedWords = LinkedWords;
function ReplaceLinkedWords(str) {
    let words = LinkedWords(str);
    if (!words)
        return str;
    for (let word of words) {
        let justWord = word.slice(1, word.length - 1);
        // Byter yt [ord] mot [ord](Länk till ord)
        // word = [ord], justWord = ord
        str = str.replace(word, `${word}(${urbanAPI_1.GetLink(justWord)})`);
    }
    return str;
}
exports.ReplaceLinkedWords = ReplaceLinkedWords;
