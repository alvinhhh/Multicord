module.exports = {
    name: 'notificationembed',
    aliases: ['ne'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs) => {

        // Command Usage 
        let usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Command: \`${config.client.prefix}notificationembed\``)
            .setDescription(`**Usage:** \`${config.client.prefix}notificationembed\`\n**Alias:** \`${config.client.prefix}ne\`\n**Category:** Staff`)
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

        let embed = new Discord.MessageEmbed()
            .setTitle('Reaction Roles')
            .setDescription(`Follow the steps below to receive the various roles. These roles are used for announcement roles so we don\'t tag everyone.\n_You can unreact to the emoji to remove the role from yourself._\n\nReact with 1️⃣ to receive the <@&${config.role.notify1}> role\nReact with 2️⃣ to receive the <@&${config.role.notify2}> role\nReact with 3️⃣ to receive the <@&${config.role.notify3}> role\nReact with 4️⃣ to receive the <@&${config.role.notify4}> role`)
            .setColor(config.client.color)

        let msg = await channel.send(embed)
        await msg.react('1️⃣')
        await msg.react('2️⃣')
        await msg.react('3️⃣')
        await msg.react('4️⃣')
    }
}