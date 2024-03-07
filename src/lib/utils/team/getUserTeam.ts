import { Teams } from "../../../../src/lib/mongodb/models";
import { teamType } from "../../../../types";
















export async function getUserTeam(userId: string): Promise<teamType | null> {
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
            return null
        }

        console.log('team', team)

        return team
    } catch (error) {
        console.log(error)
        return null
    }
}