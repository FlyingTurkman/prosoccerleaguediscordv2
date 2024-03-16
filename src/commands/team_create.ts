import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { Teams } from "../../src/lib/mongodb/models";
import { STRING, teamColor } from "../../src/lib/utils/constants";
import { teamType } from "../../types";
import { checkUserTeamId } from "../../src/lib/utils/team/checkUserTeamId";
import { ObjectId } from "mongodb";
import { botLogger } from "../../src/lib/utils/botLogger";













export const TeamCreate: Command = {
    name: 'team_create',
    description: 'You can create a team with this command.',
    options: [
        { type: STRING, name: 'team_name', description: 'Team Name', required: true, min_length: 5, max_length: 30 },
        { type: STRING, name: 'team_tag', description: 'Team Tag', required: true, min_length: 3, max_length: 5 }
    ],
    run: async(client: Client, interaction: CommandInteraction) => {
        try {
            const teamName = interaction.options.get('team_name')?.value
            const teamTag = interaction.options.get('team_tag')?.value
            const teamAvatar = interaction.guild?.iconURL()
            const guildId = interaction.guildId
            const owner = interaction.user.id

            const teamExist: teamType | null = await Teams.findOne({
                guildId
            })

            if (teamExist) {
                interaction.reply({
                    content: 'This guild using for other team.',
                    ephemeral: true
                })

                return
            }

            const userTeamId = await checkUserTeamId(owner)

            if (userTeamId) {
                await interaction.reply({
                    content: 'You are already in a team.',
                    ephemeral: true
                })

                return
            }

            const newTeam: teamType | null = await Teams.create({
                _id: new ObjectId,
                guildId,
                teamName,
                teamTag,
                teamAvatar: teamAvatar? teamAvatar: undefined,
                owner,
                captain: owner,
                members: [owner],
                createdAt: new Date()
            })

            if (!newTeam) {
                await interaction.reply({
                    content: 'An error has occured.',
                    ephemeral: true
                })

                return
            }

            try {
                botLogger(client, `${teamName} team created`, `Team created by <@${owner}>`, teamColor)
            } catch (error) {
                console.log(error)
            }

            await interaction.reply({
                content: 'Your team succesfully created.',
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