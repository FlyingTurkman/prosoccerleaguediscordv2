import { Client, CommandInteraction, ContextMenuCommandAssertions, EmbedBuilder } from "discord.js";
import { Command } from "../../src/Command";
import { STRING } from "../../src/lib/utils/constants";
import { checkUserTeamPermission } from "../../src/lib/utils/team/checkUserTeamPermission";
import { getUserTeam } from "../../src/lib/utils/team/getUserTeam";











export const LookingForPlayer: Command = {
    name: 'looking_for_player',
    description: 'You can search players with this command.',
    options: [
        { type: STRING, name: 'position', description: 'Positions', required: true },
        { type: STRING, name: 'about', description: 'About', required: false }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {

        try {
            const user = interaction.user.id
            const position = interaction.options.get('position')?.value
            const about = interaction.options.get('about')?.value

            const teamPermission = await checkUserTeamPermission(user)

            if (teamPermission != 'owner' && teamPermission != 'captain' && teamPermission != 'coCaptain') {
                await interaction.reply({
                    content: 'You have no permission for this command.',
                    ephemeral: true
                })

                return
            }


            const team = await getUserTeam(user)

            if (!team) {
                await interaction.reply({
                    content: 'You are not in a team.',
                    ephemeral: true
                })

                return
            }

            const embed = new EmbedBuilder()

            embed.setTitle(`${team?.teamName} [${team?.teamTag}] looking for players.`)

            if (team.teamAvatar) embed.setThumbnail(team?.teamAvatar || '')
            
            embed.setFields([
                { name: 'Team Name', value: team.teamName },
                { name: 'Positions', value: position?.toString() || 'Unknown' },
                { name: 'About', value: about?.toString() || 'Unknown' }
            ])

            await interaction.channel?.send({
                content: `<@${team.owner}> <@${team.captain}> ${team.coCaptain? `<@${team.coCaptain}>`: ''} for contacts.`,
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