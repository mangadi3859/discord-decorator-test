//Default
import { ICommand } from "../../utils/interfaces";
import { Client, Message, MessageEmbed } from "discord.js";
// import * as Decorators from "../../utils/decorators";
import { prefix } from "../../config/config.json";

//Lib
import fs from "fs";

class Command implements ICommand {
    public readonly config: ICommand["config"] = {
        name: "help",
        usage: "<prefix>help (command)",
        aliases: ["how"],
        description: "See all the commands available.",
        cooldown: 10000,
        disabled: false,
        example: "<prefix>help ping",
        permissions: ["EVERYONE"],
    };

    async run(bot: Client, msg: Message, args: string[]): Promise<any> {
        let modules = {};
        let allFiles: typeof this.config[] = [];
        fs.readdirSync("./commands").forEach((dir) => {
            let files: typeof this.config[] = [];
            fs.readdirSync(`./commands/${dir}`)
                .filter((file) => file.endsWith(".ts"))
                .forEach((file) => {
                    let fileConfig = require(`../${dir}/${file}`).default.config;
                    files.push(fileConfig);
                    allFiles.push(fileConfig);
                });
            modules[dir] = files;
        });

        if (args.length < 1) {
            let embedHelp = new MessageEmbed()
                .setColor("#00ffff")
                .setTitle("**Command Help**")
                .setAuthor({ name: <string>bot.user?.username })
                .setThumbnail(<string>msg.author.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setDescription(`use \`${prefix}help <command name>\` to see more detail`);

            for (const file in modules) {
                if (file === "HIDDEN") continue;

                embedHelp.addField(`**${file} (${modules[file].length})**`, `\`${modules[file].map((e) => e.name).join("` | `") || "Not Available Yet :c"}\``);
            }

            return msg.channel.send({ embeds: [embedHelp] });
        }

        let arg = args[0].toLowerCase();
        let cmd = allFiles.find((c) => c.name === arg || c.aliases.includes(arg));

        if (!cmd) return msg.channel.send(`I cant't any command named \`${arg}\``);
        let embedHelp = new MessageEmbed()
            .setTitle("**Command Help**")
            .setAuthor({ name: msg.author.tag })
            .setColor("#00ffff")
            .setThumbnail(<string>msg.author.avatarURL({ dynamic: true }))
            .setDescription("This is all Information about " + `**__${cmd.name}__**\n\`<>\` = **Required**\n\`()\` = **Optional**`)
            .addField("**Description**", cmd.description || "Not Set")
            .addField("**Aliases**", cmd.aliases.length ? `\`${cmd.aliases.join("`, `")}\`` : "`Not Set`")
            .addField("**Usage**", `\`${cmd.usage.replace(/<prefix>/g, prefix)}\`` || "`Not Set`")
            .setFooter({ text: "Don't includes <> and ()" });

        if (cmd.example) embedHelp.addField("**Example**", `\`${cmd.example.replace(/<prefix>/g, prefix)}\`` || "`Not Set`");
        embedHelp.addField("**Permission**", `\`${cmd.permissions?.length ? cmd.permissions?.join("` `") : "EVERYONE"}\``);

        return msg.channel.send({ embeds: [embedHelp] });
    }
}

export default new Command();
