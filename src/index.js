import './styles/style.css';
import weatherCard from './js/weather_card';
import weeklyReport from './js/weekly_report_container';
import toggleButton from './js/toggle_button';

const Skycons = require('skycons')(window);
const container = document.querySelector('.container')

weatherCard.appendChild(weeklyReport)
weatherCard.appendChild(toggleButton)
container.appendChild(weatherCard)

const icon = new Skycons({ color: 'white' });
icon.add(document.getElementById("icon1"), 'clear_day');
icon.add(document.getElementById("icon2"), 'rain');
icon.add(document.getElementById("icon3"), 'fog');
icon.add(document.getElementById("icon4"), 'clear_day');
icon.add(document.getElementById("icon5"), 'PARTLY_CLOUDY_NIGHT');
icon.add(document.getElementById("icon6"), 'snow');
icon.add(document.getElementById("icon7"), 'PARTLY_CLOUDY_NIGHT');
icon.add(document.getElementById("icon8"), 'PARTLY_CLOUDY_NIGHT');
icon.add(document.getElementById("icon9"), 'PARTLY_CLOUDY_NIGHT');
icon.play();
