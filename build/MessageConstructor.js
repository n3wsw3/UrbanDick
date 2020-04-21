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
    return str.match(/\[(.*?)\]/g);
}
exports.LinkedWords = LinkedWords;
function ReplaceLinkedWords(str) {
    let words = LinkedWords(str);
    for (let word of words) {
        let justWord = word.slice(1, word.length - 1);
        // Byter yt [ord] mot [ord](Länk till ord)
        // word = [ord], justWord = ord
        str = str.replace(word, `${word}(${urbanAPI_1.GetLink(justWord)})`);
    }
    return str;
}
exports.ReplaceLinkedWords = ReplaceLinkedWords;
