import mongoose from "mongoose";
import { regionType } from "types";
import { regionSchema } from "./schemas";














export const Regions = mongoose.model<regionType>('regions', regionSchema)