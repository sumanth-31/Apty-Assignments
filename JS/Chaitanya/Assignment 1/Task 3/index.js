function addElements() {
	let paraNumber = 1;
	const observer = new MutationObserver(domChangeHandler);
	const observerConfig = {
		childList: true,
	};
	observer.observe(document.body, observerConfig);
	setInterval(() => {
		const newPara = document.createElement("p");
		newPara.innerHTML = "I am a Paragraph, number: " + paraNumber;
		paraNumber += 1;
		document.body.appendChild(newPara);
	}, 1000);
}
function domChangeHandler(mutationRecords) {
	for (const record of mutationRecords) {
		const newNodes = record.addedNodes;
		Array.prototype.forEach.call(newNodes, (newNode) => {
			console.log(newNode.tagName + " was added ");
		});
	}
}
