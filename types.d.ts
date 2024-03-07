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


declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string,
            mongoUri: string,
            appPath: string,
            dbName: string
        }
    }
}

export {}