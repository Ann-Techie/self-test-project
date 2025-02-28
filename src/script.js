function displaySearchCity(event) {
  event.preventDefault();
  let searchInputCity = document.querySelector("#city-searched");
  let inputCityElement = document.querySelector("#input-city");
  inputCityElement.innerHTML = searchInputCity.value;
}

function displayWeather(response) {
  console.log(response.data.city);

  let citySearch = document.querySelector("#input-city");
  citySearch.innerHTML = response.data.city;
  let temperature = Math.round(response.data.temperature);
  let readings = document.querySelector("#weather-app-temperature");
  readings.innerHTML = temperature;
}

let city = "Nairobi";
let apiKey = "5765tb49aco10f17ace1b436b0213fc4";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

axios.get(apiUrl).then(displayWeather);

let searchInput = document.querySelector("#search-form-input");
searchInput.addEventListener("submit", displaySearchCity);
