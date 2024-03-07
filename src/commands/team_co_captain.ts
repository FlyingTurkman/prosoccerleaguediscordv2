import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { USER } from "../../src/lib/utils/constants";
import { teamType } from "types";
import { Teams } from "../../src/lib/mongodb/models";
import { checkUserTeamPermission } from "../../src/lib/utils/team/checkUserTeamPermission";













export const TeamCoCaptain: Command = {
    name: 'team_co_captain',
    description: 'You can set your team co-captain with this command.',
    options: [
        { type: USER, name: 'user', description: 'User', required: true }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            
            const coCaptain = interaction.options.get('user')?.value
            const user = interaction.user.id
            const guildId = interaction.guildId

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

            const teamPermission = await checkUserTeamPermission(user)

            if (teamPermission != 'owner') {
                
                await interaction.reply({
                    content: 'You have no permission for this command.',
                    ephemeral: true
                })

                return
            }

            const newCoCaptain = await Teams.updateOne({
                guildId
            }, {
                $set: {
                    coCaptain
                }
            })

            if (newCoCaptain.matchedCount == 0) {
                await interaction.reply({
                    content: 'An error has occured.',
                    ephemeral: true
                })

                return
            }

            await interaction.reply({
                content: 'Co-captain succesfully updated.',
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