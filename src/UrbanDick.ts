import { Discord, Command, CommandMessage, Client } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { GetDefinition, GetRandomDefinition } from "./urbanAPI";
import * as MessageConstructor from "./MessageConstructor";

interface Infos {
  usage: string;
}

@Discord({ prefix: "!" })
abstract class UrbanDick {
  private static _client: Client;

  static start(token: string) {
    this._client = new Client();
    this._client.login(token);
  }

  @Command("define", {
    description: "Returns the first result from Urban Dictionary",
    infos: {
      usage: "!define <search term>",
    },
  })
  private onDefine(message: CommandMessage, client: Client) {
    let paramString = message.params.join(" ");
    // console.log(`${message.author.username}: ${paramString}`);
    GetDefinition(paramString).then((data) => {
      // Ensure there is a definition for the word
      // If the list is empty there are no definitions.
      if (data.list.length) {
        let embed = MessageConstructor.CreateEmbedded(data.list[0]);
        message.channel.send({ embed });
      } else {
        // There is no definition for the word(s)
        let embed: MessageEmbed = new MessageEmbed().setTitle(
          `There is no definition for ${paramString}`
        );
        message.channel.send({ embed });
      }
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
    GetDefinition("roder").then((data) => {
      let embed = MessageConstructor.CreateEmbedded(data.list[0]);
      message.channel.send({ embed });
    });
  }

  @Command("random", {
    description: "Returns a random definition from Urban Dictionary",
    infos: {
      usage: "!random",
    },
  })
  private onRandom(message: CommandMessage, client: Client) {
    GetRandomDefinition().then((data) => {
      // There should always be something in the list property.
      // But uncaught errors are not fun
      // If it didn't return anything, fuck it. The user doesn't need this anyways.
      if (data.list.length) {
        let embed = MessageConstructor.CreateEmbedded(data.list[0]);
        message.channel.send({ embed });
      }
    });
  }

  @Command("help", {
    description: "Lists all commands",
    infos: {
      usage: "!help",
    },
  })
  private onHelp(message: CommandMessage, client: Client) {
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
    message.channel.send({ embed });
  }
}

export function run(token: string): void {
  UrbanDick.start(token);
}
