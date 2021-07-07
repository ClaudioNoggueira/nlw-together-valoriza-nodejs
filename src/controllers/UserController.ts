import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async createUser(request: Request, response: Response) {
        const { name, email, password, admin } = request.body;

        const userService = new UserService();

        const user = await userService.createUser({ name, email, password, admin });

        return response.json(user);
    }

    async authenticateUser(request: Request, response: Response) {
        const { email, password } = request.body;

        const userService = new UserService();

        const token = await userService.authenticateUser({
            email, password
        });

        return response.json(token);
    }

    async listUsers(request: Request, response: Response) {
        const service = new UserService();

        const users = await service.listUser();

        return response.json(users);
    }

    async listUserSendComplimentsController(request: Request, response: Response) {
        const { user_id } = request;

        const listUserSendComplimentService = new UserService();

        const compliments = await listUserSendComplimentService.listUserSendCompliments(user_id);

        return response.json(compliments);
    }

    async listUserReceiveComplimentsController(request: Request, response: Response) {
        const { user_id } = request;

        const listUserReceiveCompliementService = new UserService();

        const compliments = await listUserReceiveCompliementService.listUserReceiveCompliments(user_id);

        return response.json(compliments);
    }
}

export { UserController };