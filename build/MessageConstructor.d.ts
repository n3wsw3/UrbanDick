import { MessageEmbed } from "discord.js";
import { UrbanDicPost } from "./urbanAPI";
export declare function CreateEmbedded(post: UrbanDicPost): MessageEmbed;
export declare function LinkedWords(str: string): string[];
export declare function ReplaceLinkedWords(str: string): string;
