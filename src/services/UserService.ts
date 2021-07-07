import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { hash } from "bcryptjs";

import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

interface IAutheticateRequest {
    email: string;
    password: string;
}

class UserService {

    async createUser({ name, email, password, admin = false }: IUserRequest) {
        const userRepository = getCustomRepository(UserRepository);

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await userRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: passwordHash,
            admin
        });

        await userRepository.save(user);

        return user;
    }

    async authenticateUser({ email, password }: IAutheticateRequest) {
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

    async listUserSendCompliments(user_id: string) {
        const complimentRepository = getCustomRepository(ComplimentRepository);

        const compliments = await complimentRepository.find({
            where: {
                user_sender: user_id
            },
            relations: [
                "userReceiver",
                "tag"
            ]
        });

        return compliments;
    }

    async listUserReceiveCompliments(user_id: string) {
        const complimentRepository = getCustomRepository(ComplimentRepository);

        const compliments = await complimentRepository.find({
            where: {
                user_receiver: user_id
            },
            relations: [
                "userSender",
                "tag"
            ],
        });

        return compliments;
    }
}

export { UserService };