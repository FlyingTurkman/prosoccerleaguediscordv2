import { Users } from "../../mongodb/models"
import { userType } from "../../../../types"












export async function checkUserRegistered(userId: string): Promise<boolean> {
    try {

        const user: userType | null = await Users.findOne({
            userId
        })

        if (!user) {
            return false
        } else {
            return true
        }

    } catch (error) {
        console.log(error)
        return false
    }
}