import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../Commands";
import { ButtonInteraction } from "discord.js";
import { Events } from "../../src/Events";


export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        try {
            if (interaction.isButton()) {
                if (interaction.channel && interaction.channel.isTextBased()) {
                    await handleButtonCommand(interaction.customId, client, interaction)
                }
                
            }
            if (interaction.isCommand()) {
                await handleSlashCommand(client, interaction);
            }
        } catch (error) {
            console.log(error)
        }
        
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    try {
        const slashCommand = Commands.find(c => c.name === interaction.commandName);
        if (!slashCommand) {
            interaction.followUp({ content: "An error has occurred" });
            return;
        }
        slashCommand.run(client, interaction);
    } catch (error) {
        console.log(error)
        interaction.followUp({ content: "An error has occurred" });
    }
    
};


const handleButtonCommand = async (customId: string, client: Client, interaction: ButtonInteraction): Promise<void> => {
    try {
        const event = Events.find((e) => customId.startsWith(e.customId))
        if (!event) {
            if (interaction.isRepliable()){
                interaction.followUp({ content: "An error has occurred" })
            }
            return
        }
        event.run(client, interaction) 
    } catch (error) {
        interaction.followUp({ content: "An error has occurred" })
        console.log(error)
    }
       
}



