import { MessageActionRow, MessageButton, Message } from "discord.js";

const CUSTOM_ID = "DELETE_BUTTON";

export function makeButton(): MessageActionRow {
    let action = new MessageActionRow();
    let button = new MessageButton();
    button.setCustomId(CUSTOM_ID).setEmoji("🚮").setStyle("DANGER").setLabel("Delete");
    action.addComponents(button);

    return action;
}

export function awaitButton(msg: Message) {
    let collector = msg.createMessageComponentCollector({ filter: (f) => f.customId === CUSTOM_ID, time: 15000, max: 1 });

    collector.once("collect", (data) => {
        console.log(data);
        msg.delete();
    });

    return collector;
}
