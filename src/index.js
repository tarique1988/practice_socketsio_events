const express = require("express");
const http = require("http");
const path = require("path");
const SocketIO = require("socket.io");
const { generateMessage, generateLocationMessage } = require("./utils/message");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

const server = http.createServer(app);

const io = new SocketIO(server);

io.on("connection", (socket) => {
	console.log(`Connection established with user: ${socket.id}`);
	socket.emit("message", generateMessage("Welcome!"));
	socket.broadcast.emit(
		"message",
		generateMessage("A new user has joined the room!")
	);
	socket.on("send message", (message, callback) => {
		io.emit("message", generateMessage(message));
		callback(`Message delivered.`);
	});

	socket.on("send location", (location, callback) => {
		io.emit("location message", generateLocationMessage(location));
		callback(`Location delivered.`);
	});

	socket.on("disconnect", () => {
		io.emit("message", generateMessage(`A user has left the room!`));
	});
});

server.listen(3000, () => {
	console.log(`Server started on port 3000`);
});
