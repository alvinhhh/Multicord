module.exports = {
    name: 'botinfo',
    aliases: ['info'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage
        let usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Command: \`${config.client.prefix}botinfo\``)
            .setDescription(`**Usage:** \`${config.client.prefix}botinfo\`\n**Alias:** \`${config.client.prefix}bi\`\n**Category:** General`)
            .addField('Permission(s) Required', '\`SEND_MESSAGES\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('SEND_MESSAGES')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        // CODE GOES HERE 🡫

        let embed = new Discord.MessageEmbed()
            .setTitle('Bot Information')
            .setURL('https://twitter.com/uypn_ow')
            .setDescription('This bot was made with ♡ by [uypn](https://twitter.com/uypn_ow)')
            .addField('Name', config.server.name, true)
            .addField('Developer', '[uypn](♡)', true)
            .addField('Version', 'v4.0.1 (Build 103911)', true)
            .addField('Guilds', client.guilds.size, true)
            .addField('Users', client.users.size, true)
            .addField('Channels', client.channels.size, true)
            .setThumbnail('https://cdn.discordapp.com/icons/1026960067637030942/d7670d544b6bf8f6ef8a7fc77e5f8166.webp?size=2048')
            .setFooter(`© Copyright 2022, Minecraft Wipeout & uypn. All rights reserved.`, `https://cdn.discordapp.com/icons/1026960067637030942/d7670d544b6bf8f6ef8a7fc77e5f8166.webp?size=2048`)
            .setColor(config.client.color)

        return channel.send(embed)
    }
}
