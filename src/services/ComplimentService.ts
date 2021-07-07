import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class ComplimentService {
    async createCompliment({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentRepository = getCustomRepository(ComplimentRepository);
        const userRepository = getCustomRepository(UserRepository);

        //Verificando se o usuário está enviando para ele mesmo
        if (user_sender === user_receiver) {
            throw new Error("Incorrect user receiver.")
        }

        //Verificando se o usuário destinatário existe
        const userReceiverExists = await userRepository.findOne({
            id: user_receiver
        });

        if (!userReceiverExists) {
            throw new Error("User receiver does not exists.");
        }

        const compliment = complimentRepository.create({
            tag_id, user_sender, user_receiver, message
        });

        await complimentRepository.save(compliment);

        return compliment;
    }
}

export { ComplimentService };