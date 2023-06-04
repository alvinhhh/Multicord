module.exports = {
    name: 'unban',
    aliases: ['unfuckoff'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        const usageEmbed = new EmbedBuilder()
            .setTitle(`Command: \`${config.client.prefix}unban\``)
            .setDescription(`**Usage:** \`${config.client.prefix}unban <userID> <reason>\`\n**Alias:** \`${config.client.prefix}unfuckoff\`\n**Category:** Moderation`)
            .addField('Permission(s) Required', '\`BAN_MEMBERS\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('BAN_MEMBERS')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        // CODE GOES HERE 🡫

        let channel = message.guild.channels.cache.find(c => c.id === config.channel.logs)
        if (!channel) return channel.send(new Discord.MessageEmbed().setColor('#e74a3b').setDescription('**ERROR** Please contact \`zoom#9850\`').addField('Issue', '[unban.js]channel_not_found'))

        let member = args[0]
        if (!member) return channel.send(usageEmbed)

        let reason = args.slice(1).join(' ')
        if (!reason) return channel.send(usageEmbed)

        const embed = new EmbedBuilder()
            .setTitle('Member Unbanned')
            .addField('Member ID:', member, true)
            .addField('Banned By:', message.author.tag, true)
            .addField('Reason:', `\`${reason}\``)
            .setThumbnail(message.guild.iconURL)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setColor(config.client.color)

        let now = new Date()
        let date = moment(now).format('MM/DD/YYYY')

        const newLogs = new Logs({
            serverID: message.guild.id,
            userID: member.id,
            userName: member.user.username,
            mod: message.author.username,
            type: 'Unban',
            reason: reason,
            date: date
        })
        newLogs.save()

        message.guild.unban(member)
        channel.send(embed)
        return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`You have unbanned **${member}** for \`${reason}\``))
    }
}