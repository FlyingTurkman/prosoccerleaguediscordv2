import mongoose from "mongoose";
import { matchType, regionType, teamType, transferOfferType, userType } from "types";
import { matchSchema, regionSchema, teamSchema, transferOfferSchema, userSchema } from "./schemas";














export const Regions = mongoose.model<regionType>('regions', regionSchema)

export const Teams = mongoose.model<teamType>('teams', teamSchema)

export const Users = mongoose.model<userType>('users', userSchema)

export const TransferOffers = mongoose.model<transferOfferType>('transferOffers', transferOfferSchema)

export const Matches = mongoose.model<matchType>('matches', matchSchema)