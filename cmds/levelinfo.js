const Discord = require("discord.js");
const axios = require("axios");
const base64 = require("base-64");

exports.run = async (bot, message, args, gjp, url) => {
    if (args[0] == undefined) return message.channel.send("Please provide a level ID.");
    if (isNaN(args[0])) return message.channel.send("Please provide a level ID.");
    let msg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("Getting level info...")
        .setColor("#FFA500")
        .setDescription("This might take a moment."));
    axios.post(`${url}/getGJLevels21.php`, `gameVersion=20&binaryVersion=29&type=0&str=${args[0]}&diff=-&len=-&page=0&total=0&uncompleted=0&featured=0&original=0&twoPlayer=0&coins=0&secret=Wmfd2893gb7`)
        .then(function (res) {
            //console.log(res.data);
            let args2 = res.data.split(":");
            if (args2[2].includes("-1")) return msg.edit(new Discord.MessageEmbed()
                .setTitle("Error")
                .setColor("#FF1800")
                .setDescription(`There is no level with ID ${args[0]}.`));
            let args3 = res.data.split("~|~");
            let songid = args2[15];
            let song = args3[1];
            let songname = args3[3];
            let songauthor = args3[7];
            let songurl = "[Download](" + decodeURIComponent(args3[13]) + ")";
            if (args2[57].startsWith('0#')) {
                songurl = null;
                song = songid + " (Main)";
                switch (songid) {
                    case '0':
                        songname = "Stereo Madness";
                        songauthor = "ForeverBound";
                        break;
                    case '1':
                        songname = "Back On Track";
                        songauthor = "DJVI";
                        break;
                    case '2':
                        songname = "Polargeist";
                        songauthor = "Step";
                        break;
                    case '3':
                        songname = "Dry Out";
                        songauthor = "DJVI";
                        break;
                    case '4':
                        songname = "Base After Base";
                        songauthor = "DJVI";
                        break;
                    case '5':
                        songname = "Cant Let Go";
                        songauthor = "DJVI";
                        break;
                    case '6':
                        songname = "Jumper";
                        songauthor = "Waterflame";
                        break;
                    case '7':
                        songname = "Time Machine";
                        songauthor = "Waterflame";
                        break;
                    case '8':
                        songname = "Cycles";
                        songauthor = "DJVI";
                        break;
                    case '9':
                        songname = "xStep";
                        songauthor = "DJVI";
                        break;
                    case '10':
                        songname = "Clutterfunk";
                        songauthor = "Waterflame";
                        break;
                    case '11':
                        songname = "Theory of Everything";
                        songauthor = "DJ-Nate";
                        break;
                    case '12':
                        songname = "Electroman Adventures";
                        songauthor = "Waterflame";
                        break;
                    case '13':
                        songname = "Clubstep";
                        songauthor = "DJ-Nate";
                        break;
                    case '14':
                        songname = "Electrodynamix";
                        songauthor = "DJ-Nate";
                        break;
                    case '15':
                        songname = "Hexagon Force";
                        songauthor = "Waterflame";
                        break;
                    case '16':
                        songname = "Blast Processing";
                        songauthor = "Waterflame";
                        break;
                    case '17':
                        songname = "Theory of Everything 2";
                        songauthor = "DJ-Nate";
                        break;
                    case '18':
                        songname = "Geometrical Denominator";
                        songauthor = "Waterflame";
                        break;
                    case '19':
                        songname = "Deadlocked";
                        songauthor = "F-777";
                        break;

                }
            }
            let copyable = null;
            if (!args2[55] == "0") {
                copyable = args2[55].slice(1); //modified getGJLevels.php to return with the levels pass
            }
            msg.edit(new Discord.MessageEmbed()
                .setTitle(args2[3])
                .setColor("#01FF56")
                .setDescription(`${base64.decode(args2[35])} ${copyable ? "\n\nPass: ||" + copyable + "||" : ""}`)
                .addField("ID", args[0])
                .addField("Created By", args2[58])
                .addField("Downloads", args2[13])
                .addField("Likes", args2[19])
                .addField("Song", `ID: ${song}\nName: ${songname}\nAuthor: ${songauthor}\n${songurl ? songurl : "Download Unavailable"}`));
        });


}
