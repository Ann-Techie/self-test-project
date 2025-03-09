function weatherRealDetails(response) {
  let temperature = document.querySelector("#weather-app-temperature");
  let realTemperature = response.data.temperature.current;
  temperature.innerHTML = Math.round(realTemperature);

  let city = document.querySelector("#input-city");
  city.innerHTML = response.data.city;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-app-icon"/>`;

  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  debugger;
  time.innerHTML = formatDate(date);

  getForecast(response.data.city);
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCityInput(city) {
  let apiKey = "5765tb49aco10f17ace1b436b0213fc4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(weatherRealDetails);
}

function displayWeather(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-search");

  searchCityInput(searchCity.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "5765tb49aco10f17ace1b436b0213fc4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
       
            <div class="weather-forecast-date">${formatDay(day.time)}</div> 
            <div >
            <img src="${day.condition.icon_url}" alt="${
          day.condition.icon
        }" class="weather-forecast-icon"/>
            </div>
            <div class="weather-forecast-temp">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  //rem to pass the timestamp after converting your time on a function//

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", displayWeather);

searchCityInput("Nairobi");
