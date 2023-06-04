module.exports = {
    name: 'movement',
    aliases: ['move'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        const usageEmbed = new EmbedBuilder()
            .setTitle(`Command: \`${config.client.prefix}movement\``)
            .setDescription(`**Usage:** \`${config.client.prefix}movement <promote | demote> <user> <role>\`\n**Alias:** \`${config.client.prefix}move\`\n**Category:** Staff`)
            .addField('Permission(s) Required', '\`ADMINISTRATOR\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.client.color)

        if (message.author.id !== config.client.owner) {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription('Insufficient Permissions')) && channel.send(usageEmbed)
            }
        }

        // CODE GOES HERE 🡫

        let now = new Date()
        let date = moment(now).format('MM/DD/YYYY')

        let channel = message.guild.channels.find(c => c.id === config.channel.movement)
        if (!channel) return channel.send(new Discord.MessageEmbed().setColor('#e74a3b').setDescription('**ERROR** Please contact \`zoom#9850\`').addField('Issue', '[movement.js]channel_not_found'))

        if (args[0] === 'promote') {
            let member = message.mentions.members.first() || message.guild.members.get(args[1]) || message.guild.members.find(m => m.user.username.toLowerCase().includes(args[1]))
            if (!member) return channel.send(usageEmbed)

            let role = message.mentions.roles.first()
            if (!role) return channel.send(usageEmbed)

            const embed = new EmbedBuilder()
                .setTitle('Staff Movement')
                .setDescription(`**${member.user.username}** has been promoted to ${role}`)
                .addField('Date', date)
                .setThumbnail(member.user.avatarURL)
                .setFooter(message.guild.name, message.guild.iconURL)
                .setColor(config.client.color)

            member.addRole(role.id)
            channel.send(embed)
            return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`You promoted **${member.user.username}** to ${role}`))
        }

        if (args[0] === 'demote') {
            let member = message.mentions.members.first() || message.guild.members.get(args[1]) || message.guild.members.find(m => m.user.username.toLowerCase().includes(args[1]))
            if (!member) return channel.send(usageEmbed)

            let role = message.mentions.roles.first()
            if (!role) return channel.send(usageEmbed)

            let embed = new Discord.MessageEmbed()
                .setTitle('Staff Movement')
                .setDescription(`**${member.user.username}** has been demoted to ${role}`)
                .addField('Date', date)
                .setThumbnail(member.user.avatarURL)
                .setFooter(message.guild.name, message.guild.iconURL)
                .setColor(config.client.color)

            member.setRoles([`${role.id}`])
            channel.send(embed)
            return channel.send(new Discord.MessageEmbed().setColor(config.client.color).setDescription(`You demoted **${member.user.username}** to ${role}`))
        }
        return channel.send(usageEmbed)
    }
}