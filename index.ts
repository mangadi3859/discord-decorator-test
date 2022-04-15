//Lib
import * as Discord from "discord.js";
import { config as env } from "dotenv";
import * as Config from "./config/config.json";
import { IBotConfig, ICommand } from "./utils/interfaces";
import * as Events from "./Events";
import loadCommands from "./utils/cmdHandler";

//Constants
env();
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
export const bot: IBotConfig = {
    commands: new Map<string, ICommand>(),
    aliases: new Map<string, ICommand>(),
    config: Config,
};

//Loading all commands
loadCommands();

//Events
Events.onReady(client);
Events.onMessage(client);

client.login(process.env.BOT_TOKEN);
