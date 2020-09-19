const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (bot, message, args, gjp, url) => {
    if (args[0] == undefined) return message.channel.send("Please provide a user.");
    if (!isNaN(args[0])) {
        axios.post(`${url}/getGJUserInfo20.php`, `gameVersion=20&binaryVersion=29&accountID=30&gjp=${gjp}&targetAccountID=${args[0]}&secret=Wmfd2893gb7`)
            .then(function (res) {
                console.log(res);
                let args2 = res.data.split(":");
                message.channel.send(new Discord.MessageEmbed()
                    .setTitle("User Information")
                    .setDescription(`Username: ${args2[1]}\nID: ${args2[3]}`)
                    .setColor("#FFA500")
                    .addField("Stats", `Stars: ${args2[13]}\nCoins: ${args2[5]}\nUser Coins: ${args2[7]}\nDemons: ${args2[17]}\nCreator Points: ${args2[19]}`)
                );
            })
    } else {
        axios.post(`${url}/getGJUsers20.php`, `gameVersion=20&binaryVersion=29&str=${args[0]}&total=${gjp}&page=0&secret=Wmfd2893gb7`)
            .then(function (res) {                                                                           //LOL i used total for this so it would know the requester is the bot, and yes i modified the file.
                //console.log(res);
                let args2 = res.data.replace("#", ":").split(":");
                message.channel.send(new Discord.MessageEmbed()
                    .setTitle("User Information")
                    .setDescription(`Username: ${args2[1]}\nID: ${args2[3]}`)
                    .setColor("#FFA500")
                    .addField("Stats", `Stars: ${args2[21]}\nCoins: ${args2[5]}\nUser Coins: ${args2[7]}\nDemons: ${args2[25]}\nCreator Points: ${args2[23]}`)
                );
            })
    }
}
