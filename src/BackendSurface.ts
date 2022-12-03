const BACKEND_ENDPOINT = "https://rrb-generate.tarinyoom.io";

export async function getCompletion(prefix: string): Promise<string> {
	
	const formData = new FormData();
	formData.set("prefix", prefix);

	return fetch(BACKEND_ENDPOINT, {
		body: formData,
		headers: {
			"Access-Control-Request-Headers": "*"
			},
		method: "post",
	}).then(async (response) => {
		const json = await response.json();
		console.log(json.text);
		return json.text;
	});
}

export async function getCompletions(prefixes: string[]): Promise<string[]> {

	const completions = [];
	let prePrefix = ""; // prefixes + completions to be placed before the current query
	for (const prefix of prefixes) {

		const completion = await getCompletion(prePrefix + prefix);
		completions.push(completion);
		prePrefix += prefix + completion;

	}

	return completions;
}
