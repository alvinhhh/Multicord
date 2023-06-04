module.exports = {
    name: 'mute',
    aliases: ['stfu'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        const usageEmbed = new EmbedBuilder()
            .setTitle(`Command: \`${config.client.prefix}mute\``)
            .setDescription(`**Usage:** \`${config.client.prefix}mute <user> <reason>\`\n**Alias:** \`${config.client.prefix}stfu\`\n**Category:** Moderation`)
            .addField('Permission(s) Required', '\`MUTE_MEMBERS\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MUTE_MEMBERS')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        // CODE GOES HERE 🡫

        let channel = message.guild.channels.cache.find(c => c.id === config.channel.logs)
        if (!channel) return channel.send(new Discord.MessageEmbed().setColor('#e74a3b').setDescription('**ERROR** Please contact \`zoom#9850\`').addField('Issue', '[mute.js]channel_not_found'))

        let role = message.guild.roles.find(c => c.id === config.role.muted)
        if (!role) return channel.send(new Discord.MessageEmbed().setColor('#e74a3b').setDescription('**ERROR** Please contact \`zoom#9850\`').addField('Issue', '[mute.js]role_not_found'))

        let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.toLowerCase().includes(args[0]))
        if (!member) return channel.send(usageEmbed)
        if (member.user.id === message.author.id) return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('You cannot mute yourself'))
        if (member.highestRole.position >= message.member.highestRole.position) return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('You cannot mute that person'))

        let time = args[1]
        if (!time) return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Please specify a timeframe'))
        if (time.length > 3) return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Please specify a timeframe'))
        if (!time.toLowerCase().includes('s') && !time.toLowerCase().includes('m') && !time.toLowerCase().includes('h') && !time.toLowerCase().includes('d')) return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Please specify a timeframe'))

        let reason = args.slice(2).join(' ')
        if (!reason) channel.send(usageEmbed)

        const embed = new EmbedBuilder()
            .setTitle('Member Muted')
            .addField('Member:', member.user.tag, true)
            .addField('Member ID:', member.user.id, true)
            .addField('Muted By:', message.author.tag, true)
            .addField('Duration:', time, true)
            .addField('Reason:', `\`${reason}\``, true)
            .setThumbnail(member.user.avatarURL)
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
            type: 'Mute',
            reason: reason,
            date: date
        })
        newLogs.save()

        member.addRole(role.id)
        channel.send(embed)
        channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`You have muted **${member.user.tag}** for \`${reason}\``))

        setTimeout(() => {
            let embed = new Discord.MessageEmbed()
                .setTitle('Member Unmuted')
                .addField('Member:', member.user.tag, true)
                .addField('Member ID:', member.user.id, true)
                .addField('Unmuted By:', 'CONSOLE', true)
                .addField('Reason:', `\`Mute expired\``)
                .setThumbnail(member.user.avatarURL)
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL)
                .setColor(config.client.color)

            member.removeRole(role.id)
            return channel.send(embed)
        }, ms(time))
    }
}