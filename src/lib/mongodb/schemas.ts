import { Schema } from "mongoose";
import { regionType, teamType, transferOfferType, userType } from '../../../types'









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


export const userSchema = new Schema<userType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    steamId: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    }
})


export const transferOfferSchema = new Schema<transferOfferType>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    fromTeam: {
        type: String,
        required: true
    },
    fromPlayer: {
        type: String,
        required: true
    },
    toPlayer: {
        type: String,
        required: true
    },
    toTeam: {
        type: String,
        required: false
    },
    teamAccepted: {
        type: Schema.Types.Mixed,
        required: true
    },
    playerAccepted: {
        type: Schema.Types.Mixed,
        required: true
    },
    botChecked: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updateAt: {
        type: Date,
        required: true
    }
})