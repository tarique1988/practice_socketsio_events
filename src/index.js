const express = require("express");
const http = require("http");
const path = require("path");
const SocketIO = require("socket.io");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

const server = http.createServer(app);

const io = new SocketIO(server);

io.on("connection", (socket) => {
	console.log(`Connection established with user: ${socket.id}`);
	socket.emit("message", "Welcome!");
});

server.listen(3000, () => {
	console.log(`Server started on port 3000`);
});
