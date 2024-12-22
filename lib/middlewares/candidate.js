import { getServerSession } from "next-auth"
import authOptions from "../../pages/api/auth/[...nextauth]"


export const MiddlewareCandidate = (handler) => async (req, res) => {
    try {
        const session = await getServerSession(req, res, authOptions)
        console.log("[Middleware] Session - ", session)
    } catch (err) {
        
    }
}