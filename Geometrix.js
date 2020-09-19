const Discord = require("discord.js");
const bot = new Discord.Client();
let pfx = "G!";

bot.on("ready", () => {
    bot.user.setActivity("Geometrix | g!help");
    console.log("New Best! 98%");
});

bot.on("message", message => {
    let gjp = process.env.GJP;
    let url = process.env.URL; //was originally going to use a json for these but idk how to process.env in json lol
    let args = message.content.slice(pfx.length).trim().split(' ');
    let msg = message.content.toUpperCase();
    let cmd = args.shift().toLowerCase();
    if (message.author.bot) return;
    if (!msg.startsWith(pfx)) return;
    try {
        let cmdFile = require(`./cmds/${cmd}.js`);
        cmdFile.run(bot, message, args, gjp, url);
    } catch (e) {
        console.log(e.message);
    }
});

bot.login(process.env.TOKEN);