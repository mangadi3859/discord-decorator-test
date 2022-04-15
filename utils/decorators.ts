import { Client, Message, PermissionResolvable } from "discord.js";
import { owner } from "../config/config.json";

export function DevOnly(target: any, key: string | symbol, property: TypedPropertyDescriptor<any>) {
    let original: Function = property.value;

    property.value = function (bot: Client, msg: Message, args: string[]) {
        if (msg.author.id !== owner[0]) return msg.channel.send("You don't have permission to use this command");

        return <Promise<any>>original.apply(this, [bot, msg, args]);
    };

    return property;
}

export function AuthorPermission(permission: PermissionResolvable) {
    return function (target: any, key: string | symbol, property: TypedPropertyDescriptor<any>) {
        let original: Function = property.value;

        property.value = function (bot: Client, msg: Message, args: string[]) {
            if (!msg.guild?.members.cache.get(msg.author.id)?.permissions.has(permission)) return msg.channel.send(`You are lacking the permission of \`${permission}\`.`);

            return <Promise<any>>original.apply(this, [bot, msg, args]);
        };

        return property;
    };
}

export function BotPermission(permission: PermissionResolvable) {
    return function (target: any, key: string | symbol, property: TypedPropertyDescriptor<any>) {
        let original: Function = property.value;

        property.value = function (bot: Client, msg: Message, args: string[]) {
            if (msg.guild?.members.cache.get(msg.author.id)?.permissions.has(permission)) return msg.channel.send(`I don't have the permission of \`${permission}\`.`);

            return <Promise<any>>original.apply(this, [bot, msg, args]);
        };

        return property;
    };
}
