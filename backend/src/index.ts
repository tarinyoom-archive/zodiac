const COHERE_ENDPOINT = "https://api.cohere.ai/generate"

export interface Env {
	COHERE_API_KEY: string;
	COHERE_ENDPOINT: string;
	COHERE_VERSION: string;
}

export default {
	async fetch(
		request: Request,
		env: Env
	): Promise<Response> {

		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "*",
					"Access-Control-Allow-Headers": "*",
				  }
			});
		}

		const prefix = (await request.formData()).get("prefix");

		const data = {
			prompt: prefix,
			max_tokens: 100
		}
	
		const init = {
			body: JSON.stringify(data),
			method: 'POST',
			headers: {
			  'content-type': 'application/json;charset=UTF-8',
			  "Cohere-Version": env.COHERE_VERSION,
				Authorization: "Bearer " + env.COHERE_API_KEY
			},
		  };
	
		const response: any = await fetch(COHERE_ENDPOINT, init).then((value: Response) => value.json());

		return new Response(JSON.stringify(response.generations[0]), {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*"
			}
		});
	},
};
