import { ApplicationCommandType, Client, CommandInteraction } from "discord.js";
import { Command } from "../Command";














export const Hello: Command = {
    name: 'hello',
    description: 'Returns a greetings',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.reply({
            content: 'test',
            ephemeral: true
        })
    }
}