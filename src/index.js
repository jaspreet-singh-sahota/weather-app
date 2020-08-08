import './styles/style.css';
import weatherCard from './js/weather_card';
import weeklyReport from './js/weekly_report_container';
import toggleButton from './js/toggle_button';

const Skycons = require('skycons')(window);
const container = document.querySelector('.container')

weatherCard.appendChild(weeklyReport)
weatherCard.appendChild(toggleButton)
container.appendChild(weatherCard)

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

const key = 'bd5c60bbfbbd8f6f50ec92c23004ec08'

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
        if (e.keyCode == 13) {
          e.preventDefault()
          let searchValue = e.target.value;

          const searchResult = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${key}&units=metric`)
          let data = await searchResult.json()

          updateData(data)
          icon.remove('icon9')
          icon.set('icon9', iconWeatherCheck(data.weather[0]));
          e.target.value = ''
        }
      })
      
      updateData(data)
      icon.add('icon9', iconWeatherCheck(data.weather[0]));
    })
  }
});

const updateData = (data) => {
  const celsius = data.main.temp;
  const farenheit = (celsius * 1.8) + 32;

  const windSpeedConvert = Math.floor(data.wind.speed)

  location.textContent = data.name;
  currentTemp.innerHTML = `${celsius} °<span>C</span>`
  weatherReport.textContent = data.weather[0].description
  minTemp.innerHTML = `Min Temp :- ${data.main.temp_min}°<span>C</span> `
  maxTemp.innerHTML = `Max Temp :- ${data.main.temp_max}°<span>C</span> `
  humidity.innerHTML = `Humidity :- ${data.main.humidity}% `
  windSpeed.innerHTML = `Wind Speed :- ${windSpeedConvert}<span>Km/hr</span> `
}