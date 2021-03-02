const Discord = require("discord.js");
const axios = require("axios");
const base64 = require("base-64");

exports.run = async (bot, message, args, gjp, url) => {
    if (args[0] == undefined) return message.channel.send("Please provide a level.");
    let msg = await message.channel.send(new Discord.MessageEmbed()
        .setTitle("Getting level info...")
        .setColor("#FFA500")
        .setDescription("This might take a moment."));
    axios.post(`${process.env.URL}/getGJLevels21.php`, `gameVersion=20&binaryVersion=29&type=0&str=${args.join(" ")}&diff=-&len=-&page=0&total=0&uncompleted=0&featured=0&original=0&twoPlayer=0&coins=0&secret=Wmfd2893gb7`)
        .then(function (res) {
            //console.log(res.data);
            if (!parseInt(args[0])) {
                let args4 = res.data.split("#"); //split level, player, and song info
                if (args4.includes("-1")) return msg.edit(new Discord.MessageEmbed()
                .setTitle("Error")
                .setColor("#FF1800")
                .setDescription(`There is no level called ${args[0]}.`));
                let args6 = args4[0].split("|"); //split levels apart
                let args5 = args4[1].split("|"); //split players apart, and yes its out of order fuck off lol
                let cpage = 0;
                let args7 = args6[cpage].split(":"); //split the level data into usable segments
                let args8 = args5[cpage].split(":"); //split the user data into usable segments, also be prepared to see both this and args7 being redefined 2 times because im retarded 
                function getSong(num) {
                    if (num == null) num = 0;
                    let args10 = args4[2].split("~:~");
                    for (i = 0; i < args10.length; i++) {
                        let args9 = args10[i].split("~|~");
                        if (args9[1] == num) {
                            let song = args9[1];
                            let songname = args9[3];
                            let songauthor = args9[7];
                            let songurl = "[Download](" + decodeURIComponent(args9[13]) + ")";
                            let songArgs = [song, songname, songauthor, songurl];
                            return songArgs; 
                        }
                    }
                }
                let songInf;
                let copyable = null;
                if (args7[args7.length - 1] > 0) {
                    songInf = getSong(args7[args7.length - 1]);
                } else songInf = robtopSong(args7[15]);
                if (!args7[55] == "0") {
                    copyable = args7[55].slice(1); //modified getGJLevels.php to return with the levels pass
                }
                let gotLvls = new Discord.MessageEmbed()
                    .setTitle(args7[3])
                    .setColor("#01FF56")
                    .setDescription(`${base64.decode(args7[35])}`)
                    .addField("ID", args7[1])
                    .addField("Created By", args8[1])
                    .addField("Downloads", args7[13])
                    .addField("Likes", args7[19])
                    .addField("Song", `ID: ${songInf[0]}\nName: ${songInf[1]}\nAuthor: ${songInf[2]}\n${songInf[3] ? songInf[3] : "Download Unavailable"}`)
                    .setFooter(`Page ${cpage + 1} of ${args6.length}`);
                msg.edit(gotLvls).then(msg => {
                    msg.react("803407762909429830");
                    msg.react("803408365115801670");
                    const backwardsFilter = (reaction, user) => reaction.emoji.id === "803407762909429830" && user.id === message.author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.id === "803408365115801670" && user.id === message.author.id;
                    const backwards = msg.createReactionCollector(backwardsFilter, { time: 30000 });
                    const forwards = msg.createReactionCollector(forwardsFilter, { time: 30000 });
                    backwards.on('collect', r => {
                        if (cpage === 0) cpage = args6.length - 1;
                        else cpage--;
                        args7 = args6[cpage].split(":");
                        args8 = args5[cpage].split(":");
                        if (args7[args7.length - 1] > 0) {
                            songInf = getSong(args7[args7.length - 1]);
                        } else songInf = robtopSong(args7[15]);
                        if (!args7[55] == "0") {
                            copyable = args7[55].slice(1);
                        }
                        gotLvls = new Discord.MessageEmbed()
                            .setTitle(args7[3])
                            .setColor("#01FF56")
                            .setDescription(`${base64.decode(args7[35])} ${copyable ? "\n\nPass: ||" + copyable + "||" : ""}`)
                            .addField("ID", args7[1])
                            .addField("Created By", args8[1])
                            .addField("Downloads", args7[13])
                            .addField("Likes", args7[19])
                            .addField("Song", `ID: ${songInf[0]}\nName: ${songInf[1]}\nAuthor: ${songInf[2]}\n${songInf[3] ? songInf[3] : "Download Unavailable"}`)
                            .setFooter(`Page ${cpage + 1} of ${args6.length}`);
                        msg.edit(gotLvls);
                    });
                    forwards.on('collect', r => {
                        if (cpage === args6.length - 1) cpage = 0;
                        else cpage++;
                        args7 = args6[cpage].split(":");
                        args8 = args5[cpage].split(":");
                        if (args7[args7.length - 1] > 0) {
                            songInf = getSong(args7[args7.length - 1]);
                        } else songInf = robtopSong(args7[15]);
                        if (!args7[55] == "0") {
                            copyable = args7[55].slice(1);
                        }
                        gotLvls = new Discord.MessageEmbed()
                            .setTitle(args7[3])
                            .setColor("#01FF56")
                            .setDescription(`${base64.decode(args7[35])} ${copyable ? "\n\nPass: ||" + copyable + "||" : ""}`)
                            .addField("ID", args7[1])
                            .addField("Created By", args8[1])
                            .addField("Downloads", args7[13])
                            .addField("Likes", args7[19])
                            .addField("Song", `ID: ${songInf[0]}\nName: ${songInf[1]}\nAuthor: ${songInf[2]}\n${songInf[3] ? songInf[3] : "Download Unavailable"}`)
                            .setFooter(`Page ${cpage + 1} of ${args6.length}`);
                        msg.edit(gotLvls);
                    });
                });
                return;
            }
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
                let songInf = robtopSong(songid);
                song = songInf[0];
                songname = songInf[1];
                songauthor = songInf[2];
                songurl = songInf[3];
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
function robtopSong(id) { //moved this because string search
    song = id + " (Main)";
    switch (id) {
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
            songname = "Geometrical Dominator";
            songauthor = "Waterflame";
            break;
        case '19':
            songname = "Deadlocked";
            songauthor = "F-777";
            break;
    }
    let songArgs = [song, songname, songauthor, null];
    return songArgs;
}
