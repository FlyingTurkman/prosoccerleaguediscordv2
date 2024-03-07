import { Teams } from "../../../../src/lib/mongodb/models";
import { teamPermissionType, teamType } from "../../../../types";

















export async function checkUserTeamPermission(userId: string): Promise<teamPermissionType> {
    try {
        const team: teamType | null = await Teams.findOne({
            $or: [
                { owner: userId },
                { captain: userId },
                { coCaptain: userId },
                { members: { $in: [userId] } }
            ]
        })

        if (!team) {
            return 'notPermission'
        }

        if (team.owner == userId) {
            return 'owner'
        }

        if (team.captain == userId) {
            return 'captain'
        }

        if (team.coCaptain == userId) {
            return 'coCaptain'
        }

        if (team.members.includes(userId)) {
            return 'member'
        }

        return 'notPermission'
    } catch (error) {
        console.log(error)
        return 'notPermission'
    }
}