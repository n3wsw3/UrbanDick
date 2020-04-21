import { MessageEmbed } from "discord.js";
import { UrbanDicPost, GetLink } from "./urbanAPI";

export function CreateEmbedded(post: UrbanDicPost): MessageEmbed {
  return (
    new MessageEmbed()
      // Trevlig grön färg
      .setColor(6855505)
      .setTitle(post.word)
      .setDescription(ReplaceLinkedWords(post.definition))
      .setURL(post.permalink)
      .setTimestamp(new Date(post.written_on))
      .setAuthor(post.author)
      .addField("Examples", ReplaceLinkedWords(post.example))
  );
}

export function LinkedWords(str: string) {
  // If str.match doesn't find anything it returns null
  // instead of just an empty array (which would make much more sense).
  // So it the first part is falsy just return an empty array.
  let temp = (str.match(/\[(.*?)\]/g) as Array<string>) || [];
  return temp;
}

export function ReplaceLinkedWords(str: string) {
  let words = LinkedWords(str);
  if (!words) return str;
  for (let word of words) {
    let justWord = word.slice(1, word.length - 1);
    // Byter yt [ord] mot [ord](Länk till ord)
    // word = [ord], justWord = ord
    str = str.replace(word, `${word}(${GetLink(justWord)})`);
  }

  return str;
}
