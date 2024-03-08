import { Client, Interaction } from "discord.js";
import { buttonInteractionType } from "types";







const customId = 'accept_transfer_offer_'




export const AcceptTransferOffer: buttonInteractionType = {
    customId,
    run: async (client: Client, interaction: Interaction) => {
        if (!interaction.isButton()) return
        try {
            /* let docId = interaction.customId
            
            console.log('custom id',interaction.customId)

            docId = docId.replaceAll(customId, '')

            console.log('docId',docId) */

            await interaction.reply({
                content: 'Tested'
            })
        } catch (error) {
            console.log(error)
            
        }
    }
}