module.exports = {
    name: 'bug',
    aliases: ['bugreport'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        let usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Command: \`${config.client.prefix}bug\``)
            .setDescription(`**Usage:** \`${config.client.prefix}bug <report>\`\n**Alias:** \`${config.client.prefix}bugreport\`\n**Category:** General`)
            .addField('Permission(s) Required', '\`SEND_MESSAGES\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        // Checking Permission
        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('SEND_MESSAGES')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        message.delete()

        // CODE GOES HERE 🡫

        let now = new Date()
        let date = moment(now).format('MM/DD/YYYY')

        let channel = message.guild.channels.cache.find(c => c.id === config.channel.bugs)
        if (!channel) return channel.send(new Discord.MessageEmbed().setColor('#e74a3b').setDescription('**ERROR** Please contact \`zoom#9850\`').addField('Issue', '[bugs.js]channel_not_found'))

        let content = args.slice(0).join(' ')
        if (!content) return channel.send(usageEmbed)

        let embed = new Discord.MessageEmbed()
            .setTitle(`Bug Report from ${message.author.tag}`)
            .setDescription(`${content}\n\n`)
            .addField('Information', `Status: \`Pending\``)
            .setFooter(date)
            .setColor(config.client.color)

        channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Your bug report has been submitted'))
        let m = await channel.send(embed)
        await m.react('✅')
    }
}