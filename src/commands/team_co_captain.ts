import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { USER } from "../../src/lib/utils/constants";













export const TeamCoCaptain: Command = {
    name: 'team_co_captain',
    description: 'Team co captain',
    options: [
        { type: USER, name: 'user', description: 'User', required: true }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        //TODO: Buralar yapılacak

        await interaction.reply({
            content: 'Wait',
            ephemeral: true
        })
    }
}