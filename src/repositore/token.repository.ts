import { IToken } from "../types/token.type";
import { Token } from "../models/token.model";


class TokenRepository {
    public async create(data: Partial<IToken>) {
        return await Token.create(data);
    }

    public async getOneBy(params: Partial<IToken>): Promise<IToken> {
        return await Token.findOne(params);
    }

    public async deleteManyBy(userId: string): Promise<void> {
        await Token.deleteMany({ _userId: userId });
    }

    public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
        await Token.deleteOne(params);
    }



}

export const tokenRepository = new TokenRepository();