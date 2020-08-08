import './styles/style.css';
import weatherCard from './js/weather_card';
import weeklyReport from './js/weekly_report_container';
import toggleButton from './js/toggle_button';

const Skycons = require('skycons')(window);
const container = document.querySelector('.container')

weatherCard.appendChild(weeklyReport)
weatherCard.appendChild(toggleButton)
container.appendChild(weatherCard)

const placeholderValue = document.querySelector('.city-search')
let location = document.querySelector('.location')
let currentTemp = document.querySelector('.temp-text')
let weatherReport = document.querySelector('.temp-report')
let minTemp = document.querySelector('.min-temp')
let maxTemp = document.querySelector('.max-temp')
let humidity = document.querySelector('.humidity')
let windSpeed = document.querySelector('.wind-speed')

const icon = new Skycons({ color: 'white' });
icon.add(document.getElementById("icon1"), 'clear_day');
icon.add(document.getElementById("icon2"), 'rain');
icon.add(document.getElementById("icon3"), 'fog');
icon.add(document.getElementById("icon4"), 'clear_day');
icon.add(document.getElementById("icon5"), 'PARTLY_CLOUDY_NIGHT');
icon.add(document.getElementById("icon6"), 'snow');
icon.add(document.getElementById("icon7"), 'PARTLY_CLOUDY_NIGHT');
icon.add(document.getElementById("icon8"), 'PARTLY_CLOUDY_NIGHT');
icon.play();

const iconWeatherCheck = (weatherIcon) => {
  if (weatherIcon.icon === 'Wind') {
    return 'wind'
  } else if (weatherIcon.main === 'Snow') {
    return 'snow'
  } else if (weatherIcon.main === 'Rain') {
    return 'rain'
  } else if (weatherIcon.icon === '01n' || weatherIcon.icon === '50n') {
    return 'clear_night'
  } else if (weatherIcon.icon === '01d') {
    return 'clear_day'
  } else if (weatherIcon.main === 'Clouds') {
    return 'cloudy'
  } else {
    return 'clear_day'
  }
}

const toggleTemperatureButton = document.querySelector('.switch')
const key = 'bd5c60bbfbbd8f6f50ec92c23004ec08'

let toggleButtonValue = {}

toggleTemperatureButton.addEventListener('change', (e) => {
  toggleButtonValue['checked'] = e.target.checked;
  convertTemp()

})

window.addEventListener('load', () => {
  let lat;
  let long;
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const searchCity = document.querySelector('form')
      lat = position.coords.latitude;
      long = position.coords.longitude;
      
      const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`)
      let data = await api.json();
      
      searchCity.addEventListener('keypress', async (e) => {
        try {
          if (e.keyCode == 13) {
            e.preventDefault()
            let searchValue = e.target.value;
            if (searchValue !== '') {
              const searchResult = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${key}&units=metric`)
              let data = await searchResult.json()
              
              updateData(data)
              icon.remove('icon9')
              icon.set('icon9', iconWeatherCheck(data.weather[0]));
              placeholderValue.classList.remove('error')
              placeholderValue.placeholder = 'Enter a city name'
              e.target.value = ''
            }
          }
        } catch (err) {
          
        }
      })
      updateData(data)
      icon.add('icon9', iconWeatherCheck(data.weather[0]));
    })
  }
});

const convertTemp = () => {
  const temp = currentTemp.textContent.split(' ')[0]
  const fahrenheit = ((Number(temp) * 9 / 5) + 32).toFixed(2);
  const celsius = ((Number(temp) - 32) * 5 / 9).toFixed(2);

  const minTemperature = minTemp.textContent.split(' ')[3].split('°')[0]
  const minFahrenheit = ((Number(minTemperature) * 9 / 5) + 32).toFixed(2);
  const minCelsius = ((Number(minTemperature) - 32) * 5 / 9).toFixed(2);

  const maxTemperature = maxTemp.textContent.split(' ')[3].split('°')[0]
  const maxFahrenheit = ((Number(maxTemperature) * 9 / 5) + 32).toFixed(2);
  const maxCelsius = ((Number(maxTemperature) - 32) * 5 / 9).toFixed(2);

  currentTemp.innerHTML = toggleButtonValue['checked'] === false ? `${celsius} °<span>C</span>` : `${fahrenheit} °<span>F</span>`
  minTemp.innerHTML = toggleButtonValue['checked'] === false ? `Min Temp :- ${minCelsius}°<span>C</span> ` : `Min Temp :- ${minFahrenheit}°<span>F</span> `
  maxTemp.innerHTML = toggleButtonValue['checked'] === false ? `Max Temp :- ${maxCelsius}°<span>C</span> ` : `Max Temp :- ${maxFahrenheit}°<span>F</span> `
}

const updateData = (data) => {
  const celsius = data.main.temp;

  const windSpeedConvert = Math.floor(data.wind.speed)

  location.textContent = data.name;
  currentTemp.innerHTML = `${celsius} °<span>C</span>`
  minTemp.innerHTML = `Min Temp :- ${data.main.temp_min}°<span>C</span> `
  maxTemp.innerHTML = `Max Temp :- ${data.main.temp_max}°<span>C</span> `
  weatherReport.textContent = data.weather[0].description
  humidity.innerHTML = `Humidity :- ${data.main.humidity}% `
  windSpeed.innerHTML = `Wind Speed :- ${windSpeedConvert}<span>Km/hr</span> `
}