import axios from "axios";
const encodeUrl = require("encodeurl");

export interface UrbanDicResult {
  list: Array<UrbanDicPost>;
}

export interface UrbanDicPost {
  definition: string;
  permalink: string;
  thumbs_up: number;
  sound_urls: Array<string>;
  author: string;
  word: string;
  defid: number;
  current_vote: string;
  written_on: string;
  example: string;
  thumbs_down: number;
}

export function GetTermString(termstring: string) {
  return termstring.split(" ").join("+");
}

export function GetDefinition(termstring: string) {
  let terms: string = GetTermString(termstring);

  return axios
    .get(
      `http://api.urbandictionary.com/v0/define?term=${unicodeEscape(terms)}`
    )
    .then((resp) => {
      let data: UrbanDicResult = resp.data;
      return data;
    });
}

export function GetLink(termstring: string) {
  let terms: string = GetTermString(termstring);

  return `https://www.urbandictionary.com/define.php?term=${unicodeEscape(
    terms
  )}`;
}

export function GetRandomDefinition() {
  // Page is a random number between 0 and 10000 (I think. never actually tested this. It's fine. I promise)
  return axios
    .get(
      `https://api.urbandictionary.com/v0/random?page=${Math.round(
        Math.random() * 10000
      )}`
    )
    .then((resp) => {
      let data: UrbanDicResult = resp.data;
      return data;
    });
}

/**
 * Used to escape unicode characters, such as emojies.
 * Otherwise get requests will fail
 * @param str
 */
export function unicodeEscape(str: string) {
  let temp = encodeUrl(str);
  console.log(temp);
  return temp;
}
