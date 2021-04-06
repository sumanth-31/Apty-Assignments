function addNumbers() {
	const n1 = parseInt(document.getElementById("number1").value);
	const n2 = parseInt(document.getElementById("number2").value);
	calculate(n1, n2)
		.then((response) => {
			alert("Sum of numbers = " + response);
		})
		.catch((error) => {
			alert("Error Occured!");
			console.log(error);
		});
}
async function calculate(n1, n2) {
	return n1 + n2;
}
