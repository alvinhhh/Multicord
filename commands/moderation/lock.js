module.exports = {
    name: 'lock',
    aliases: ['l'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        const usageEmbed = new EmbedBuilder()
            .setTitle(`Command: \`${config.client.prefix}lock\``)
            .setDescription(`**Usage:** \`${config.client.prefix}lock <reason>\`\n**Alias:** \`${config.client.prefix}l\`\n**Category:** Moderation`)
            .addField('Permission(s) Required', '\`MANAGE_CHANNELS\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_CHANNELS')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        // CODE GOES HERE 🡫

        let channel = message.guild.channels.cache.find(c => c.id === config.channel.logs)
        if (!channel) return channel.send(new Discord.MessageEmbed().setColor('#e74a3b').setDescription('**ERROR** Please contact \`zoom#9850\`').addField('Issue', '[lock.js]channel_not_found'))

        let reason = args.slice(0).join(' ')
        if (!reason) channel.send(usageEmbed)

        const embed = new EmbedBuilder()
            .setTitle('Channel Locked')
            .addField('Channel:', message.channel, true)
            .addField('Locked By:', message.author.tag, true)
            .addField('Reason:', `\`${reason}\``)
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setColor(config.client.color)

        message.channel.overwritePermissions(message.guild.defaultRole, {
            SEND_MESSAGES: false
        })

        channel.send(embed)
        return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`${message.channel} has been locked.`).addField('Locked by:', message.author.tag, true).addField('Reason:', reason, true))
    }
}