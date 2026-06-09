import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import interviewRouter from './routes/interview.js'
import http from 'http';
import { Server } from 'socket.io';
import interviewSocket from './sockets/interviewSocket.js';


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

//create a own server for socket.io
const server = http.createServer();

//create a instance for socket io by providing server info
const io = new Server(server, {
    cors : "*"
});

//once connection is established execute callback
io.on("connection", (socket) => {
    console.log(socket.id, "socket id");

    interviewSocket(socket);

    console.log("socket connection established");
})

const port = process.env.PORT;

//change app(express default server) to http created server with socket.io
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})