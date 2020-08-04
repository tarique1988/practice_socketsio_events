const socket = io();
const submitBtn = document.getElementById("submitBtn");
const messageInput = document.getElementById("message");
socket.on("message", (message) => {
	console.log(message);
});

socket.on("send message", (message) => {
	console.log(`Received from server, ${message}`);
});

messageInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		socket.emit("send message", messageInput.value);
	}
});
submitBtn.addEventListener("click", (e) => {
	e.preventDefault();
	socket.emit("send message", `${messageInput.value}`);
});
