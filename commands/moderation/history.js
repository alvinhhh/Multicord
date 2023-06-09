module.exports = {
    name: 'history',
    aliases: ['hist'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        const usageEmbed = new EmbedBuilder()
            .setTitle(`Command: \`${config.client.prefix}history\``)
            .setDescription(`**Usage:** \`${config.client.prefix}history <user>\`\n**Alias:** \`${config.client.prefix}hist\`\n**Category:** Moderation`)
            .addField('Permission(s) Required', '\`MOVE_MEMBERS\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MOVE_MEMBERS')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        // CODE GOES HERE 🡫

        let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.toLowerCase().includes(args[0]))
        if (!member) return channel.send(usageEmbed)

        Logs.find({ serverID: message.guild.id, userID: member.id }).sort([['count', 'ascending']]).exec((err, history) => {

            const embed = new EmbedBuilder()
            embed.setTitle(`History for ${member.user.tag}`)
            embed.setThumbnail(member.user.avatarURL)
            embed.setColor(config.client.color)

            if (!history) return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`No history found for **${member.user.username}**`))
            if (history.length === 0) return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`No history found for **${member.user.username}**`))
            if (history.length > 25) return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`Too many cases to display for **${member.user.username}*`))

            for (var i = 0; i < history.length; i++) {
                embed.addField(`Type: ${history[i].type}`, `**Mod:** ${history[i].mod}\n**Date:** ${history[i].date}\n**Reason:** \`${history[i].reason}\``, true)
            }
            return channel.send(embed)
        })
    }
}