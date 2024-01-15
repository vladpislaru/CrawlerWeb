import User from "../database/model/user";

declare global {
    declare namespace Express {
        export interface Request {
            user?: User
        }
    }
}
 export default Express.Request;