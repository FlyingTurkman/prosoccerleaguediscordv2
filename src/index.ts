import { Client } from 'discord.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import ready from './listeners/ready'
import interactionCreate from './listeners/interactionCreate'







dotenv.config()



console.log('Bot is starting...')



const client =  new Client({
    intents: [
        'Guilds',
        'GuildMessages',
        'GuildMembers',
        'GuildPresences',
        'MessageContent',
        'GuildMembers'
    ]
})



try {
    mongoose.connect(process.env.mongoUri || '', {dbName: 'test'})
.then(() => {
    console.log('Bağlantı başarıyla kuruldu')
})
} catch (error) {
    console.log('Veri tabanı bağlantısı başarısız.')
}



ready(client)
interactionCreate(client)

client.login(process.env.botToken)