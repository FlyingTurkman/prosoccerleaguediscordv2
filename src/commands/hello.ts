import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "../Command";














export const Hello: Command = {
    name: 'hello',
    description: 'Returns a greetings',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        const userId = '615661042437062814'

        const row = new ActionRowBuilder<ButtonBuilder>()
        row.addComponents(
            new ButtonBuilder()
                .setCustomId(`accept_transfer_offer_askdjhajksdhasdasd`)
                .setLabel('Tıkla')
                .setStyle(ButtonStyle.Success)
        )

        await interaction.reply({
            content: 'Test',
            ephemeral: true
        })

        await client.users.cache.get(userId)?.send({
            content: 'Test et',
            components: [row]
        })
    }
}