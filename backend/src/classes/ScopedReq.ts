import User from "../database/model/user";
import { Request } from 'express';

export default interface UserScopedRequest extends Request {
    user: User
}