import { ObjectId } from "mongodb"






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