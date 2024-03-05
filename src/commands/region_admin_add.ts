import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { USER } from "../../src/lib/utils/constants";
import { getUserRegionPermission } from "../../src/lib/utils/region/getUserRegionPermission";
import { Regions } from "../../src/lib/mongodb/models";














export const RegionAdminAdd: Command = {
    name: 'region_admin_add',
    description: 'You can add admin for your region',
    options: [
        { type: USER, name: 'user', description: 'User', required: true }
    ],
    run: async(client: Client, interaction: CommandInteraction) => {

        const user = interaction.user.id
        const admin = interaction.options.get('user')?.value
        const guildId = interaction.guildId

        try {
            if (!guildId || !admin) {
                await interaction.reply({
                    content: 'Missing values',
                    ephemeral: true
                })
    
                return
            }
    
            const permission = await getUserRegionPermission(guildId, user.toString())
    
            if (permission != 'owner') {
                await interaction.reply({
                    content: 'Only owner can add an admin.',
                    ephemeral: true
                })
    
                return
            }
    
            const adminAdd = await Regions.updateOne({
                guildId
            }, {
                $addToSet: {
                    admins: admin.toString()
                }
            })
    
            if (adminAdd.matchedCount == 0) {
                await interaction.reply({
                    content: 'An error has occured',
                    ephemeral: true
                })
    
                return
            }
    
            await interaction.reply({
                content: 'Admin succesfully added.',
                ephemeral: true
            })
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: `Error: ${error}`,
                ephemeral: true
            })
        }
    }
}