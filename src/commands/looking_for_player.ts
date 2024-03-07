import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { STRING } from "../../src/lib/utils/constants";











export const LookingForPlayer: Command = {
    name: 'looking_for_player',
    description: 'Looking for player',
    options: [
        { type: STRING, name: 'position', description: 'Positions', required: true },
        { type: STRING, name: 'about', description: 'About', required: false }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        //TODO: buralar doldurulacak

        await interaction.reply({
            content: 'Wait',
            ephemeral: true
        })
    }
}