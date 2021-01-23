const Discord = require("discord.js");
const axios = require("axios");
const base64 = require("base-64");

exports.run = async (bot, message, args, url) => {
    if (args[0] !== undefined) {
        let msg = await message.channel.send(new Discord.MessageEmbed()
            .setTitle("Linking...")
            .setColor("#FFA500")
            .setDescription("This might take a moment."));
        axios.post(`${url}/bot/link.php`, `type=2&userID=${message.author.id}&code=${args[0]}`)
            .then(function (res) {
                if (res.data != "1") return msg.edit(new Discord.MessageEmbed()
                        .setTitle("Error")
                        .setColor("#FF1800")
                        .setDescription(`Send a message to Geometrix (in-game) with your code as the subject and try again.`));
                msg.edit(new Discord.MessageEmbed()
                    .setTitle("Linked!")
                    .setColor("#01FF56")
                    .setDescription(`Account linked successfully.`));
            });

    } else {
        let msg = await message.channel.send(new Discord.MessageEmbed()
            .setTitle("Getting code...")
            .setColor("#FFA500")
            .setDescription("This might take a moment."));
        axios.post(`${url}/bot/link.php`, `type=1&userID=${message.author.id}`)
            .then(function (res) {
                if (res.data.length != 7) {
                    msg.edit(new Discord.MessageEmbed()
                        .setTitle("Error")
                        .setColor("#FF1800")
                        .setDescription(`${res.data}`));
                }
                msg.edit(new Discord.MessageEmbed()
                    .setTitle("Link")
                    .setColor("#01FF56")
                    .setDescription(`Send a message to Geometrix (in-game) with the subject \`${res.data}\` and then run \`g!link ${res.data}\``));
            });
    }

}
