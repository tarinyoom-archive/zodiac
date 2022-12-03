import { getCompletion } from "./BackendSurface";
import examples from "./examples.json";

async function buildHoroscope(sign: string): Promise<string> {

	console.log("building for " + sign);
	const prefix = (examples as any)[sign].join("\n--\n") + "\n--\n";
	const completion = await getCompletion(prefix);

	// clean horoscope
	const fragments = completion.split("\n");
	const longestFragment = fragments.reduce((prev: string, curr: string) => curr.length < prev.length ? prev : curr, "");
	let start, end;
	for (start = 0; start < longestFragment.length; start++) {
		const ascii = longestFragment.charCodeAt(start);
		if (65 <= ascii && ascii < 91) { // if ascii char is upper case
			break;
		}
	}

	for (end = longestFragment.length - 1; end > start; end--) {
		const ascii = longestFragment.charCodeAt(end);
		if (ascii === 46) {
			break;
		}
	}

	const trimmed = longestFragment.substring(start, end + 1);

	return trimmed;
}

export function isValidSign(sign: string) {
	return sign in examples;
}

function currentDate()
{
	const current = new Date();
	const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
	return date;
}
export async function setHoroscope(
		sign: string,
		signTextId: string,
		horoscopeTextId: string) {

		

	const signText = document.getElementById(signTextId);
	const horoscope = document.getElementById(horoscopeTextId);
	const date = new Date().toLocaleDateString('en-us', {year:"numeric", day:"numeric", month:"short"}) // "Jul 2021 Friday";
  	
	//`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

	if (horoscope) {
		horoscope.textContent = await buildHoroscope(sign).then((horoscope: string) => {
			if (signText) {
				signText.textContent = `${sign}. ${date}`;
			}
			return horoscope;
		});
	}
}


export function showDiv(divId: string) {
	const div = document.getElementById(divId);
	if (div) {
		div.style.display = "inline";
	}
}
