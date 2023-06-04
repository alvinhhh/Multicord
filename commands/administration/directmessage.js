module.exports = {
    name: 'directmessage',
    aliases: ['dm'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        let usageEmbed = new Discord.RichEmbed()
            .setTitle(`Command: \`${config.client.prefix}directmessage\``)
            .setDescription(`**Usage:** \`${config.client.prefix}directmessage <user> <message>\`\n**Alias:** \`${config.client.prefix}dm\`\n**Category:** Administration`)
            .addField('Permission(s) Required', '\`ADMINISTRATOR\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                return channel.send(new Discord.RichEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        message.delete()

        // CODE GOES HERE 🡫

        let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.toLowerCase().includes(args[0]))
        if (!member) return channel.send(usageEmbed)

        let content = args.slice(1).join(' ')
        if (!content) return channel.send(usageEmbed)

        member.send(new Discord.RichEmbed().setColor(config.client.color).setDescription(content))
        return channel.send(new Discord.RichEmbed().setColor(config.client.color).setDescription(`You sent a message to **${member.user.username}**`).addField('Message', content))
    }
}