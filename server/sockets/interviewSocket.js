function interviewSocket(socket) {
    socket.on("first-message", (data) => {
        console.log("first message recieved", data);

        socket.emit("confirm-interview", { message: "first message recieved good to start interview" })
    })

    // socket.emit("start-interview", {message : "Lets start interview"});
}

export default interviewSocket