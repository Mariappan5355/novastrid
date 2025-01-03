import { register, login } from '../services/login.service';
import { Request } from 'express'

export const registerUser = async (req: Request, res: any) => {
    try {
        const response: any = await register(req.body);
        res.status(response?.statusCode).send(response);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
}
export const loginUser = async (req: any, res: any) => {
    try {
        const response:any = await login(req.body);
        res.status(response?.statusCode).send(response);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
}