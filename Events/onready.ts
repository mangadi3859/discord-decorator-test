import { Client } from "discord.js";

export default function (bot: Client): void {
    bot.once("ready", async (message) => {
        console.log("Bot is ready!");
    });
}
