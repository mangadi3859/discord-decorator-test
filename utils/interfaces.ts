import * as botConfig from "../config/config.json";
import { Client, Message, PermissionResolvable } from "discord.js";

type Permission = PermissionResolvable | "EVERYONE" | "DEVELOPER_ONLY" | "NSFW_ONLY";

export interface ICommandConfig {
    name: string;
    description: string;
    aliases: string[];
    usage: string;
    cooldown?: number;
    example?: string;
    permissions?: Permission[];
    disabled?: boolean;
}

export interface ICommand {
    config: ICommandConfig;
    run(bot: Client, msg: Message<boolean>, args: string[]): Promise<any>;
}

export interface IBotConfig {
    commands: Map<string, ICommand>;
    aliases: Map<string, ICommand>;
    config: typeof botConfig;
}
