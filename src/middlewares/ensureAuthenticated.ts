import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    //Receber o token
    const authToken = request.headers.authorization

    //Validar se token está preechido
    if (!authToken) {
        return response.status(401).end();
    }

    //Validar se token é válido
    const [, token] = authToken.split(" ");
    try {
        const { sub } = verify(token, "5b4c448ebd809cccd00a83c29bd3e7a9") as IPayload;

        //Recuperar informações do usuário
        request.user_id = sub;
        return next();
    } catch (err) {
        return response.status(401).end();
    }
}