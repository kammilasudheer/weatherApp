const apiKey = "0af0eb9e7bf0486ea4a4e68ed86ea45e";

function getWeather() {
  const cityInput = document.getElementById("cityInput");

  if (!cityInput) {
    console.error("cityInput not found");
    return;
  }

  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {

      if (!data.data || data.data.length === 0) {
        alert("City not found");
        return;
      }

      const weather = data.data[0];

      //  SAFE ELEMENT ACCESS
      const mainWeather = document.getElementById("mainWeather");
      const extraInfo = document.getElementById("extraInfo");

      if (mainWeather) mainWeather.classList.remove("d-none");
      if (extraInfo) extraInfo.classList.remove("d-none");

      //  SET VALUES
      document.getElementById("cityName").innerText =
        `${weather.city_name}, ${weather.country_code}`;

      document.getElementById("temp").innerText =
        `${weather.temp}°C`;

      document.getElementById("desc").innerText =
        weather.weather.description;

      document.getElementById("feelsLike").innerText =
        `Feels like: ${weather.app_temp}°C`;

      document.getElementById("humidity").innerText =
        `${weather.rh}%`;

      document.getElementById("wind").innerText =
        `${weather.wind_spd} m/s`;

      // ICON FIX
      const iconCode = weather.weather.icon;
      document.getElementById("icon").src =
        `https://cdn.weatherbit.io/static/img/icons/${iconCode}.png`;
    })
    .catch(err => {
      console.error(err);
      alert("Something went wrong!");
    });
}

//  ENTER KEY FIX (RUN AFTER DOM LOAD)
window.onload = function () {
  const input = document.getElementById("cityInput");

  if (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        getWeather();
      }
    });
  }
};