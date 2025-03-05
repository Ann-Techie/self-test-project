//i will start with the search element by adding eventlistener
//prevent the default behaviour
//dom manupulation of the h1 value
//then i will add the api
//then change the temperature

function weatherRealDetails(response) {
  console.log(response.data);

  let realTemperature = response.data.temperature.current;
  let temperature = document.querySelector("#weather-app-temperature");
  temperature.innerHTML = Math.round(realTemperature);

  let city = document.querySelector("#input-city");
  city.innerHTML = response.data.city;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;

  let date = new Date(response.data.time * 1000);
  let time = document.querySelector("#time");
  time.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCityInput(city) {
  apiKey = "5765tb49aco10f17ace1b436b0213fc4";
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(weatherRealDetails);
}

function displayWeather(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-search");

  searchCityInput(searchCity.value);
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", displayWeather);

searchCityInput("Nairobi");
