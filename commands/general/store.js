module.exports = {
    name: 'store',
    aliases: ['shop'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs, EmbedBuilder) => {

        // Command Usage 
        const usageEmbed = new EmbedBuilder()
            .setTitle(`Command: \`${config.client.prefix}store\``)
            .setDescription(`**Usage:** \`${config.client.prefix}store\`\n**Alias:** \`${config.client.prefix}shop\`\n**Category:** General`)
            .addField('Permission(s) Required', '\`SEND_MESSAGES\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('SEND_MESSAGES')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`Insufficient Permissions`)) && channel.send({ embeds: [usageEmbed] })
            }
        }

        // CODE GOES HERE 🡫

        const embed = new EmbedBuilder()
            .setDescription(`**Store:** [${config.server.store}](${config.server.store}/)`)
            .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
            .setColor(config.client.color)

        channel.send({ embeds: [embed] });
    }
}