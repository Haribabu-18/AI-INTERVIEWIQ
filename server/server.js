import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

// mongoose.connect(process.env.DB_URI).then(() => {
//     console.log(`DB Connected`);
// }).catch((err) => {
//     console.log(err.message)
// })
app.use("/auth", authRouter)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})