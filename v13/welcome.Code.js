//Code Developer: Amir-78 (AmirDev);
//Discord: Amir.#2013 (https://discord.gg/CVZ2g38fy4);
const config = require('./welcome.config.json');
/*
//config.json:
{
    "guildId": "",
    "channelId": "",
    "welcomeMessage": "{member} ( {memberTag} ) Welcome to **{server}**\nYou are the member number **{memberCount}**",
    "allowBots": false,
    "deleteTime": 15
}

//deleteTime:
- Set "deleteTime" to 0 so that the message will not be deleted!;
- "deleteTime" should be in seconds;

//allowBots:
- Set "allowBots" to "true" if you want the bot to welcome even bots;

//welcomeMessage: 
- Use {member} to mention the member;
- Use {memberTag} to show the member tag (Amir.#2013);
- Use {server} to show the server name (ProProtection);
- Use {memberCount} to show the member number in the server;
*/

client.on('guildMemberAdd', async (member) => {
    if (member.guild.id != config.guildId) return;
    if (member.user.bot && !config.allowBots) return;
    let Wlcchannel = member.guild.channels.cache.get(config.channelId);
    if (!Wlcchannel) return console.error("CHANNEL_NOT_FOUND: Welcome channel not found!");
    if (config.welcomeMessage.length === 0) return console.error("NO_WELCOME_MESSAGE: Welcome message must be at least one letter!");
    let wlcMessage = config.welcomeMessage
        .replace(/{member}/g, `${member}`)
        .replace(/{memberTag}/g, `${member.user.tag}`)
        .replace(/{server}/g, `${member.guild.name}`)
        .replace(/{memberCount}/g, `${member.guild.memberCount}`)
    Wlcchannel.send({ content: `${wlcMessage}` }).then(async (msg) => {
        if (config.deleteTime === 0) return;
        setTimeout(() => msg.delete() ,(config.deleteTime * 1000))
    })
});
