import { Client, Interaction } from "discord.js"
import { ObjectId } from "mongodb"



//TODO: in game id eklenecek

export type userType = {
    _id: ObjectId,
    userId: string,
    userName: string,
    steamId?: string,
    createdAt: Date
}



export type regionType = {
    _id: ObjectId,
    guildId: string,
    regionName: string,
    regionTag: string,
    regionAvatar: string,
    owner: string,
    admins: string[],
    mods?: string[],
    official: boolean,
    createdAt: Date
}

export type regionPermissionType = 'owner' | 'admin' | 'mod' | 'notPermission'


export type teamType = {
    _id: ObjectId,
    guildId: string,
    teamName: string,
    teamTag: string,
    teamAvatar?: string,
    owner: string,
    captain: string,
    coCaptain?: string,
    members: string[],
    createdAt: Date
}

export type teamPermissionType = 'owner' | 'captain' | 'coCaptain' | 'member' | 'notPermission'


//TODO: accepted değerleri değiştirilecek

export type transferOfferType = {
    _id: ObjectId,
    fromPlayer: string,
    fromTeam: string,
    toPlayer: string,
    toTeam?: string,
    teamAccepted: transferStatusType,
    playerAccepted: transferStatusType,
    botChecked: boolean,
    createdAt: Date,
    updateAt: Date
}


export type transferStatusType = 'waitingForResponse' | 'accepted' | 'rejected'


export type buttonInteractionType = {
    customId: string,
    run: (client: Client, interaction: Interaction) => void
}

export type matchType = {
    _id: ObjectId,
    homeTeam: string,
    awayTeam: string,
    streamers?: string[],
    homePlayers?: string[],
    awayPlayers?: string[],
    result: matchResultType,
    homeScore: number,
    awayScore: number,
    leagueId: number,
    createdAt: Date
}

export type matchResultType = 'notPlayed' | 'home' | 'draw' | 'away'


declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string,
            mongoUri: string,
            appPath: string,
            dbName: string,
            botLogChannelId: string,
            adminId: string,
            viceAdminId: string
        }
    }
}

export {}