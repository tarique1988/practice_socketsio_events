const socket = io();
const submitBtn = document.getElementById("submitBtn");
const messageInput = document.getElementById("message");
const sendLocationBtn = document.getElementById("sendLocation");
socket.on("message", (message) => {
	console.log(message);
});

socket.on("send message", (message) => {
	console.log(`Received from server, ${message}`);
});

socket.on("send location", (location) => {
	console.log(location);
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

sendLocationBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (!navigator.geolocation) return alert("Can't find location!");

	navigator.geolocation.getCurrentPosition((position) => {
		const { latitude, longitude } = position.coords;
		const { timestamp } = position;
		socket.emit("send location", { latitude, longitude, timestamp });
	});
});
