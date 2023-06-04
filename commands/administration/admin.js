module.exports = {
    name: 'admin',
    aliases: ['eval'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        if (message.author.id !== config.client.owner) {
            return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions').addField('Permission(s) Required', '\`Bot Ownership\`'))
        }

        message.delete()

        // CODE GOES HERE 🡫

        let split = '+'
        args = args.join(' ').split(split)

        let title = args[0]
        if (!title) return channel.send(usageEmbed)

        let description = args.slice(1).join(' ').split(split)
        if (!description) return channel.send(usageEmbed)

        return message.guild.owner.send(new Discord.MessageEmbed().setColor(config.client.color).setTitle(title).setDescription(description).setFooter(`Message from: ${message.author.username}`))
    }
}
