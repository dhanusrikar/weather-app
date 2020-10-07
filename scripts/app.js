const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = (data) => {
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  //destructure properties
  const { cityDets, weather } = data;
  console.log(data);
  //update details template
  details.innerHTML = `
   <h5>${cityDets.EnglishName}</h5>
   <div class="weather-condition">${weather.WeatherText}</div>
   <div class="temp">
   <span>${weather.Temperature.Metric.Value}</span>
   <span>&deg;C</span>`;

  //update the night/day & icon images
  console.log(weather.WeatherIcon);
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);
  //remove dispNone class if present
  if (card.classList.contains("dispNone")) {
    card.classList.remove("dispNone");
  }
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  //update the ui with new city
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
