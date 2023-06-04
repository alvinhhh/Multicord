module.exports = {
    name: 'description',
    aliases: ['desc'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        let usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Command: \`${config.client.prefix}description\``)
            .setDescription(`**Usage:** \`${config.client.prefix}description <message>\`\n**Alias:** \`${config.client.prefix}desc\`\n**Category:** Administration`)
            .addField('Permission(s) Required', '\`MANAGE_MESSAGES\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MANAGE_MESSAGES')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        message.delete()

        // CODE GOES HERE 🡫

        let description = args.slice(0).join(' ')
        if (!description) return channel.send(usageEmbed)

        let embed = new Discord.MessageEmbed()
            .setDescription(description)
            .setColor(config.client.color)

        return channel.send(embed)
    }
}