module.exports = {
    name: 'clearhistory',
    aliases: ['ch'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        const usageEmbed = new EmbedBuilder()
            .setTitle(`Command: \`${config.client.prefix}clearhistory\``)
            .setDescription(`**Usage:** \`${config.client.prefix}clearhistory <user> <reason>\`\n**Alias:** \`${config.client.prefix}ch\`\n**Category:** Moderation`)
            .addField('Permission(s) Required', '\`ADMINISTRATOR\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        // CODE GOES HERE 🡫

        let channel = message.guild.channels.cache.find(c => c.id === config.channel.logs)
        if (!channel) return channel.send(new Discord.MessageEmbed().setColor('#e74a3b').setDescription('**ERROR** Please contact \`zoom#9850\`').addField('Issue', '[clearhistory.js]channel_not_found'))

        let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.toLowerCase().includes(args[0]))
        if (!member) return channel.send(usageEmbed)

        let reason = args.slice(1).join(' ')
        if (!reason) return channel.send(usageEmbed)

        Logs.deleteMany({ serverID: message.guild.id, userID: member.id }, async (error, logs) => {
            if (!logs) return channel.send(`No history found for **${member.user.username}**`)

            const embed = new EmbedBuilder()
                .setTitle('History Cleared')
                .addField('Member:', member.user.tag, true)
                .addField('Member ID:', member.user.id, true)
                .addField('Cleared By:', message.author.tag, true)
                .addField('Reason:', `\`${reason}\``)
                .setThumbnail(member.user.avatarURL)
                .setFooter(message.guild.name, message.guild.iconURL)
                .setColor(config.client.color)

            channel.send(embed)
            return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`You have cleared **${member.user.tag}** history for \`${reason}\``))
        })
    }
}