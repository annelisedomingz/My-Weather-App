// Date and Time

let now = new Date();
console.log(now);

let dateTime = document.querySelector("#dateTime");
let date = now.getDate();
let hours = formatHours(now.getHours());
let minutes = formatMin(now.getMinutes());

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

dateTime.innerHTML = `${day} ${hours}:${minutes}`;

function formatHours(hour) {
  if (hour < 13) {
    return hour;
  } else {
    return hour - 12;
  }
}

function formatMin(min) {
  return min < 10 ? `0${min}` : min;
}

let current_fer = 0;
let current_cel = 0;

function search(cityName) {
  let apiKey = "8e4399f0d975e2878379c34ca4703cc5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

// City Change

function searchCityInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-field");
  search(searchInput.value);
}

//temperature

function showTemperature(response) {
  let humidity = response.data.main.humidity;
  let name = response.data.name;
  let wind = Math.ceil(response.data.wind.speed);
  let description = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");

  let temp_cel = Math.ceil(response.data.main.temp);
  let temp_fer = Math.ceil(temp_cel * 1.8 + 32);
  renderFahrenheit(temp_fer);
  renderCelsius(temp_cel);

  current_fer = temp_fer;
  current_cel = temp_cel;

  let cityText = document.querySelector("#city strong");
  cityText.innerHTML = name;

  let cityHumidity = document.querySelector("#city-humidity");
  cityHumidity.innerHTML = `${humidity}%`;

  let cityWind = document.querySelector("#city-wind");
  cityWind.innerHTML = `${wind}mph`;

  let weatherDescription = document.querySelector("#weather-condition");
  weatherDescription.innerHTML = `${description}`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let changeCity = document.querySelector(".row.search");
changeCity.addEventListener("submit", searchCityInput);

//celsius

function renderCelsius(temp) {
  let cityTemp = document.querySelector("#city-temperature");
  cityTemp.innerHTML = temp;
}

let celsiusToggle = document.querySelector("#celsius");
celsiusToggle.addEventListener("click", handleCelsiusClick);

function handleCelsiusClick() {
  renderCelsius(current_cel);
}

//fahrenheit

function renderFahrenheit(temp) {
  let cityTemp = document.querySelector("#city-temperature");
  cityTemp.innerHTML = temp;
}

let fahrenheitToggle = document.querySelector("#fahrenheit");
fahrenheitToggle.addEventListener("click", handleFehrenheitClick);

function handleFehrenheitClick() {
  renderFahrenheit(current_fer);
}

//geolocation

function currentlocation(position) {
  let apiKey = "8e4399f0d975e2878379c34ca4703cc5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleCurrentLoactionClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentlocation);
}

let currentLocationButton = document.querySelector(".currentLocation");

currentLocationButton.addEventListener("click", handleCurrentLoactionClick);

search("New York");
