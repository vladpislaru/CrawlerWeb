import { StatusCodes } from "http-status-codes";
import Token from "../database/model/token";
import User from "../database/model/user";

async function loggedInAccount(req: any, res: any, next: any) {
    const tokenString = req.headers["token"];
    console.log(req.headers);
    if (!tokenString) {
        res.status(StatusCodes.UNAUTHORIZED).send()
        return
    }

    const token = await Token.findOne(
        {
            where: {
                token: tokenString
            },
            include: User
        }
    )
    const user = await token?.getUser() ?? null;

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).send()
        return
    }
    
    req.user = user
    next()
}

export default loggedInAccount;