import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './database/db.js';
import userRoutes from './routers/userRouter.js';
import postRouter from './routers/postsRouter.js';

const app = express();

app.use(cors());
app.use(express.json())
dotenv.config()

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
connection(username, password);

app.use('/user',userRoutes);
app.use('/posts',postRouter);

app.listen(5000);