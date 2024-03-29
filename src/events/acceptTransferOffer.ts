import { Client, Interaction } from "discord.js";
import { Teams, TransferOffers } from "../../src/lib/mongodb/models";
import { buttonInteractionType, teamType, transferOfferType } from "../../types";







const customId = 'accept_transfer_offer_'




export const AcceptTransferOffer: buttonInteractionType = {
    customId,
    run: async (client: Client, interaction: Interaction) => {
        if (!interaction.isButton()) return
        try {
            const user = interaction.user.id

            let docId = interaction.customId
            docId = docId.replaceAll(customId, '')

            const transferOffer: transferOfferType | null = await TransferOffers.findOne({
                _id: docId
            })

            if (!transferOffer) {
                await interaction.reply({
                    content: 'Transfor offer not found.',
                    ephemeral: true
                })

                return
            }

            if (transferOffer.toPlayer == user && transferOffer.playerAccepted != 'waitingForResponse') {
                await interaction.reply({
                    content: 'This offer already replied.',
                    ephemeral: true
                })

                return
            } else if (transferOffer.teamAccepted != 'waitingForResponse') {
                await interaction.reply({
                    content: 'This offer already replied.',
                    ephemeral: true
                })

                return
            }

            if (transferOffer.toPlayer == user) {

                const transferOfferUpdate = await TransferOffers.updateOne({
                    _id: docId
                }, {
                    $set: {
                        playerAccepted: 'accepted',
                        updateAt: new Date()
                    }
                })

                if (!transferOffer || transferOfferUpdate.matchedCount == 0) {
                    await interaction.reply({
                        content: 'An error has occured.',
                        ephemeral: true
                    })

                    return
                }

                await interaction.reply({
                    content: 'Offer succesfull accepted. Waiting for system confirmation.',
                    ephemeral: true
                })
            } else {
                let userTeam: teamType | null = transferOffer.toTeam? await Teams.findOne({ _id: transferOffer.toTeam }): null

                if (!userTeam) {
                    await interaction.reply({
                        content: 'You have no permission for this.',
                        ephemeral: true
                    })

                    return
                }

                if (userTeam.owner != user && userTeam.captain != user && userTeam.coCaptain != user) {
                    await interaction.reply({
                        content: 'You have no permission for this.',
                        ephemeral: true
                    })

                    return
                }

                const transferOfferUpdate = await TransferOffers.updateOne({
                    _id: docId
                }, {
                    $set: {
                        teamAccepted: 'accepted',
                        updatedAt: new Date()
                    }
                })

                if (!transferOffer || transferOfferUpdate.matchedCount == 0) {
                    await interaction.reply({
                        content: 'An error has occured.',
                        ephemeral: true
                    })

                    return
                }

                await interaction.reply({
                    content: 'Offer succesfull accepted. Waiting for system confirmation.',
                    ephemeral: true
                })
            }


        } catch (error) {
            console.log(error)
            
        }
    }
}