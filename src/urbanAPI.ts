import axios, { AxiosError } from "axios";
import { Logger } from "./logger";

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
  Logger.Get().Trace("BEGIN GetDefinition");
  Logger.Get().Trace(`Searched Word: ${termstring}`);
  let terms: string = unicodeEscape(GetTermString(termstring));
  Logger.Get().Trace(`Escaped and url encoded: ${terms}`);

  return new Promise((resolve, reject) => {
    Logger.Get().Trace("BEFORE AXIOS");
    axios
      .get(`http://api.urbandictionary.com/v0/define?term=${terms}`)
      .then((resp) => {
        Logger.Get().Trace("RESPONSE FROM AXIOS");
        let data: UrbanDicResult = resp.data;
        resolve(data);
      })
      .catch((err: AxiosError) => {
        Logger.Get().Warn(`${err}`);
        reject(err);
      });
  });
}

export function GetLink(termstring: string) {
  let terms: string = GetTermString(termstring);

  return `https://www.urbandictionary.com/define.php?term=${unicodeEscape(
    terms
  )}`;
}

export function GetRandomDefinition() {
  Logger.Get().Trace("BEGIN GetRandomDefinition");
  // Page is a random number between 0 and 10000 (I think. never actually tested this. It's fine. I promise)
  return new Promise((resolve, reject) => {
    Logger.Get().Trace("BEFORE AXIOS");
    axios
      .get(
        `https://api.urbandictionary.com/v0/random?page=${Math.round(
          Math.random() * 10000
        )}`
      )
      .then((resp) => {
        Logger.Get().Trace("RESPONSE FROM AXIOS");
        let data: UrbanDicResult = resp.data;
        resolve(data);
      })
      .catch((err: AxiosError) => {
        Logger.Get().Warn(`${err}`);
        reject(err);
      });
  });
}

/**
 * Used to escape unicode characters, such as emojies.
 * Otherwise get requests will fail
 * @param str
 */
export function unicodeEscape(str: string): string {
  let temp = encodeUrl(str);
  // console.log(temp);
  return temp;
}
