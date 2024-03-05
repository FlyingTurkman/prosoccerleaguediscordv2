import { teamType } from "types"
import { Teams } from "../../../../src/lib/mongodb/models"












export async function checkUserTeamId(userId: string): Promise<string | null> {
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

        return team.guildId
    } catch (error) {
        console.log(error)
        return null
    }
}