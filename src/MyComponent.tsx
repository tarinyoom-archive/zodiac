import getCompletion from './generateService';

async function modifyText() {
	const prefix = document.getElementById("prefix");
	const completion = document.getElementById("completion");
console.log("A");
	if (prefix && completion) {
		console.log("B");
		const replacementText = await getCompletion(prefix.textContent ? prefix.textContent : "");
		completion.textContent = replacementText;
	}
}

function MyComponent() {
	return (
	<>
		<button onClick={modifyText}>Click me to complete the phrase below.</button>
		<p id="prefix">I really need to</p>
		<p id="completion"></p>
	</>
	);
}

export default MyComponent;
