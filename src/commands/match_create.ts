import { ChannelType, Client, CommandInteraction, Options, PermissionsBitField } from "discord.js";
import { Command } from "../../src/Command";
import { ROLE } from "../../src/lib/utils/constants";













export const MatchCreate: Command = {
    name: 'match_create',
    description: 'You can create a match with this command.',
    options: [
        { type: ROLE, name: 'home_role', description: 'Home team role', required: true },
        { type: ROLE, name: 'away_role', description: 'Away team role', required: true },
        { type: ROLE, name: 'refree_role', description: 'Refree role', required: true },
        { type: ROLE, name: 'streamer_role', description: 'Streamer role', required: false }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            
            const homeRole = interaction.options.get('home_role')?.value
            const awayRole = interaction.options.get('away_role')?.value

            if (!homeRole || !awayRole) {
                await interaction.reply({
                    content: 'Roles not defined.',
                    ephemeral: true
                })

                return
            }

            const guildId = interaction.guildId

            if (!guildId) {
                await interaction.reply({
                    content: 'Guild not found.',
                    ephemeral: true
                })

                return
            }

            const guild = client.guilds.cache.get(guildId.toString())

            if (!guild) {
                await interaction.reply({
                    content: 'Guild not found.',
                    ephemeral: true
                })

                return
            }

            const appId = client.user?.id || ''

            const textChannel = await guild.channels.create({
                name: `${guild.roles.cache.get(homeRole.toString())?.name} vs <@&${guild.roles.cache.get(awayRole.toString())?.name}>`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    {
                        id: homeRole.toString(),
                        allow: [
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.SendMessages
                        ]
                    },
                    {
                        id: awayRole.toString(),
                        allow: [
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.SendMessages
                        ]
                    },
                    {
                        id: guild.roles.everyone.id,
                        deny: [
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages
                        ]
                    },
                    {
                        id: appId,
                        allow: [
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ViewChannel,
                        ]
                    }
                ]
            })

            textChannel.send({
                content: `<@&${homeRole}> <@&${awayRole}>`
            })

            await interaction.reply({
                content: 'Match created.',
                ephemeral: true
            })
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: 'An error has occured.',
                ephemeral: true
            })
        }
    }
}