import { Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "../../src/Command";
import { STRING } from "../../src/lib/utils/constants";
import { teamType } from "types";
import { Teams } from "../../src/lib/mongodb/models";
















export const TeamInfo: Command = {
    name: 'team_info',
    description: 'You can look up a team.',
    options: [
        { type: STRING, name: 'team_name', description: 'Exact team name.', required: true }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            
            const teamName = interaction.options.get('team_name')?.value

            const team: teamType | null = await Teams.findOne({
                teamName
            })

            if (!team) {
                interaction.reply({
                    content: 'Team not found',
                    ephemeral: true
                })

                return
            }

            const embed = new EmbedBuilder()
            embed.setTitle(`${team.teamName} [${team.teamTag}]`)
            if (team.teamAvatar) {
                embed.setThumbnail(team.teamAvatar)
            }

            embed.addFields([
                { name: 'Owner', value: `<@${team.owner}>` },
                { name: 'Captain', value: `<@${team.captain}>` },
                { name: 'Co-Captain', value: team.coCaptain? `<@${team.coCaptain}>`: 'Not assigned' },
                { name: 'Players', value: `
                    ${team.members.map((member) => {
                        return `<@${member}> \u200B` 
                    })}
                
                ` }
            ])

            embed.setFooter({
                text: `Team created at ${new Date(team.createdAt).toLocaleDateString()}`
            })

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
            
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: 'An error has occured',
                ephemeral: true
            })
        }
    }
}