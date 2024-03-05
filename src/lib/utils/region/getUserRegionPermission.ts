import { Regions } from "../../../../src/lib/mongodb/models";
import { regionPermissionType, regionType } from "types";










export async function getUserRegionPermission(guildId: string, userId: string): Promise<regionPermissionType> {
    try {
        
        const region: regionType | null = await Regions.findOne({
            guildId
        })

        if (!region) {
            return 'notPermission'
        }

        if (region.owner == userId) return 'owner'
        if (region.admins.includes(userId)) return 'admin'
        if (region.mods?.includes(userId)) return 'mod'
        return 'notPermission'
    } catch (error) {
        console.log(error)
        return "notPermission"
    }
}