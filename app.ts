import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './src/database/connection'
import { loginUser, registerUser } from './src/controllers/login.controller';

dotenv.config();

const app = express();
const port = 3000

db.connect((error) => {
    if (error) throw error;
    console.log('database connected')
})

app.use(express.json())

app.use(cors())

app.post('/register', registerUser)
app.post('/login', loginUser)

app.listen(port , ()=> {
    console.log('app starts at '+ port)
})