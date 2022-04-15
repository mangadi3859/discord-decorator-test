import { bot as conf } from "..";
import fs from "fs";

export default function () {
    fs.readdir("./commands", (err, dirs) =>
        dirs.forEach((dir) =>
            fs.readdir(`./commands/${dir}`, (err, files) => {
                if (err) throw err; //crash if there is an error while reading the directory
                files.forEach((file) => {
                    if (!file.endsWith(".ts")) return; //ignore any file without .js extension.
                    let fileObj = require(`../commands/${dir}/${file}`).default;
                    let fileConfig = fileObj.config;
                    let fileAliases = fileConfig.aliases;
                    conf.commands.set(fileConfig.name, fileObj);
                    //check if a file has aliases.
                    if (fileAliases.length) {
                        fileAliases.forEach((alias) => conf.aliases.set(alias, fileObj));
                    }
                    console.log(file + " has been loaded.");
                });
            }),
        ),
    );
}
