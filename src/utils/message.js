exports.generateMessage = (text) => {
	return { text, createdAt: new Date().getTime() };
};

exports.generateLocationMessage = (location) => {
	return {
		url: `https://www.google.com/maps?q=${location.latitude},${location.longitude}`,
		createdAt: new Date().getTime(),
	};
};
