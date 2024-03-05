import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { Regions } from "../../src/lib/mongodb/models";
import { STRING } from "../../src/lib/utils/constants";
import { regionType } from "../../types";
import { ObjectId } from "mongodb";











export const RegionCreate: Command = {
    name: 'region_create',
    description: 'You can create region for your leagues.',
    options: [
        { type: STRING, name: 'region_name', description: 'Region Name', required: true, min_length: 3, max_length: 25 },
        { type: STRING, name: 'region_tag', description: 'Region Tag', required: true, min_length: 3, max_length: 5 } 
    ],
    run: async(client: Client, interaction: CommandInteraction) => {
        const regionName = interaction.options.get('region_name')?.value || ''
        const regionTag = interaction.options.get('region_tag')?.value || ''
        const ownerId = interaction.member?.user.id || ''
        const guildId = interaction.guildId || ''
        const regionAvatar = interaction.guild?.iconURL() || ''
        try {
            
            const regionExist: regionType | null = await Regions.findOne({
                guildId
            })

            if (regionExist) {
                await interaction.reply({
                    content: 'This guild using for other region.',
                    ephemeral: true
                })

                return
            }

            const newRegion: regionType | null = await Regions.create({
                _id: new ObjectId(),
                guildId,
                regionName,
                regionTag,
                regionAvatar,
                owner: ownerId,
                admins: [ownerId],
                official: false,
                createdAt: new Date()
            })

            if (!newRegion) {
                await interaction.reply({
                    content: 'An error has occured.',
                    ephemeral: true
                })
            }

            await interaction.reply({
                content: 'Region succesfully created.',
                ephemeral: true
            })
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: error,
                ephemeral: true
            })
        }
    }
}