function addElements() {
	var paraNumber = 1;
	if (typeof MutationObserver !== "undefined") {
		var observer = new MutationObserver(domChangeHandler);
		var observerConfig = {
			childList: true,
		};
		observer.observe(document.body, observerConfig);
	} else {
		document.body.addEventListener("DOMNodeInserted", domChangeHandlerIE);
	}
	setInterval(function () {
		var newPara = document.createElement("p");
		newPara.innerHTML = "I am a Paragraph, number: " + paraNumber;
		paraNumber += 1;
		document.body.appendChild(newPara);
	}, 1000);
}
function domChangeHandlerIE(event) {
	console.log(event.target.tagName + " was added ");
}
function domChangeHandler(mutationRecords) {
	Array.prototype.forEach.call(mutationRecords, function (record) {
		var newNodes = record.addedNodes;
		Array.prototype.forEach.call(newNodes, function (newNode) {
			console.log(newNode.tagName + " was added ");
		});
	});
}
