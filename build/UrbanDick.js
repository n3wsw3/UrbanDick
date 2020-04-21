"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_1 = require("@typeit/discord");
const discord_js_1 = require("discord.js");
const urbanAPI_1 = require("./urbanAPI");
const MessageConstructor = require("./MessageConstructor");
let UrbanDick = class UrbanDick {
    static start(token) {
        this._client = new discord_1.Client();
        this._client.login(token);
    }
    onDefine(message, client) {
        let paramString = message.params.join(" ");
        // console.log(`${message.author.username}: ${paramString}`);
        urbanAPI_1.GetDefinition(paramString).then((data) => {
            // Ensure there is a definition for the word
            // If the list is empty there are no definitions.
            if (data.list.length) {
                let embed = MessageConstructor.CreateEmbedded(data.list[0]);
                message.channel.send({ embed });
            }
            else {
                // There is no definition for the word(s)
                let embed = new discord_js_1.MessageEmbed().setTitle(`There is no definition for ${paramString}`);
                message.channel.send({ embed });
            }
        });
    }
    onRoder(message, client) {
        urbanAPI_1.GetDefinition("roder").then((data) => {
            let embed = MessageConstructor.CreateEmbedded(data.list[0]);
            message.channel.send({ embed });
        });
    }
    onRandom(message, client) {
        urbanAPI_1.GetRandomDefinition().then((data) => {
            // There should always be something in the list property.
            // But uncaught errors are not fun
            // If it didn't return anything, fuck it. The user doesn't need this anyways.
            if (data.list.length) {
                let embed = MessageConstructor.CreateEmbedded(data.list[0]);
                message.channel.send({ embed });
            }
        });
    }
    onHelp(message, client) {
        let commands = discord_1.Client.getCommands();
        let embed = new discord_js_1.MessageEmbed()
            .setColor(6855505)
            .setTitle("Commands")
            .setDescription("Lists all available commands");
        for (let command of commands) {
            embed.addField(`__**${command.commandName}**__`, `${command.description} 
         **Usage:** ${command.infos.usage}`);
        }
        message.channel.send({ embed });
    }
};
tslib_1.__decorate([
    discord_1.Command("define", {
        description: "Returns the first result from Urban Dictionary",
        infos: {
            usage: "!define <search term>",
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, discord_1.Client]),
    tslib_1.__metadata("design:returntype", void 0)
], UrbanDick.prototype, "onDefine", null);
tslib_1.__decorate([
    discord_1.Command("roder", {
        description: "Returns the definition of roder. (It is too beautiful to not have it's own command)",
        infos: {
            usage: "!roder",
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, discord_1.Client]),
    tslib_1.__metadata("design:returntype", void 0)
], UrbanDick.prototype, "onRoder", null);
tslib_1.__decorate([
    discord_1.Command("random", {
        description: "Returns a random definition from Urban Dictionary",
        infos: {
            usage: "!random",
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, discord_1.Client]),
    tslib_1.__metadata("design:returntype", void 0)
], UrbanDick.prototype, "onRandom", null);
tslib_1.__decorate([
    discord_1.Command("help", {
        description: "Lists all commands",
        infos: {
            usage: "!help",
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, discord_1.Client]),
    tslib_1.__metadata("design:returntype", void 0)
], UrbanDick.prototype, "onHelp", null);
UrbanDick = tslib_1.__decorate([
    discord_1.Discord({ prefix: "!" })
], UrbanDick);
function run(token) {
    UrbanDick.start(token);
}
exports.run = run;
