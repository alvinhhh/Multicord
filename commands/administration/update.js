module.exports = {
    name: 'update',
    aliases: ['update'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        let usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Command: \`${config.client.prefix}update\``)
            .setDescription(`**Usage:** \`${config.client.prefix}update\`\n**Alias:** \`${config.client.prefix}up\`\n**Category:** General`)
            .addField('Permission(s) Required', '\`BOT_ADMINISTRATOR\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
        }

        message.delete()

        // CODE GOES HERE 🡫

        let embed = new Discord.MessageEmbed()
            .setTitle('Discord Bot Update')
            .setDescription(`Name: **${config.server.name}**\nNew Version: \`v2.2.1\`\n\nHi my prefix \`.\`\nUse \`.help\` to see all available commands`)
            .setColor(config.client.color)

        return channel.send(embed)
    }
}