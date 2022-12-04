import { getCompletion } from "./BackendSurface";
import examples from "./examples.json";

async function buildHoroscope(sign: string): Promise<string> {

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
            if (day < 22)
            astro_sign = "Scorpio";
            else
            astro_sign = "Sagittarius";
		}

			else astro_sign = "invalid";
	
    return astro_sign;
}

export function isValidSign(sign: string) {
	return sign in examples;
}

export async function setHoroscope(
		sign: string,
		signTextId: string,
		horoscopeTextId: string) {

	const signText = document.getElementById(signTextId);
	const horoscope = document.getElementById(horoscopeTextId);
	const date = new Date().toLocaleDateString('en-us', {year:"numeric", day:"numeric", month:"short"}) // "Jul 2021 Friday";
  	
	if (horoscope) {
		horoscope.textContent = await buildHoroscope(sign).then((horoscope: string) => {
			if (signText) {
				signText.textContent = `${sign}. ${date}`;
			}
			return horoscope;
		});
	}
}
