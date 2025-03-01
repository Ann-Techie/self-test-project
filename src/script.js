//i will start with the search element by adding eventlistener
//prevent the default behaviour
//dom manupulation of the h1 value
//then i will add the api
//then change the temperature

function displayWeatherData(response) {
  console.log(response.data.city);

  let temperature = document.querySelector("#weather-app-temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);

  let searchedCity = document.querySelector("#input-city");
  searchedCity.innerHTML = response.data.city;
}

function showCity(city) {
  let apiKey = "5765tb49aco10f17ace1b436b0213fc4";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayWeatherData);
}

function showWeatherInfo(event) {
  event.preventDefault();

  let city = document.querySelector("#city-searched");

  showCity(city.value);
}

let inputSearchElement = document.querySelector("#search-form-input");
inputSearchElement.addEventListener("submit", showWeatherInfo);
