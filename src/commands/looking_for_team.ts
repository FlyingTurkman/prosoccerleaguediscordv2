import { Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "../../src/Command";
import { STRING } from "../../src/lib/utils/constants";
import { getUserTeam } from "../../src/lib/utils/team/getUserTeam";










export const LookingForTeam: Command = {
    name: 'looking_for_team',
    description: 'Looking for team',
    options: [
        { type: STRING, name: 'positions', description: 'Positions', required: true },
        { type: STRING, name: 'hours', description: 'In game hours', required: false },
        { type: STRING, name: 'about', description: 'About yourself', required: false }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            const positions = interaction.options.get('positions')?.value
            const hours = interaction.options.get('hours')?.value
            const about = interaction.options.get('about')?.value
            const user = interaction.user

            const channel = interaction.channelId

            if (!channel) {
                await interaction.reply({
                    content: 'Channel not found.',
                    ephemeral: true
                })
            }

            const team = await getUserTeam(user.id)

            const embed = new EmbedBuilder()

            embed.setTitle(`${user.username} is looking for teams.`)
            embed.setThumbnail(user.avatarURL())
            embed.addFields([
                { name: 'Prefered positions', value: positions?.toString() || 'Unknown' },
                { name: 'In game hours', value: hours?.toString() || 'Unknown' },
                { name: 'About player', value: about?.toString() || 'Unknown' }
            ])

            embed.setFooter({ text: `${team? `${user.username} playing for ${team.teamName} [${team.teamTag}]`: 'Free agent'}`, iconURL: team?.teamAvatar? team.teamAvatar : undefined })
            
            const textChannel = await client.channels.fetch(channel)

            if (!textChannel || !textChannel?.isTextBased()) {
                await interaction.reply({
                    content: 'You can use this command in text based channel.',
                    ephemeral: true
                })
            }
            
            await interaction.channel?.send({
                content: `<@${user.id}> for contacts.`,
                embeds: [embed]
            })

            await interaction.reply({
                content: 'Your request succesfully sended.',
                ephemeral: true
            })
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: `Error: ${error}`,
                ephemeral: true
            })
        }
    }
}