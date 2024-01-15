class TokenService {
    private tokenSize = 16;
    private characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    private charactersLength = this.characters.length;
    private expirationMinutes = 30;

    generateToken(): string {
        let result = '';
        for(let i = 0; i < this.tokenSize; i++) {
            const position = Math.floor(Math.random() * this.charactersLength);
            result += this.characters.charAt(position);
        }

        return result;
    }

    generateExpirationDate(): Date {
        const now = new Date();
        now.setMinutes(now.getMinutes() + this.expirationMinutes);
        return now;
    }
}

const tokenService = new TokenService();
export default tokenService;