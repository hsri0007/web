const express = require("express");
const http = require("http");
const app = express();

const sockets = require("socket.io");
const server = http.createServer(app);
const io = sockets(server);

io.on("connection", (socket) => {
  socket.on("joined", (roomId, userId) => {
    id = roomId;
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });
  socket.on("sendmessages", (message, id) => {
    io.to(id).emit("message", message);
  });
});

const port = process.env.PORT || 8000;

server.listen(port);
