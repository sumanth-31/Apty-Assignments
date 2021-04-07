function addNumbers() {
	const n1 = parseInt(document.getElementById("number1").value);
	const n2 = parseInt(document.getElementById("number2").value);
	const worker = new Worker("worker.js");
	worker.postMessage([n1, n2]);
	worker.onmessage = function (event) {
		alert("Sum is " + event.data);
	};
}
