const weather = document.querySelector(".js-weather");

const API_KEY = "914c944f91b4b6eba50eb90a21ca7a5f"; // from openweathermap.org
const COORDS = "coords";

function getWeather(lat, lon) {
	fetch(
		`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
	)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			const temperature = json.list[0].main.temp;
			const place = json.city.name;
			weather.innerHTML = `${temperature} C @ ${place}`;
		});
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude, //latitude: latitude,
		longitude //longitude: longitude
	};
	console.log(position);
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError() {
	console.log("Can't access Geolocation");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords === null) {
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init() {
	loadCoords();
}

init();
