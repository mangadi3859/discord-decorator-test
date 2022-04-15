import { Client } from "discord.js";
import messageHandler from "../utils/msgHandler";

export default async function (bot: Client): Promise<void> {
    bot.on("messageCreate", async (message) => {
        // console.log(message.content);
        await messageHandler(bot, message);
    });
}
