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
import jwt from 'jsonwebtoken';


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
const server = http.createServer(app);

//create a instance for socket io by providing server info
const io = new Server(server, {
    cors : "*"
});

io.use((socket, next)=>{

    const token = socket.handshake.auth.token;
    
    if(!token){
        socket.emit("auth", {message: "Token not provided"});
        // socket.off();
    }

    try{

        const userData = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        socket.userId = userData.id
        next()
    }catch(err){
        console.log(err.message);
        // socket.off();
    }
})

//once connection is established execute callback
io.on("connection", (socket) => {
    console.log(socket.userId, "userid from socket")

    interviewSocket(socket);

    console.log("socket connection established");
})

const port = process.env.PORT;

//change app(express default server) to http created server with socket.io
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})