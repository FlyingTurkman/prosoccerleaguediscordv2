import { Client } from "discord.js"
import { Teams, TransferOffers } from "../../src/lib/mongodb/models"
import { teamType, transferOfferType } from "../../types"
import { botLogger } from "../../src/lib/utils/botLogger"
import { transferColor } from "../../src/lib/utils/constants"












export default async function transferListener(client: Client) {

    try {
        console.log('Transfer offers listening.')

        const watch = TransferOffers.watch([
            {
                $match: {
                    'fullDocument.teamAccepted': 'accepted' ,
                    'fullDocument.playerAccepted': 'accepted',
                    'fullDocument.botChecked': false
                }
            }
            
        ], { fullDocument: 'updateLookup', hydrate: true })

        watch.on('change', async(data) => {
            if (data.operationType == 'insert' || data.operationType == 'update') {
                
                const transferOffer: transferOfferType = data.fullDocument

                transferPlayer(client, transferOffer)
            }
        })
    } catch (error) {
        console.log(error)
    }
    
}

async function transferPlayer(client: Client, transferOffer: transferOfferType) {
    try {
        /* await Teams.updateOne({
            _id: transferOffer.fromTeam
        }, {
            $addToSet: {
                members: transferOffer.toPlayer
            }
        }) */

        const toTeam: teamType | null = await Teams.findByIdAndUpdate({
            _id: transferOffer.fromTeam
        }, {
            $addToSet: {
                members: transferOffer.toPlayer
            }
        }, { new: true })



        //TODO: burada co-captain ise co-captain undefined olarak değiştirilecek.
        if (transferOffer.toTeam) {
            await Teams.updateOne({
                _id: transferOffer.toTeam
            }, {
                $pull: {
                    members: transferOffer.toPlayer
                }
            })
        }

        

        await TransferOffers.updateOne({
            _id: transferOffer._id.toString()
        }, {
            $set: {
                botChecked: true
            }
        })

        await TransferOffers.updateMany({
            toPlayer: transferOffer.toPlayer,
            botChecked: false
        }, {
            $set: {
                playerAccepted: 'rejected'
            }
        })

        botLogger(client, `Transfer offer accepted`, `<@${transferOffer.toPlayer}> joined to ${toTeam?.teamName}`, transferColor)
    } catch (error) {
        console.log(error)
    }
}