const BACKEND_ENDPOINT = "https://rrb-generate.tarinyoom.io";

async function getCompletion(prefix: string): Promise<string> {
	
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

export default getCompletion;
