module.exports = {
    name: 'image',
    aliases: ['img'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        let usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Command: \`${config.client.prefix}image\``)
            .setDescription(`**Usage:** \`${config.client.prefix}image <message> + <imageURL>\`\n**Alias:** \`${config.client.prefix}img\`\n**Category:** Administration`)
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

        let split = '+'
        args = args.join(' ').split(split)

        let description = args[0]
        if (!description) return channel.send(usageEmbed)

        let image = args.slice(1).join(' ').split(split)
        if (!image) return channel.send(usageEmbed)

        let embed = new Discord.MessageEmbed()
            .setDescription(description)
            .setImage(`${image}`)
            .setColor(config.client.color)

        return channel.send(embed)
    }
}