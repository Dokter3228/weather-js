const input = document.getElementById("input");
const container = document.getElementById("container");
const loader = document.getElementById("loader");
// values
const textValue = document.getElementById("text");
const nameCountry = document.getElementById("nameCountry");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLike");
const wind = document.getElementById("wind");
const humidityValue = document.getElementById("humidity");

const getData = (city) => {
  container.style.opacity = "0";
  loader.hidden = false;
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=e4c7cd46751e4677b5c164646230301&q=${city}&aqi=yes`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { location, current } = data;
      const { name, country } = location;
      const {
        condition: { text } = text,
        temp_c,
        feelslike_c,
        wind_mph,
        humidity,
      } = current;
      textValue.textContent = text;
      nameCountry.textContent = `${name}, ${country}`;
      temp.textContent = `${temp_c} °C`;
      feelsLike.textContent = `FEELS LIKE: ${feelslike_c} °C`;
      wind.textContent = `WIND:  ${wind_mph} MPH`;
      humidityValue.textContent = `HUMIDITY: ${humidity} %`;
    })
    .finally(() => {
      container.style.opacity = "100%";
      loader.hidden = true;
    });
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = e.target.value;
    e.target.value = "";
    getData(value);
  }
});

getData("london");
