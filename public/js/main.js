const socket = io();
const submitBtn = document.getElementById("submitBtn");
const messageInput = document.getElementById("message");
const sendLocationBtn = document.getElementById("sendLocation");

submitBtn.setAttribute("disabled", "disabled");

socket.on("message", (message) => {
	console.log(message);
});

messageInput.addEventListener("keyup", (e) => {
	if (e.target.value.trim()) {
		submitBtn.removeAttribute("disabled");
	} else {
		submitBtn.setAttribute("disabled", "disabled");
		return;
	}
	if (e.key === "Enter") {
		submitBtn.setAttribute("disabled", "disabled");
		socket.emit("send message", messageInput.value, (message) => {
			submitBtn.removeAttribute("disabled");
			console.log(`${message}`);
		});
	}
});
submitBtn.addEventListener("click", (e) => {
	submitBtn.setAttribute("disabled", "disabled");
	e.preventDefault();
	socket.emit("send message", `${messageInput.value}`, (message) => {
		submitBtn.removeAttribute("disabled");
		console.log(`${message}`);
	});
});

sendLocationBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (!navigator.geolocation) return alert("Can't find location!");

	sendLocationBtn.setAttribute("disabled", "disabled");

	navigator.geolocation.getCurrentPosition((position) => {
		const { latitude, longitude } = position.coords;
		socket.emit("send location", { latitude, longitude }, (message) => {
			sendLocationBtn.removeAttribute("disabled");
			console.log(`${message}`);
		});
	});
});
