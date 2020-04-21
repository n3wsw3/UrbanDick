import { Discord, Command, CommandMessage, Client } from "@typeit/discord";
import { MessageEmbed, TextChannel } from "discord.js";
import { GetDefinition, GetRandomDefinition, UrbanDicResult } from "./urbanAPI";
import * as MessageConstructor from "./MessageConstructor";
import { DebugLevel, Logger } from "./logger";
import { AxiosError } from "axios";

interface Infos {
  usage: string;
}

@Discord({ prefix: "!" })
abstract class UrbanDick {
  private static _client: Client;

  static start(token: string, debugLevel: DebugLevel = DebugLevel.Warn) {
    this._client = new Client();
    this._client.login(token);

    Logger.Get().SetLogLevel(debugLevel);
  }

  @Command("define", {
    description: "Returns the first result from Urban Dictionary",
    infos: {
      usage: "!define <search term>",
    },
  })
  private onDefine(message: CommandMessage, client: Client) {
    Logger.Get().Trace("OnDefine");

    let paramString = message.params.join(" ");
    Logger.Get().Debug(
      `${message.author.username} requested '${paramString}' in ${
        message.channel.type == "text"
          ? "channel " + (message.channel as TextChannel).name
          : "DMs"
      }`
    );
    GetDefinition(paramString)
      .then((data: UrbanDicResult) => {
        // Ensure there is a definition for the word
        // If the list is empty there are no definitions.
        if (data.list.length) {
          let embed = MessageConstructor.CreateEmbedded(data.list[0]);
          sendToChannel(message, { embed });
        } else {
          // There is no definition for the word(s)
          let embed: MessageEmbed = new MessageEmbed().setTitle(
            `There is no definition for ${paramString}`
          );
          sendToChannel(message, { embed });
        }
      })
      .catch((err: AxiosError) => {
        sendToChannel(message, "Error connecting to Urban Dictionary");
      });
  }
  @Command("roder", {
    description:
      "Returns the definition of roder. (It is too beautiful to not have it's own command)",
    infos: {
      usage: "!roder",
    },
  })
  private onRoder(message: CommandMessage, client: Client) {
    Logger.Get().Trace("OnRoder");
    Logger.Get().Debug(
      `${message.author.username} requested 'roder' in ${
        message.channel.type == "text"
          ? "channel " + (message.channel as TextChannel).name
          : "DMs"
      }`
    );
    GetDefinition("roder")
      .then((data: UrbanDicResult) => {
        let embed = MessageConstructor.CreateEmbedded(data.list[0]);
        sendToChannel(message, { embed });
      })
      .catch((err: AxiosError) => {
        sendToChannel(message, err.message);
      });
  }

  @Command("random", {
    description: "Returns a random definition from Urban Dictionary",
    infos: {
      usage: "!random",
    },
  })
  private onRandom(message: CommandMessage, client: Client) {
    Logger.Get().Trace("OnRandom");
    Logger.Get().Debug(
      `${message.author.username} requested a random definition in ${
        message.channel.type == "text"
          ? "channel " + (message.channel as TextChannel).name
          : "DMs"
      }`
    );
    GetRandomDefinition()
      .then((data: UrbanDicResult) => {
        // There should always be something in the list property.
        // But uncaught errors are not fun
        // If it didn't return anything, fuck it. The user doesn't need this anyways.
        if (data.list.length) {
          let embed = MessageConstructor.CreateEmbedded(data.list[0]);
          sendToChannel(message, { embed });
        }
      })
      .catch((err: AxiosError) => {
        sendToChannel(message, "Error connecting to Urban Dictionary");
      });
  }

  @Command("help", {
    description: "Lists all commands",
    infos: {
      usage: "!help",
    },
  })
  private onHelp(message: CommandMessage, client: Client) {
    Logger.Get().Trace("OnHelp");
    Logger.Get().Debug(
      `${message.author.username} requested 'help' in ${
        message.channel.type == "text"
          ? "channel " + (message.channel as TextChannel).name
          : "DMs"
      }`
    );
    let commands = Client.getCommands<Infos>();
    let embed = new MessageEmbed()
      .setColor(6855505)
      .setTitle("Commands")
      .setDescription("Lists all available commands");
    for (let command of commands) {
      embed.addField(
        `__**${command.commandName}**__`,
        `${command.description} 
         **Usage:** ${command.infos.usage}`
      );
    }
    sendToChannel(message, { embed });
  }
}

export function run(token: string, debugLevel: DebugLevel): void {
  UrbanDick.start(token, debugLevel);
}

function sendToChannel(message: CommandMessage, sendee: Object | string) {
  message.channel
    .send(sendee)
    .then((resp) => {
      Logger.Get().Trace("Message Sent Successfully");
    })
    .catch((err) => {
      Logger.Get().Error("Message Failed To Send", err);
    });
}

export { DebugLevel };
