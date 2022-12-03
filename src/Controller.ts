import getCompletion from "./BackendSurface";

export async function setHoroscope(
		sign: string,
		signDescriptionTextId: string,
		horoscopeTextId: string) {

	const signDescription = document.getElementById(signDescriptionTextId);
	const horoscope = document.getElementById(horoscopeTextId);

	if (signDescription) {
		signDescription.textContent = `${sign}. <description here>`;
	}

	if (horoscope) {
		horoscope.textContent = await getCompletion("You are fierce, loyal, and caring. Without going into specifics, your day will vaguely be as follows.");
	}
}

export function showDiv(divId: string) {
	const div = document.getElementById(divId);
	if (div) {
		div.style.display = "inline";
	}
}
