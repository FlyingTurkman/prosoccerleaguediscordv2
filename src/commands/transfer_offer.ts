import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { USER } from "../../src/lib/utils/constants";











export const TransferOffer: Command = {
    name: 'transfer_offer',
    description: 'Transfer offer',
    options: [
        { type: USER, name: 'user', description: 'User', required: true }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        //TODO: Buralar tamamlanacak.

        await interaction.reply({
            content: 'Wait',
            ephemeral: true
        })
    }
}