const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (bot, message, args, gjp, url) => {
    let msg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("Getting user info...")
        .setColor("#FFA500")
        .setDescription("This might take a moment."));
    if (args[0] == undefined || message.mentions.users.first()) {
        let member = message.mentions.users.first() || message.author;
        let test = await axios.post(`${url}/bot/link.php`, `type=3&userID=${member.id}`)
            .then(function (res) {
                if (res.data == "-1") return args[0] = 0;
                args[0] = parseInt(res.data);
            });
    }
    if (!isNaN(args[0])) {
        axios.post(`${url}/getGJUserInfo20.php`, `gameVersion=20&binaryVersion=29&accountID=30&gjp=${gjp}&targetAccountID=${args[0]}&secret=Wmfd2893gb7`)
            .then(function (res) {
                //console.log(res);
                if (res.data == "-1") return msg.edit(new Discord.MessageEmbed()
                    .setTitle("Error")
                    .setColor("#FF1800")
                    .setDescription(`There is no user with ID ${args[0]}.`));
                let args2 = res.data.split(":");
                msg.edit(new Discord.MessageEmbed()
                    .setTitle("User Information")
                    .setDescription(`Username: ${args2[1]}\nID: ${args2[3]}`)
                    .setColor("#01FF56")
                    .addField("Stats", `Stars: ${args2[13]}\nCoins: ${args2[5]}\nUser Coins: ${args2[7]}\nDemons: ${args2[17]}\nCreator Points: ${args2[19]}`)
                );
            })
    } else {
        axios.post(`${url}/getGJUsers20.php`, `gameVersion=20&binaryVersion=29&str=${args[0]}&total=${gjp}&page=0&secret=Wmfd2893gb7`)
            .then(function (res) {                                                                   //LOL i used total for this so it would know the requester is the bot, and yes i modified the file.
                //console.log(res);
                if (res.data == "-1") return msg.edit(new Discord.MessageEmbed()
                    .setTitle("Error")
                    .setColor("#FF1800")
                    .setDescription(`There is no user with the username ${args[0]}.`));
                let args2 = res.data.replace("#", ":").split(":");
                msg.edit(new Discord.MessageEmbed()
                    .setTitle("User Information")
                    .setDescription(`Username: ${args2[1]}\nID: ${args2[3]}`)
                    .setColor("#01FF56")
                    .addField("Stats", `Stars: ${args2[21]}\nCoins: ${args2[5]}\nUser Coins: ${args2[7]}\nDemons: ${args2[25]}\nCreator Points: ${args2[23]}`)
                );
            })
    }
}
exports.help = {
    name: "userinfo",
    description: "See a user's stats by Username or ID.",
    usage: "**g!userinfo** (User)",
    example: "**g!userinfo** Wayveyx\n**g!userinfo** 2",
    aliases: []
}
