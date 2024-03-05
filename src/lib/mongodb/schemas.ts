import { Schema } from "mongoose";
import { regionType, teamType } from '../../../types'









export const regionSchema = new Schema<regionType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    regionName: {
        type: String,
        required: true
    },
    regionTag: {
        type: String,
        required: true
    },
    regionAvatar: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: true
    },
    admins: [String],
    official: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})


export const teamSchema = new Schema<teamType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    teamTag: {
        type: String,
        required: true
    },
    teamAvatar: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: true
    },
    captain: {
        type: String,
        required: true
    },
    coCaptain: {
        type: String,
        required: false
    },
    members: [String],
    createdAt: {
        type: Date,
        required: true
    }
})