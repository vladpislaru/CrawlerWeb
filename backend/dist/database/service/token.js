"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenService {
    constructor() {
        this.tokenSize = 16;
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.charactersLength = this.characters.length;
        this.expirationMinutes = 30;
    }
    generateToken() {
        let result = '';
        for (let i = 0; i < this.tokenSize; i++) {
            const position = Math.floor(Math.random() * this.charactersLength);
            result += this.characters.charAt(position);
        }
        return result;
    }
    generateExpirationDate() {
        const now = new Date();
        now.setMinutes(now.getMinutes() + this.expirationMinutes);
        return now;
    }
}
const tokenService = new TokenService();
exports.default = tokenService;
//# sourceMappingURL=token.js.map