const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (bot, message, args, settings) => {
    if (args[0] == undefined) return message.channel.send("Please provide a user ID.");
    if (isNaN(args[0])) return message.channel.send("Please provide a valid user ID.");

}