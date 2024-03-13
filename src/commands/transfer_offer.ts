import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "../../src/Command";
import { USER } from "../../src/lib/utils/constants";
import { checkUserTeamPermission } from "../../src/lib/utils/team/checkUserTeamPermission";
import { getUserTeam } from "../../src/lib/utils/team/getUserTeam";
import { teamType, transferOfferType } from "../../types";
import { TransferOffers } from "../../src/lib/mongodb/models";
import { ObjectId } from "mongodb";











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
                { name: 'Offer from team', value: userTeam.teamName },
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