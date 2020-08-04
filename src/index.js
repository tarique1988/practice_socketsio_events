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
	socket.broadcast.emit("message", "A new user has joined the room!");
	socket.on("send message", (message) => {
		io.emit("send message", message);
	});

	socket.on("send location", (location) => {
		socket.broadcast.emit("send location", location);
	});

	socket.on("disconnect", () => {
		socket.broadcast.emit("message", `A user has left the room!`);
	});
});

server.listen(3000, () => {
	console.log(`Server started on port 3000`);
});
