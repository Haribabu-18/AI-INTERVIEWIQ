import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import interviewRouter from './routes/interview.js'


const app = express();

app.use(express.json());

app.use(cors());

//this is mongodb database connection
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.error("MongoDB Error:", err);
    });

//This is base route where first everything comes here and then it goes to authRouter
app.use("/auth", authRouter)

app.use("/user",userRouter)

app.use("/interview", interviewRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})