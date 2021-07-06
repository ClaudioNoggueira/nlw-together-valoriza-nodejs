import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

interface IAutheticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAutheticateRequest) {
        const userRepository = getCustomRepository(UserRepository);

        //Verificar se o email existe
        const user = await userRepository.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password is incorrect");
        }

        //Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Password is incorrect");
        }

        //Gerar token
        const token = sign(
            {
                email: user.email
            },
            "5b4c448ebd809cccd00a83c29bd3e7a9",
            {
                subject: user.id,
                expiresIn: "1d"
            });

        return token;
    }
}

export { AuthenticateUserService };