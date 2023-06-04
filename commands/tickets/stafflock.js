module.exports = {
    name: 'stafflock',
    aliases: ['sl'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        const usageEmbed = new EmbedBuilder()
            .setTitle(`Command: \`${config.client.prefix}stafflock\``)
            .setDescription(`**Usage:** \`${config.client.prefix}stafflock <reason>\`\n**Alias:** \`${config.client.prefix}sl\`\n**Category:** Tickets`)
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

        if (message.channel.parentID != config.category.tickets) {
            return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('This command can only be ran in the tickets category'))
        }

        let role = message.guild.roles.find(c => c.id == config.role.support)
        if (!role) return channel.send(new Discord.MessageEmbed().setColor('#e74a3b').setDescription('**ERROR** Please contact \`zoom#9850\`').addField('Issue', '[stafflock.js]role_not_found'))

        let reason = args.slice(0).join(' ')
        if (!reason) return channel.send(usageEmbed)

        const embed = new EmbedBuilder()
            .setDescription(`${message.channel} has been staff locked`)
            .addField('Locked by:', message.author.tag, true)
            .addField('Reason:', reason, true)
            .setColor(config.client.color)

        message.channel.overwritePermissions(role.id, {
            VIEW_CHANNEL: false
        })

        return channel.send(embed)
    }
}