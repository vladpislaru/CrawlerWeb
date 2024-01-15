import Token from "../model/token";
import User from "../model/user";
import Link from "../model/links";

class DBSyncService {
    sync() {
        User.sync();
        Link.sync();
        Token.sync();
    }
}

const dbSyncService = new DBSyncService()
export default dbSyncService;