import { getCompletion } from "./BackendSurface";
import examples from "./examples.json";
import descriptions from "./signDescriptions.json";

function cleanCompletion(dirtyCompletion: string): string {
	const fragments = dirtyCompletion.split("\n");
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

export function findZodiacSign(day: number, month: number):string
{
	var astro_sign:string;

	if (month === 11){
               
            if (day < 22)
            astro_sign = "Sagittarius";
            else
            astro_sign ="Capricorn";
        }
               
        else if (month === 0){
            if (day < 20)
            astro_sign = "Capricorn";
            else
            astro_sign = "Aquarius";
        }
               
        else if (month === 1){
            if (day < 19)
            astro_sign = "Aquarius";
            else
            astro_sign = "Pisces";
        }
               
        else if(month === 2){
            if (day < 21)
            astro_sign = "Pisces";
            else
            astro_sign = "Aries";
        }
        else if (month === 3){
            if (day < 20)
            astro_sign = "Aries";
            else
            astro_sign = "Taurus";
        }
               
        else if (month === 4){
            if (day < 21)
            astro_sign = "Taurus";
            else
            astro_sign = "Gemini";
        }
               
        else if( month === 5){
            if (day < 21)
            astro_sign = "Gemini";
            else
            astro_sign = "Cancer";
        }
               
        else if (month === 6){
            if (day < 23)
            astro_sign = "Cancer";
            else
            astro_sign = "Leo";
        }
               
        else if( month === 7){
            if (day < 23)
            astro_sign = "Leo";
            else
            astro_sign = "Virgo";
        }
               
        else if (month === 8){
            if (day < 23)
            astro_sign = "Virgo";
            else
            astro_sign = "Libra";
        }
               
        else if (month === 9){
            if (day < 23)
            astro_sign = "Libra";
            else
            astro_sign = "Scorpio";
        }
               
        else if (month === 10){
            if (day < 23)
            astro_sign = "Scorpio";
            else
            astro_sign = "Sagittarius";
		}

			else astro_sign = "invalid";
	
    return astro_sign;
}

function capitalize(name: string) {
    return name.split(" ")
               .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
               .join(" ");
}

export function getHoroscopeHeader(name: string, sign: string): string {
    return `You are a ${sign}, ${capitalize(name)}. ${sign in descriptions ? (descriptions as any)[sign] : ""}`;
}

export async function getHoroscope(
		sign: string): Promise<string> {

	if (sign in examples) {
        const prefix = (examples as any)[sign].join("\n--\n") + "\n--\n";
        const completion = await getCompletion(prefix);
		return cleanCompletion(completion);
	} else {
        return "";
    }
}

export async function getHoroscopeAddition(
        prePrefix: string, topic: string) {

    let start;
    for (start = prePrefix.length - 1; start >= 0; start--) {
        if (prePrefix.charAt(start) === ".") {
            break;
        }   
    }

    const prefix = `${prePrefix.substring(start + 1)} Regarding your ${topic}, the following can be said: `;
    const completion = await getCompletion(prefix);
    return cleanCompletion(completion);

    }
