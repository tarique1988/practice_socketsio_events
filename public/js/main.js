const socket = io();
const submitBtn = document.getElementById("submitBtn");
const messageInput = document.getElementById("message");
const sendLocationBtn = document.getElementById("sendLocation");
const messages = document.getElementById("messages");

const messageTemplate = document.getElementById("message-template").innerHTML;
const locationTemplate = document.getElementById("location-template").innerHTML;
submitBtn.setAttribute("disabled", "disabled");

socket.on("message", (message) => {
	var html = Mustache.render(messageTemplate, {
		message: message.text,
		createdAt: moment(message.createdAt).format("h:mm a"),
	});
	messages.insertAdjacentHTML("beforeend", html);
	console.log(message);
});

socket.on("location message", (message) => {
	var html = Mustache.render(locationTemplate, {
		url: message.url,
		createdAt: moment(message.createdAt).format("h:mm a"),
	});
	messages.insertAdjacentHTML("beforeend", html);
	console.log(message);
});

messageInput.addEventListener("keyup", (e) => {
	const currentVal = e.target.value;
	if (currentVal.trim()) {
		submitBtn.removeAttribute("disabled");
	} else {
		submitBtn.setAttribute("disabled", "disabled");
		return;
	}
	if (e.key === "Enter") {
		messageInput.value = "";
		messageInput.focus();
		submitBtn.setAttribute("disabled", "disabled");
		socket.emit("send message", currentVal, (message) => {
			console.log(message);
		});
	}
});
submitBtn.addEventListener("click", (e) => {
	submitBtn.setAttribute("disabled", "disabled");
	e.preventDefault();
	socket.emit("send message", `${messageInput.value}`, (message) => {
		messageInput.value = "";
		messageInput.focus();
		console.log(message);
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
			console.log(message);
		});
	});
});
