import mongoose from "mongoose";
import { regionType, teamType } from "types";
import { regionSchema, teamSchema } from "./schemas";














export const Regions = mongoose.model<regionType>('regions', regionSchema)

export const Teams = mongoose.model<teamType>('teams', teamSchema)