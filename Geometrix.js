const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
let pfx = "G!";
bot.commands = new Discord.Collection();

bot.on("ready", () => {
    bot.user.setActivity("Geometrix | g!help");
    console.log("New Best! 98%");
    const cmds = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js'))
    for (const cmd of cmds) {
        const command = require(`./cmds/${cmd}`);
        bot.commands.set(command.help.name, command);
        console.log(`${command.help.name} added.`);
    }
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
        bot.commands.get(cmd).run(bot, message, args, gjp, url);
    } catch (e) {
        bot.channels.cache.get('816486830256947241').send(new Discord.RichEmbed()
            .setTitle(`Server: ${message.guild.name}`)
            .setAuthor(message.author.tag)                                    
            .setDescription(e.message)
            .addField(`Cause`, message.content)
            .setColor([255, 0, 0]));
    }
});

bot.login(process.env.TOKEN);
