import { Request, Response, NextFunction } from 'express';

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    //Verificação do usuário
    const admin = true;
    if (admin) {
        return next();
    }
    return response.status(401).json({
        error: "Unauthorized. User have to be admin to realize this operation.",
    });
}