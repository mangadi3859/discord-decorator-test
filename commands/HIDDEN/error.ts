//Default
import { ICommand } from "../../utils/interfaces";
import { Client, Message } from "discord.js";
import * as Decorators from "../../utils/decorators";
import { prefix } from "../../config/config.json";

//Lib

class IntensionalError extends Error {
    name = "IntensionalError";
}

class Command implements ICommand {
    public readonly config: ICommand["config"] = {
        name: "error",
        usage: "<prefix>error",
        aliases: ["err"],
        description: "Make an error test",
        cooldown: 1000,
        disabled: false,
        example: "",
        permissions: ["DEVELOPER_ONLY"],
    };

    @Decorators.DevOnly
    async run(bot: Client, msg: Message, args: string[]): Promise<any> {
        throw new IntensionalError(`Error cause by using \`${prefix}error\` command`);
    }
}

export default new Command();
