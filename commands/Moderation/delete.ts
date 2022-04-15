//Default
import { ICommand } from "../../utils/interfaces";
import { Client, Message } from "discord.js";
import * as Decorators from "../../utils/decorators";
// import * as conf from "../../config/config.json";

//Lib

class Command implements ICommand {
    public readonly config: ICommand["config"] = {
        name: "delete",
        usage: "<prefix>delete (amount)",
        aliases: ["purge", "del"],
        description: "Delete messages",
        cooldown: 5000,
        disabled: false,
        example: "<prefix>del 10",
        permissions: ["MANAGE_MESSAGES"],
    };

    @Decorators.AuthorPermission("MANAGE_MESSAGES")
    @Decorators.BotPermission("MANAGE_MESSAGES")
    async run(bot: Client, msg: Message, args: string[]): Promise<any> {
        
        let amount = parseInt(args[0]) || 1
    
    if(amount < 1) return msg.channel.send('The value must greater than `zero`')
    msg.delete()
    msg.channel.bulkDelete(amount).then(() => {
        let embed = new Discord.MessageEmbed()
        .setTitle('**Clear Message**')
        .setDescription(`**${amount} message(s) has been deleted.**`)
        .setColor("#00FFFF")
        .setTimestamp()

        return msg.channel.send({embeds: [embed]}).then(msgs => msgs.delete({timeout: 6000}))
    });
    }
}

export default new Command();
