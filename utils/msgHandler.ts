import { Message, Client, MessageEmbed } from "discord.js";
import { bot as botConf } from "..";
import { prefix as PREFIX } from "../config/config.json";
import humanizeDuration from "humanize-duration";
import { ICommand } from "./interfaces";
import * as cooldown from "../lib/cooldown";
import * as deleteButton from "./deleteButton";

export default async function (bot: Client, message: Message<boolean>): Promise<void> {
    const msg = message.content?.trim() ?? "";
    if (!msg) return;

    let args = msg.split(/ +/g);
    let _cmd = <string>args.shift()?.toLowerCase() || "";
    let cmd = _cmd.substring(PREFIX.length);
    let prefix = _cmd.substring(0, PREFIX.length);
    let cmdFile = <ICommand>(botConf.commands.get(cmd) || botConf.aliases.get(cmd));

    // console.log(message.author.bot, message.guild?.id, prefix, cmd, cmdFile);
    if (message.author.bot) return;
    if (!message.guild?.id) return;
    if (prefix !== PREFIX) return;
    if (!cmdFile) return;

    let cd = cooldown.getCooldown(`${message.author.id}_${cmdFile.config.name}`);

    // message.guild.members.cache.get(message.author.id)?.permissions.has("");

    if (cd) {
        let time = humanizeDuration(cd - Date.now(), {});
        let btn = deleteButton.makeButton();
        return message.reply({ components: [btn], content: `\`❌\` | You have to wait another **${time}** to use this command again.` }).then(async (r) => {
            deleteButton.awaitButton(r);
        });
    }

    await cmdFile
        .run(bot, message, args)
        .then(() => {
            cooldown.addCooldown(`${message.author.id}_${cmdFile.config.name}`, cmdFile.config.cooldown ?? 0);
        })
        .catch((err) => {
            let embed = new MessageEmbed();
            let row = deleteButton.makeButton();
            embed
                .setAuthor({ name: <string>bot.user?.username, iconURL: <string>bot.user?.avatarURL() })
                .setTitle("Unexpected Error")
                .setColor("#FF0000")
                .setDescription("`Unexpected` Error has been occured")
                .addField("Stack", `\`\`\`${err.toString()}\`\`\``)
                .setTimestamp();

            console.error(err);
            message.channel.send({ embeds: [embed], components: [row] }).then((after) => {
                deleteButton.awaitButton(after);
            });
        });
}
