import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";












export const RegionLogChannelSet: Command = {
    name: 'legion_log_channel_set',
    description: 'You can set a channel for bot logs.',
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            
        } catch (error) {
            console.log(error)
            interaction.reply({
                content: 'An error has occured.',
                ephemeral: true
            })
        }
    }
}