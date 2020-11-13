const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (bot, message, args, settings) => {
    if (message.author.id != "363474941523263518") return;
    let msg = await message.channel.send("Adding (Hopefully)...");
    let Role = message.guild.roles.cache.find(r => r.name === "Members");
    //let members = await message.guild.members.cache.filter(member => !member.roles.cache.has(Role.id));
    //members.forEach(member => member.roles.add(Role));
    message.guild.members.cache.forEach(member => member.roles.add(Role));
    msg.edit("Done (Hopefully).");
}