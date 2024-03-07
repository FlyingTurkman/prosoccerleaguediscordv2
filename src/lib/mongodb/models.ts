import mongoose from "mongoose";
import { regionType, teamType, userType } from "types";
import { regionSchema, teamSchema, userSchema } from "./schemas";














export const Regions = mongoose.model<regionType>('regions', regionSchema)

export const Teams = mongoose.model<teamType>('teams', teamSchema)

export const Users = mongoose.model<userType>('users', userSchema)