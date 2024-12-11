import { ApiError } from "../errors/api.error";

import { IUser } from "../types/user.type";

import { ITokenPayload } from "../types/token.type";

import { IQuery } from "../types/pagination.type";

import { EFileType } from "../enums/file-type";
import {userRepository} from "../repositore/user.repository";
import {tokenRepository} from "../repositore/token.repository";

class UserService {
    public async getAll(): Promise<IUser[]> {
        return await userRepository.getAll();
    }
    public async getMany(query:IQuery){
        const queryString = JSON.stringify(query);
        const queryObject = JSON.parse(
            queryString.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
        );

        const usersPaginated = await userRepository.getMany(queryObject);

        return usersPaginated;
    }


    public async getById(id: string): Promise<IUser> {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new ApiError("User not found", 422);
        }
        return user;
    }

    public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
        const user = await userRepository.getById(jwtPayload.userId);
        if (!user) {
            throw new ApiError("You cant get this user", 403);
        }
        return user;
    }

    public async updateMe(
        jwtPayload: ITokenPayload,
        body: Partial<IUser>,
    ): Promise<IUser> {
        const user = await userRepository.getById(jwtPayload.userId);
        if (!user) {
            throw new ApiError("User not found", 403);
        }
        return await userRepository.updateById(jwtPayload.userId, body);
    }

    public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
        const user = await userRepository.getById(jwtPayload.userId);
        if (!user) {
            throw new ApiError("User not found", 403);
        }
        await Promise.all([
            userRepository.deleteById(jwtPayload.userId),
            tokenRepository.deleteManyBy(jwtPayload.userId),
        ]);
    }


}

export const userService = new UserService();