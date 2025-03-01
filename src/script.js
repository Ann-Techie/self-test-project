//i will start with the search element by addin eventlistener
//then i will add the api
//then change the temperature
function displayWeatherReadings(response) {
  console.log(response.data);

  let temperature = document.querySelector("#weather-app-temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);
}

function showCity(city) {
  apiKey = "5765tb49aco10f17ace1b436b0213fc4";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayWeatherReadings);
}

function showWeatherData(event) {
  event.preventDefault();
  let city = document.querySelector("#city-searched");
  let inputCityElement = document.querySelector("#input-city");

  inputCityElement.innerHTML = city.value;

  showCity(city.value);
}

let searchInput = document.querySelector("#search-form-input");
searchInput.addEventListener("submit", showWeatherData);
