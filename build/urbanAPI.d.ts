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
export declare function GetTermString(termstring: string): string;
export declare function GetDefinition(termstring: string): Promise<UrbanDicResult>;
export declare function GetLink(termstring: string): string;
export declare function GetRandomDefinition(): Promise<UrbanDicResult>;
