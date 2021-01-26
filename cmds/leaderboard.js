const Discord = require("discord.js");
const axios = require("axios");
const base64 = require("base-64");

exports.run = async (bot, message, args, settings) => {
    let type = args[0].toLowerCase();
    let types = ["stars", "demons", "coins", "usercoins"];
    if (!types.includes(type)) type = "stars";
    let rpages = [];
    let pages;
    let desc = "";
    let getInfo = await axios.post(`${process.env.URL}/bot/lbs.php`, `type=${type}`)
        .then(async function (res) {
            //console.log(res.data);
            let user = 0;
            let placement = 0;
            let page = 0;
            pages = res.data.split("~");
            while (page < pages.length) {
                userList = pages[page].split(":");
                while (user < userList.length) {
                    placement++;
                    userInfo = userList[user].split("|");
                    desc += "**" + placement + ".** " + userInfo[1] + " (<@" + userInfo[0] + ">) - **" + userInfo[2] + "**\n";
                    user++;
                }
                rpages.push(desc);
                page++;
                user = 0;
                desc = "";
            }
        });
    let cpage = 0;
    let lbtype = type.charAt(0).toUpperCase() + type.slice(1);
    let lbembed = new Discord.MessageEmbed()
        .setTitle(`Leaderboard - ${lbtype}`)
        .setColor("#01FF56")
        .setDescription(rpages[cpage])
        .setFooter(`Page ${cpage+1}/${pages.length}`);
    message.channel.send(lbembed).then(msg => {
        msg.react("803407762909429830");
        msg.react("803408365115801670");
        const backwardsFilter = (reaction, user) => reaction.emoji.id === "803407762909429830" && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.id === "803408365115801670" && user.id === message.author.id;
        const backwards = msg.createReactionCollector(backwardsFilter, { time: 30000 });
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 30000 });
        backwards.on('collect', r => {
            if (cpage === 0) return;
            cpage--;
            lbembed.setDescription(rpages[cpage]);
            lbembed.setFooter(`Page ${cpage+1}/${pages.length}`);
            msg.edit(lbembed);
        });
        forwards.on('collect', r => {
            if (cpage === pages.length-1) return;
            cpage++;
            lbembed.setDescription(rpages[cpage]);
            lbembed.setFooter(`Page ${cpage+1}/${pages.length}`);
            msg.edit(lbembed);
        });
    });
}
