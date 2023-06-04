module.exports = {
    name: 'reaction',
    aliases: ['react'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        let usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Command: \`${config.client.prefix}reaction\``)
            .setDescription(`**Usage:** \`${config.client.prefix}reaction <messageID> <emoji>\`\n**Alias:** \`${config.client.prefix}react\`\n**Category:** Administration`)
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

        message.delete()

        // CODE GOES HERE 🡫

        let id = args[0]
        if (!id) return channel.send(usageEmbed)

        let emoji = args[1]
        if (!emoji) return channel.send(usageEmbed)

        return message.channel.fetchMessage(id).then(msg => {
            msg.react(emoji)
        })
    }  
}  