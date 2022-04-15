//Default
import { ICommand } from "../../utils/interfaces";
import { Client, Message } from "discord.js";
// import * as Decorators from "../../utils/decorators";
// import * as conf from "../../config/config.json";

//Lib

class Command implements ICommand {
    public readonly config: ICommand["config"] = {
        name: "ping",
        usage: "<prefix>ping",
        aliases: ["p"],
        description: "Ping me.",
        cooldown: 1000,
        disabled: false,
        example: "",
        permissions: ["EVERYONE"],
    };

    async run(bot: Client, msg: Message, args: string[]): Promise<any> {
        msg.channel.send("Pong");
    }
}

export default new Command();
