const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (bot, message, args) => {
    message.channel.send(new Discord.MessageEmbed()
        .setTitle("Help")
        .setDescription("**g!levelinfo** - Get information on a level using it's ID.\n**g!userinfo** - See a user's stats by Username or ID.")
        .setColor("#FFA500")
    );
}
