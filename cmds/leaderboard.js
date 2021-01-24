const Discord = require("discord.js");
const axios = require("axios");
const base64 = require("base-64");

exports.run = async (bot, message, args, settings) => {
    let type = args[0].toLowerCase();
    let placement = 0;
    let types = ["stars", "demons", "coins", "usercoins"];
    if (!types.includes(type)) type = "stars";
    axios.post(`${process.env.URL}/bot/lbs.php`, `type=${type}`)
        .then(function (res) {
            //console.log(res);
            userList = res.data.split(":");
            user = 0;
            desc = "";
            while (user < userList.length) {
                placement++;
                userInfo = userList[user].split("|");
                desc += `**${placement}.** ${userInfo[1]} (<@${userInfo[0]}>) - **${userInfo[2]}**\n`;
                user++;      
            }
            lbtype = type.charAt(0).toUpperCase() + type.slice(1);
            message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Leaderboard - ${lbtype}`)
                .setColor("#01FF56")
                .setDescription(desc));
        });
}
