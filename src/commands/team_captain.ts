import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { USER } from "../../src/lib/utils/constants";
import { Teams } from "../../src/lib/mongodb/models";
import { teamType } from "types";











export const TeamCaptain: Command = {
    name: 'team_captain',
    description: 'You can change your team captain.',
    options: [
        { type: USER, name: 'user', description: 'User', required: true }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            
            const guildId = interaction.guildId
            const userId = interaction.user.id
            const captain = interaction.options.get('user')?.value

            if (!captain) {
                await interaction.reply({
                    content: 'Please select a user',
                    ephemeral: true
                })

                return
            }

            const team: teamType | null = await Teams.findOne({
                guildId
            })

            if (!team) {
                await interaction.reply({
                    content: 'This guild has no team.',
                    ephemeral: true
                })

                return
            }

            if (team.owner != userId) {
                await interaction.reply({
                    content: 'Only team captain can change team captain.',
                    ephemeral: true
                })
            }

            if (!team.members.includes(captain.toString())) {
                await interaction.reply({
                    content: 'Captain must be member of your team.',
                    ephemeral: true
                })

                return
            }

            const teamUpdate = await Teams.updateOne({
                guildId
            }, {
                $set: {
                    captain
                }
            })

            if (teamUpdate.matchedCount == 0) {
                await interaction.reply({
                    content: 'An error has occured.',
                    ephemeral: true
                })

                return
            }

            await interaction.reply({
                content: 'Captain succesfully added.',
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