const Discord = require("discord.js");
const fs = require("fs");
const axios = require("axios");

exports.run = async (bot, message, args) => {
    let desc = [];
    if (args[0] != null && args[0].length > 0 && bot.commands.has(args[0])) {
        let cmd = bot.commands.get(args[0]);
        if (cmd.help.name == "help") return getCmds();
        message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Help - ${cmd.help.name.charAt(0).toUpperCase() + cmd.help.name.slice(1)}`)
            .setColor("#FFA500")
            .setDescription(`${cmd.help.description}\n**Usage:** ${cmd.help.usage}`)
            .addField(`Example(s)`, cmd.help.example)
        );
    } else getCmds();
    async function getCmds() {
        let getCmds = await fs.readdir('./cmds/', function (err, files) {
            if(err) throw err;
            for (i = 0; i < files.length; i++) {
                let file = files[i].split(".")[0];
                let cmd = bot.commands.get(file);
                if (cmd.help.name != "help") desc.push(`${cmd.help.usage} - ${cmd.help.description}`)
            }
            message.channel.send(new Discord.MessageEmbed()
                .setTitle("Help")
                .setDescription(desc.join("\n"))
                .setColor("#FFA500")
                .setFooter("Do g!help (command) to get help on a specific command."));
        });
    }
}
exports.help = {
    name: "help",
    description: "This command.",
    usage: "**g!help**",
    example: "get help",
    aliases: []
}
