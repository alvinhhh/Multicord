module.exports = {
    name: 'purge',
    aliases: ['clear'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        const usageEmbed = new EmbedBuilder()
            .setTitle(`Command: \`${config.client.prefix}purge\``)
            .setDescription(`**Usage:** \`${config.client.prefix}purge <amount> <reason>\`\n**Alias:** \`${config.client.prefix}clear\`\n**Category:** Moderation`)
            .addField('Permission(s) Required', '\`MANAGE_MESSAGES\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_MESSAGES')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        // CODE GOES HERE 🡫

        let channel = message.guild.channels.cache.find(c => c.id === config.channel.logs)
        if (!channel) return channel.send(new Discord.MessageEmbed().setColor('#e74a3b').setDescription('**ERROR** Please contact \`zoom#9850\`').addField('Issue', '[purge.js]channel_not_found'))

        let amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Please specify an amount'))

        let reason = args.slice(1).join(' ')
        if (!reason) return channel.send(usageEmbed)

        message.channel.fetchMessages({
            limit: 100,
        }).then(async (messages) => {

            const embed = new EmbedBuilder()
                .setTitle('Messsages Cleared')
                .addField('Channel:', message.channel, true)
                .addField('Cleared By:', message.author.tag, true)
                .addField('Reason:', `\`${reason}\``)
                .setThumbnail(message.author.avatarURL)
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL)
                .setColor(config.client.color)

            message.channel.bulkDelete(amount)
            channel.send(embed)
            return channel.send(new Discord.MessageEmbed().setDescription(`\`${amount}\` Messages cleared in ${message.channel}`).addField('Cleared by:', message.author.tag, true).addField('Reason:', reason, true).setColor(config.client.color))
        })
    }
}