
import { ERole } from "../enums/role.enum";
import { ApiError } from "../errors/api.error";

import { ILogin } from "../types/auth.type";
import { IUser } from "../types/user.type";


import { ITokenPayload, ITokensPair } from "../types/token.type";
import { tokenService } from "./token.service";


import { passwordService } from "./password.service";

import {userRepository} from "../repositore/user.repository";
import {tokenRepository} from "../repositore/token.repository";
import {emailService} from "./email.service";
import {EEmailAction} from "../enums/email-action.enum";

class AuthService {
    public async signUpAdmin(dto: Partial<IUser>): Promise<IUser> {
        const userFromDb = await userRepository.getOneByParams({
            email: dto.email,
        });
        if (userFromDb) {
            throw new ApiError("User with provided email already exists", 400);
        }

        const hashedPassword = await passwordService.hash(dto.password);


        return await userRepository.create({
            ...dto,
            password: hashedPassword,
            role: ERole.ADMIN,
        });
    }

    public async signInAdmin(dto: ILogin): Promise<ITokensPair> {
        const user:any = await userRepository.getOneByParams({
            email: dto.email,
            role: ERole.ADMIN,
        });
        if (!user) {
            throw new ApiError("Not valid email or password", 401);
        }

        const isMatch = await passwordService.compare(dto.password, user.password);
        if (!isMatch) {
            throw new ApiError("Not valid email or password", 401);
        }

        const jwtTokens = tokenService.generateTokenPair(
            { userId: user._id, role: ERole.ADMIN },
            ERole.ADMIN,
        );
        await tokenRepository.create({ ...jwtTokens, _userId: user._id });

        return jwtTokens;
    }

    public async signUp(dto: Partial<IUser>): Promise<IUser> {
        const userFromDb = await userRepository.getOneByParams({
            email: dto.email,
        });
        if (userFromDb) {
            throw new ApiError("User with provided email already exists", 400);
        }

        const hashedPassword = await passwordService.hash(dto.password);
        const createdUser = await userRepository.create({
            ...dto,
            password: hashedPassword,
            role: ERole.USER,
        });

        try {
            await emailService.sendMail(dto.email, EEmailAction.WELCOME, {
                name: dto.name || 'наш новий користувач',
            });
        } catch (error) {
            console.error(`Failed to send welcome email to ${dto.email}:`, error);
        }

        return createdUser;
    }

    public async signIn(dto: ILogin): Promise<ITokensPair> {
        const user = await userRepository.getOneByParams({ email: dto.email });
        if (!user) throw new ApiError("Not valid email or password", 401);

        const isMatch = await passwordService.compare(dto.password, user.password);
        if (!isMatch) throw new ApiError("Not valid email or password", 401);

        const jwtTokens = tokenService.generateTokenPair(
            { userId: user._id.toString(), role: ERole.USER },
            ERole.USER,
        );
        await tokenRepository.create({ ...jwtTokens, _userId: user._id.toString() });

        return jwtTokens;
    }

    public async refresh(
        jwtPayload: ITokenPayload,
        refreshToken: string,
    ): Promise<ITokensPair> {
        const user = await userRepository.getById(jwtPayload.userId.toString());
        await tokenRepository.deleteOneByParams({ refreshToken });

        const jwtTokens = tokenService.generateTokenPair(
            {
                userId: jwtPayload.userId,
                role: user.role,
            },
            user.role,
        );
        await tokenRepository.create({
            ...jwtTokens,
            _userId:jwtPayload.userId
        });

        return jwtTokens;
    }
}

export const authService = new AuthService();