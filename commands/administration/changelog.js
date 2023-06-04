module.exports = {
    name: 'changelog',
    aliases: ['cl'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        let usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Command: \`${config.client.prefix}changelog\``)
            .setDescription(`**Usage:** \`${config.client.prefix}changelog <fix | adj | add> <message>\`\n**Alias:** \`${config.client.prefix}cl\`\n**Category:** Administration`)
            .addField('Permission(s) Required', '\`ADMINISTRATOR\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        message.delete()

        // CODE GOES HERE 🡫

        let channel = message.guild.channels.cache.find(c => c.id === config.channel.changelog)
        if (!channel) return

        if (message.content.toLowerCase().includes('fix')) {
            let description = args.slice(2).join(' ')
            if (!description) return channel.send(usageEmbed)

            let embed = new Discord.MessageEmbed()
                .setTitle('Changelog → Bug Fix')
                .setDescription(`\`${description}\``)
                .setFooter(`Submitted by: ${message.author.username}`, message.author.avatarURL)
                .setColor(config.client.color)

            return channel.send(embed)
        }

        if (message.content.toLowerCase().includes('add')) {
            let description = args.slice(1).join(' ')
            if (!description) return channel.send(usageEmbed)

            let embed = new Discord.MessageEmbed()
                .setTitle('Changelog → Addition')
                .setDescription(`\`${description}\``)
                .setFooter(`Submitted by: ${message.author.username}`, message.author.avatarURL)
                .setColor(config.client.color)

            return channel.send(embed)
        }

        if (message.content.toLowerCase().includes('adj')) {
            let description = args.slice(1).join(' ')
            if (!description) return channel.send(usageEmbed)

            let embed = new Discord.MessageEmbed()
                .setTitle('Changelog → Adjustment')
                .setDescription(`\`${description}\``)
                .setFooter(`Submitted by: ${message.author.username}`, message.author.avatarURL)
                .setColor(config.client.color)

            return channel.send(embed)

        } else {
            return channel.send(usageEmbed)
        }
    }
}
