const express = require('express');
const http = require('http');
const socketIo = require('socket.io')
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

app.use(cors());

let connectedUsers = [];

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on('getUser', (user) => {
        if(!connectedUsers.find(u => u === user)){
            connectedUsers.push(user)
        }
        socket.user = user;

        io.emit('receiveUser', connectedUsers);  // Broadcast the new user to all clients
        console.log(`User ${user} connected with socket ID: ${socket.id}`);
    });

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', { message: message, user: socket.user });  // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
        connectedUsers = connectedUsers.filter(u => u !== socket.user)
        io.emit('receiveUser', connectedUsers)

        console.log(`User ${socket.user || socket.id} disconnected`);
        io.emit('userDisconnected', socket.user);  // Emit the disconnect event with the user's ID or socket ID
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))