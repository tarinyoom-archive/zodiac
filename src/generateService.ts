
async function getCompletion(prefix: string): Promise<string> {
	return "this is the completion of \"" + prefix + "\"";
}

export default getCompletion;
