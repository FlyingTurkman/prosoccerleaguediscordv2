import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
















export const Register: Command = {
    name: 'register',
    description: 'Register',
    run: async (client: Client, interaction: CommandInteraction) => {
        //TODO: buralar doldurulacak
        
        await interaction.reply({
            content: 'Wait',
            ephemeral: true
        })
    }
}