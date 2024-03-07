import { Client, CommandInteraction } from "discord.js";
import { Command } from "../../src/Command";
import { userType } from "../../types";
import { Users } from "../../src/lib/mongodb/models";
import { checkUserRegistered } from "../../src/lib/utils/user/checkUserRegistered";
import { ObjectId } from "mongodb";
















export const Register: Command = {
    name: 'register',
    description: 'You can register your profile with this command.',
    run: async (client: Client, interaction: CommandInteraction) => {
        try {
            
            const userId = interaction.user.id
            const userName = client.users.cache.get(userId)?.username

            if (!userName) {
                await interaction.reply({
                    content: 'Discord username not found.',
                    ephemeral: true
                })

                return
            }

            const userExist = await checkUserRegistered(userId)

            if (userExist) {
                await interaction.reply({
                    content: 'You are already registered your profile.',
                    ephemeral: true
                })

                return
            }


            const newUser: userType | null = await Users.create({
                _id: new ObjectId(),
                userId,
                userName,
                createdAt: new Date()
            })

            if (!newUser) {
                await interaction.reply({
                    content: 'An error has occured.',
                    ephemeral: true
                })

                return
            }

            await interaction.reply({
                content: 'Succesfully registered.',
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