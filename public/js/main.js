const socket = io();
const submitBtn = document.getElementById("submitBtn");
const messageInput = document.getElementById("message");
const sendLocationBtn = document.getElementById("sendLocation");
socket.on("message", (message) => {
	console.log(message);
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
		socket.emit("send location", { latitude, longitude });
	});
});
