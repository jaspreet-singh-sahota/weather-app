import './styles/style.css';
import weatherCard from './js/weather_card';
import weeklyReport from './js/weekly_report_container';
import toggleButton from './js/toggle_button';
import fetchData from './js/logic';
import geoLocation from './js/logic_geoloaction';

const Skycons = require('skycons')(window);

const container = document.querySelector('.container');

weatherCard.appendChild(weeklyReport);
weatherCard.appendChild(toggleButton);
container.appendChild(weatherCard);

const placeholderValue = document.querySelector('.city-search');
const location = document.querySelector('.location');
const currentTemp = document.querySelector('.temp-text');
const weatherReport = document.querySelector('.temp-report');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');

const icon = new Skycons({ color: 'white' });
icon.add(document.getElementById('icon1'), 'clear_day');
icon.add(document.getElementById('icon2'), 'rain');
icon.add(document.getElementById('icon3'), 'fog');
icon.add(document.getElementById('icon4'), 'clear_day');
icon.add(document.getElementById('icon5'), 'PARTLY_CLOUDY_NIGHT');
icon.add(document.getElementById('icon6'), 'snow');
icon.add(document.getElementById('icon7'), 'PARTLY_CLOUDY_NIGHT');
icon.add(document.getElementById('icon8'), 'PARTLY_CLOUDY_NIGHT');
icon.play();

const iconWeatherCheck = (weatherIcon) => {
  if (weatherIcon.icon === 'Wind') {
    return 'wind';
  } if (weatherIcon.main === 'Snow') {
    return 'snow';
  } if (weatherIcon.main === 'Rain' || weatherIcon.main === 'Thunderstorms') {
    return 'rain';
  } if (weatherIcon.main === 'Clouds' || weatherIcon.main === 'Haze' || weatherIcon.main === 'Mist') {
    return 'cloudy';
  } if (weatherIcon.icon === '01n' || weatherIcon.icon === '50n') {
    return 'clear_night';
  } if (weatherIcon.icon === '01d') {
    return 'clear_day';
  }
  return 'clear_day';
};

const toggleTemperatureButton = document.querySelector('.switch');
const key = 'bd5c60bbfbbd8f6f50ec92c23004ec08';
const toggleButtonValue = {};

const convertTemp = () => {
  const temp = currentTemp.textContent.split(' ')[0];
  const fahrenheit = ((Number(temp) * (9 / 5)) + 32).toFixed(2);
  const celsius = ((Number(temp) - 32) * (5 / 9)).toFixed(2);

  const minTemperature = minTemp.textContent.split(' ')[3].split('°')[0];
  const minFahrenheit = ((Number(minTemperature) * (9 / 5)) + 32).toFixed(2);
  const minCelsius = ((Number(minTemperature) - 32) * (5 / 9)).toFixed(2);

  const maxTemperature = maxTemp.textContent.split(' ')[3].split('°')[0];
  const maxFahrenheit = ((Number(maxTemperature) * (9 / 5)) + 32).toFixed(2);
  const maxCelsius = ((Number(maxTemperature) - 32) * (5 / 9)).toFixed(2);

  currentTemp.innerHTML = toggleButtonValue.checked === false ? `${celsius} °<span>C</span>` : `${fahrenheit} °<span>F</span>`;
  minTemp.innerHTML = toggleButtonValue.checked === false ? `Min Temp :- ${minCelsius}°<span>C</span> ` : `Min Temp :- ${minFahrenheit}°<span>F</span> `;
  maxTemp.innerHTML = toggleButtonValue.checked === false ? `Max Temp :- ${maxCelsius}°<span>C</span> ` : `Max Temp :- ${maxFahrenheit}°<span>F</span> `;
};

const updateData = (data) => {
  const celsius = data.main.temp;
  const windSpeedConvert = Math.floor(data.wind.speed);

  location.textContent = data.name;
  currentTemp.innerHTML = `${celsius} °<span>C</span>`;
  minTemp.innerHTML = `Min Temp :- ${data.main.temp_min}°<span>C</span> `;
  maxTemp.innerHTML = `Max Temp :- ${data.main.temp_max}°<span>C</span> `;
  weatherReport.textContent = data.weather[0].description;
  humidity.innerHTML = `Humidity :- ${data.main.humidity}% `;
  windSpeed.innerHTML = `Wind Speed :- ${windSpeedConvert}<span>Km/hr</span> `;
};

toggleTemperatureButton.addEventListener('change', (e) => {
  toggleButtonValue.checked = e.target.checked;
  convertTemp();
});

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const searchCity = document.querySelector('form');
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      const data = await geoLocation(lat, long, key)

      searchCity.addEventListener('keypress', async (e) => {
        try {
          if (e.keyCode === 13) {
            e.preventDefault();
            const searchValue = e.target.value;
            if (searchValue !== '') {
              const data = await fetchData(searchValue, key)
              
              updateData(data);
              icon.remove('icon9');
              icon.set('icon9', iconWeatherCheck(data.weather[0]));
              placeholderValue.classList.remove('error');
              placeholderValue.placeholder = 'Enter a city name';
              e.target.value = '';
            }
          }
        } catch (err) {
          e.target.value = '';
          placeholderValue.placeholder = 'Enter a valid city name';
          placeholderValue.classList.add('error');
        }
      });

      updateData(data);
      icon.add('icon9', iconWeatherCheck(data.weather[0]));
    });
  }
});
