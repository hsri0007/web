const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const sockets = require("socket.io");
const server = http.createServer(app);
const io = sockets(server);
app.use(cors());

io.on("connection", (socket) => {
  socket.on("joined", (roomId, userId) => {
    id = roomId;
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });
  socket.on("sendmessages", (message, uid) => {
    io.to(uid).emit("message", message);
  });
});

const port = process.env.PORT || 4000;

server.listen(port);
