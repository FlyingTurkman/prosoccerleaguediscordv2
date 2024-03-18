import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "../../src/Command";
import { USER, transferColor } from "../../src/lib/utils/constants";
import { checkUserTeamPermission } from "../../src/lib/utils/team/checkUserTeamPermission";
import { getUserTeam } from "../../src/lib/utils/team/getUserTeam";
import { teamType, transferOfferType } from "../../types";
import { TransferOffers } from "../../src/lib/mongodb/models";
import { ObjectId } from "mongodb";
import { botLogger } from "../../src/lib/utils/botLogger";











export const TransferOffer: Command = {
    name: 'transfer_offer',
    description: 'Transfer offer',
    options: [
        { type: USER, name: 'user', description: 'User', required: true }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        //TODO: Buralar tamamlanacak.

        try {
            
            const user = interaction.user.id
            const player = interaction.options.get('user')?.value

            if (!player) {
                await interaction.reply({
                    content: 'Please choose a player.',
                    ephemeral: true
                })

                return
            }

            const playerAccount = client.users.cache.get(player.toString())

            if (playerAccount?.bot) {
                await interaction.reply({
                    content: 'You can not send transfer offer to bots.',
                    ephemeral: true
                })

                return
            }

            const userTeam = await getUserTeam(user)

            if (!userTeam) {
                await interaction.reply({
                    content: 'You are not in a team.',
                    ephemeral: true
                })

                return
            }

            const userPermission = await checkUserTeamPermission(user)

            if (userPermission != 'owner' && userPermission != 'captain' && userPermission != 'coCaptain') {
                await interaction.reply({
                    content: 'You have no permission for this command.',
                    ephemeral: true
                })

                return
            }

            const playerTeam = await getUserTeam(player.toString())

            if (playerTeam?.owner == player || playerTeam?.captain == player) {
                await interaction.reply({
                    content: 'You can not send transfer offer to other team owner or captain.',
                    ephemeral: true
                })

                return
            }

            if (userTeam._id.toString() == playerTeam?._id.toString()) {
                await interaction.reply({
                    content: 'This player already in your team.',
                    ephemeral: true
                })

                return
            }

            const newTransferOffer: transferOfferType | null = await TransferOffers.create({
                _id: new ObjectId(),
                fromPlayer: user,
                fromTeam: userTeam._id.toString(),
                toPlayer: player.toString(),
                toTeam: playerTeam? playerTeam._id.toString(): undefined,
                teamAccepted: playerTeam? 'waitingForResponse': 'accepted',
                playerAccepted: 'waitingForResponse',
                botChecked: false,
                createdAt: new Date(),
                updateAt: new Date()
            })

            if (!newTransferOffer) {
                await interaction.reply({
                    content: 'An error has occured.',
                    ephemeral: true
                })

                return
            }

            const embed = new EmbedBuilder()

            embed.setTitle(`${userTeam.teamName} [${userTeam.teamTag}] want to transfer you.`)

            if (userTeam.teamAvatar) {
                embed.setThumbnail(userTeam.teamAvatar)
            }
            
            embed.addFields([
                { name: 'Offer from team', value: userTeam.teamName || 'Unknown' },
                { name: 'Offer from player', value: client.users.cache.get(user)?.username || 'Unknown'}
            ])

            const row = new ActionRowBuilder<ButtonBuilder>()
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId(`response_transfer_offer_${newTransferOffer._id.toString()}_accepted`)
                    .setLabel('Accept')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId(`response_transfer_offer_${newTransferOffer._id.toString()}_rejected`)
                    .setLabel('Reject')
                    .setStyle(ButtonStyle.Danger)
            )

            try {
                botLogger(client, `New transfer offer from ${userTeam.teamName}` ,`<@${user}> sended transfer offer to <@${player.toString()}> from ${userTeam.teamName}`, transferColor)
            } catch (error) {
                console.log(error)
            }

            await client.users.cache.get(player.toString())?.send({
                content: `<@${user}> for contact.`,
                embeds: [embed],
                components: [row]
            })

            await interaction.reply({
                content: 'Transfer offer succesfully sended.',
                ephemeral: true
            })

            /* if (playerTeam) {

                if (playerTeam.owner == player || playerTeam.captain == player) {
                    await interaction.reply({
                        content: 'You can not send a transfer offer to team owner or team captain.',
                        ephemeral: true
                    })

                    return
                }

                const newTransferOffer: transferOfferType | null = await TransferOffers.create({
                    _id: new ObjectId(),
                    fromPlayer: user,
                    fromTeam: userTeam._id.toString(),
                    toPlayer: player.toString(),
                    toTeam: playerTeam? playerTeam._id.toString(): undefined,
                    teamAccepted: playerTeam? 'waitingForResponse': 'accepted',
                    playerAccepter: 'waitingForResponse',
                    botChecked: false,
                    createdAt: new Date(),
                    updateAt: new Date()
                })

                if (!newTransferOffer) {
                    await interaction.reply({
                        content: 'An error has occured.',
                        ephemeral: true
                    })

                    return
                }

                const embed = new EmbedBuilder()

                embed.setTitle(`${userTeam.teamName} [${userTeam.teamTag}] want to transfer you.`)
                if (userTeam.teamAvatar) {
                    embed.setThumbnail(userTeam.teamAvatar)
                }
                
                embed.addFields([
                    { name: 'Offer from team', value: userTeam.teamName },
                    { name: 'Offer from player', value: client.users.cache.get(user)?.username || 'Unknown'}
                ])

                const row = new ActionRowBuilder<ButtonBuilder>()
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`accept_transfer_offer_${newTransferOffer._id.toString()}`)
                        .setLabel('Accept')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`reject_transfer_offer_${newTransferOffer._id.toString()}`)
                        .setLabel('Reject')
                        .setStyle(ButtonStyle.Danger)
                )

                await client.users.cache.get(player.toString())?.send({
                    content: `<@${user}> for contact.`,
                    embeds: [embed],
                    components: [row]
                })

                await interaction.reply({
                    content: 'Transfer offer succesfully sended.',
                    ephemeral: true
                })
            } */
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: `Error: ${error}`,
                ephemeral: true
            })
        }
    }
}