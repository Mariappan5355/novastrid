import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../database/connection'

export const register = async (data: { userName: string, email: string, password: string }) => {
    return new Promise(async (resolve, reject) => {
        try {

            const { userName, email, password } = data;
            const hashedPsaaword = await bcrypt.hash(password, 10);
            const query = "INSERT INTO users (userName, email, password) values (?, ?, ?)";
            const values = db.query(query, [userName, email, hashedPsaaword], (error: any, result) => {
                if (error) reject({ statusCode: 400, messsage: error?.message })
                resolve({ statusCode: 201, messsage: 'user regitered successfully' })
            })

        } catch (error: any) {
            reject({ statusCode: 400, messsage: error?.message || 'Internal server error' })
        }
    })

}

export const login = async (data: { email: string, password: string }) => {
    return new Promise(async (resolve, reject) => {

        try {
            const { email, password }: { email: string, password: string } = data;
            const query = "SELECT * from users where email= ?";
            const values = db.query(query, [email], (error: any, result: any) => {
                if (error || (Array.isArray(result) && !result.length)) reject ({ statusCode: 400, messsage: error?.message }) 
                const user: any = result[0];

                const isValidPassword = bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    reject ({ statusCode: 400, messsage: 'Invalid password' }) 
                }
                const token = jwt.sign({ userId: user.id }, 'secreatKey');
                resolve( { statusCode: 200, messsage: 'user logged in successfully', token })
            })

        } catch (error: any) {
            console.log(error)
            reject ({ statusCode: 400, messsage: error?.message || 'Internal server error' }) 
        }
    })
}