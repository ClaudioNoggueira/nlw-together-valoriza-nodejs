import { Request, Response } from "express";
import { ComplimentService } from "../services/ComplimentService";

class ComplimentController {
    async createCompliment(request: Request, response: Response) {
        const { tag_id, user_receiver, message } = request.body;
        const { user_id } = request;

        const complimentService = new ComplimentService();

        const compliment = await complimentService.createCompliment({
            tag_id, user_sender: user_id, user_receiver, message
        });

        return response.json(compliment);
    }
}

export { ComplimentController };