import bcrypt from "bcrypt"
import { PasswordHashOwner } from "../config/types";

class EncryptService {
    async encryptPassword(password: string): Promise<string> { 
        return await bcrypt.hash(password, 10);
    }

    async checkPassword(
        lhs: PasswordHashOwner, rhs: PasswordHashOwner
    ): Promise<boolean> {
        console.log(lhs.password, rhs.password)
        if (!lhs.password || !rhs.password) {
            return false;
        }
        return await bcrypt.compare(lhs.password, rhs.password);
    }
}

const encryptService = new EncryptService()
export default encryptService;