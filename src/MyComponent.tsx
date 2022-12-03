import getCompletion from './generateService';

async function modifyText() {
	const prefix = document.getElementById("prefix");
	const completion = document.getElementById("completion");

	if (prefix && completion) {
		completion.textContent = await getCompletion(prefix.textContent ? prefix.textContent : "");
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
