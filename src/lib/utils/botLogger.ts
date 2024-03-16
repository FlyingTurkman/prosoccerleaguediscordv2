import { Client, ColorResolvable, EmbedBuilder, TextChannel } from "discord.js";








export async function botLogger(client: Client, title: string, message: string, color?: ColorResolvable, adminPing?: boolean) {
    try {
        const embed = new EmbedBuilder()

        embed.setTitle(title)
        embed.addFields([
            { name: 'Message', value: message }
        ])
        embed.setColor(color || 'Blue')

        const channel = client.channels.cache.get(process.env.botLogChannelId) as TextChannel
        channel.send({
            content: adminPing? `<@&${process.env.adminId}> <@&${process.env.viceAdminId}>`: '',
            embeds: [embed]
        })
    } catch (error) {
        console.log(error)
    }
}