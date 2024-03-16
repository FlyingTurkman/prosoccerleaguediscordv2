import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { getUserTeam } from "../../src/lib/utils/team/getUserTeam";
import { Teams } from "../../src/lib/mongodb/models";
import { botLogger } from "../../src/lib/utils/botLogger";
import { teamColor } from "../../src/lib/utils/constants";















export const TeamLeave: Command = {
    name: 'team_leave',
    description: 'Care if it happend out of transfer season admins may punish you.',
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            const user = interaction.user.id

            const userTeam = await getUserTeam(user)

            if (!userTeam) {
                interaction.reply({
                    content: 'You are not in a team.',
                    ephemeral: true
                })

                return 
            }

            if (userTeam.owner == user) {
                interaction.reply({
                    content: 'Owner can not leave from a team. You should use team_owner_transfer command.',
                    ephemeral: true
                })

                return
            }

            const teamLeave = await Teams.updateOne({
                _id: userTeam._id.toString()
            }, {
                $set: {
                    captain: userTeam.captain == user? userTeam.owner: userTeam.captain,
                    coCaptain: userTeam.coCaptain == user? userTeam.owner: userTeam.coCaptain
                },
                $pull: {
                    members: user
                }
            })

            if (!teamLeave || teamLeave.matchedCount == 0) {
                interaction.reply({
                    content: 'An error has occured.',
                    ephemeral: true
                })

                return
            }

            try {
                botLogger(client, `A player left from team`, `<@${user}> left from ${userTeam.teamName}`, 'Red', true)
            } catch (error) {
                console.log(error)
            }

            interaction.reply({
                content: 'Succesfully left from team.',
                ephemeral: true
            })
        } catch (error) {
            console.log(error)
            interaction.reply({
                content: `An error has occured.`,
                ephemeral: true
            })
        }
    }
}