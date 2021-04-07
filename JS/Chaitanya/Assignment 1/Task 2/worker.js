onmessage = function (event) {
	const numbers = event.data;
	postMessage(numbers[0] + numbers[1]);
};
