import './styles/style.css';
const Skycons = require('skycons')(window);

console.log('testing-server')

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