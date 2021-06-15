const workflow = {
	name: "frames flow",
	steps: [
		{
			name: "step1",
			content: "Enter message to send to iframe",
			iframes: [],
			selector: "#main-input",
			type: "keypress",
		},
		{
			name: "step2",
			content: "Send message to iframe1",
			iframes: [],
			selector: "#main-send",
			type: "click",
		},
		{
			name: "step3",
			content: "Enter message to send to main window",
			iframes: ["#iframe1"],
			selector: "#iframe-input",
			type: "keypress",
		},
		{
			name: "step4",
			content: "Send message to main",
			iframes: ["#iframe1"],
			selector: "#frame-send",
			type: "click",
		},
		{
			name: "step5",
			content: "Enter message to send to main window",
			iframes: ["#iframe2"],
			selector: "#iframe-input",
			type: "keypress",
		},
		{
			name: "step6",
			content: "Send message to main",
			iframes: ["#iframe2"],
			selector: "#frame-send",
			type: "click",
		},
		{
			name: "step7",
			content: "Enter message to send to main window",
			iframes: ["#iframe3"],
			selector: "#iframe-input",
			type: "keypress",
		},
		{
			name: "step8",
			content: "Send message to main",
			iframes: ["#iframe3"],
			selector: "#frame-send",
			type: "click",
		},
		{
			name: "step9",
			content: "Enter message to send to main window",
			iframes: ["#iframe4"],
			selector: "#iframe-input",
			type: "keypress",
		},
		{
			name: "step10",
			content: "Send message to main",
			iframes: ["#iframe4"],
			selector: "#frame-send",
			type: "click",
		},
	],
};

const baloon = document.createElement("div");

let currStep = -1; //Track current step in workflow

function startWorkflow() {
	currStep = 0;
	executeNextStep();
}

function executeNextStep() {
	if (currStep == workflow.steps.length) {
		//Workflow completed
		currStep = -1;
		alert("Workflow exectuted successfully!");
		return;
	}
	const step = workflow.steps[currStep];
	const focusElement = getFocusedElement();
	//Add Scroll listeners to parents, so that baloon moves when any parent scrolls
	addListenersToScrollableParents();
	//Set baloon position and display
	displayCurrentStep();
	//Listen for step-execution
	focusElement.addEventListener(step.type, finishStep);
}

//Handle step-finish
function finishStep() {
	const step = workflow.steps[currStep];
	const focusElement = getFocusedElement();
	hideBaloon();
	removeListenersOfScrollableParents();
	focusElement.removeEventListener(step.type, finishStep); //Remove event listener as step finished
	currStep++;
	executeNextStep(); //Execute next steps
}

function sendToIFrame() {
	const text = document.getElementById("main-input").value;
	const iframes = document.getElementsByTagName("iframe");
	for (const iframe of iframes) {
		const iframeWindow = iframe.contentWindow;
		iframeWindow.postMessage(text, "*");
	}
}

function getFocusedElement() {
	let doc = document;
	const step = workflow.steps[currStep];
	for (const iframe of step.iframes) {
		//Iterate to get the nested iframe in which element is present
		doc = doc.querySelector(iframe).contentDocument;
	}
	//Get selected element
	return doc.querySelector(step.selector);
}

function setBaloonPosition(baseElementRect) {
	if (baseElementRect.top == 0) {
		hideBaloon();
		return;
	}
	showBaloon();
	//Align baloon center with element center
	baloon.style.top =
		baseElementRect.top + baseElementRect.height / 2 - baloon.offsetHeight / 2;
	baloon.style.left = baseElementRect.left + baseElementRect.width + 10;
}

function hideBaloon() {
	baloon.style.display = "none";
}

function showBaloon() {
	baloon.style.display = "flex";
}

function setBaloonContent(step) {
	baloon.innerHTML = `
	<h4>${step.content}</h4>
	`;
}

window.addEventListener("message", function (event) {
	const newMessage = document.createElement("h5");
	newMessage.innerText = event.data;
	const inbox = this.document.getElementById("main-inbox");
	inbox.appendChild(newMessage);
});

function displayCurrentStep() {
	const step = workflow.steps[currStep];
	const focusElement = getFocusedElement();
	setBaloonContent(step);
	setBaloonPosition(focusElement.getBoundingClientRect());
	if (step.iframes.length > 0) {
		let top = 0;
		let left = 0;
		let doc = document;
		for (const frameSelector of step.iframes) {
			const frame = doc.querySelector(frameSelector);
			top += frame.getBoundingClientRect().top;
			left += frame.getBoundingClientRect().left;
			doc = frame.contentDocument;
		}
		let rect = focusElement.getBoundingClientRect();
		rect = {
			height: rect.height,
			width: rect.width,
			top: rect.top + top,
			left: rect.left + left,
		};
		setBaloonPosition(rect);
	}
}

function addDOMListener() {
	const observer = new MutationObserver(function (records) {
		let valid = true;
		records.map(function (record) {
			if (record.target.id === baloon.id) {
				valid = false;
				return;
			}
		});
		if (valid) {
			displayCurrentStep();
		}
	});
	observer.observe(document.body, {
		childList: true,
		subtree: true,
		attributes: true,
	});
}

let scrollableParents = [];

function addListenersToScrollableParents() {
	let currElement = getFocusedElement().parentElement;
	const iframes = workflow.steps[currStep].iframes;
	const docs = [document];
	let index = workflow.steps[currStep].iframes.length;
	let doc = document;
	for (const frame of iframes) {
		doc = doc.querySelector(frame).contentDocument;
		docs.push(doc);
		scrollableParents.push(doc);
		doc.addEventListener("scroll", scrollHandler); //Add scroll handlers to all documents
	}
	while (index >= 1 || currElement) {
		// Iterate all parent elements till end of iframe is reached, then move to parent frame
		if (!currElement) {
			//All parent elements visited, use parent frame
			doc = docs[--index];
			currElement = doc.querySelector(iframes[index]).parentElement;
		} else {
			scrollableParents.push(currElement); // To remove later
			currElement.addEventListener("scroll", scrollHandler);
			currElement = currElement.parentElement;
		}
	}
}

function removeListenersOfScrollableParents() {
	for (const parent of scrollableParents) {
		parent.removeEventListener("scroll", scrollHandler);
	}
	scrollableParents = [];
}

function scrollHandler() {
	if (currStep == -1) return;
	displayCurrentStep();
}

window.onload = function () {
	baloon.classList.add("step-dialog");
	baloon.id = "apty-baloon";
	document.body.appendChild(baloon);
	hideBaloon();
	// document.getElementById("main-input").style.display = "none";
	addDOMListener();
	// setTimeout(function () {
	// 	document.getElementById("main-input").style.display = "block";
	// }, 2000);
};
