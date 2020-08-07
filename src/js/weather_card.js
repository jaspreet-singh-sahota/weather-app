const weatherCard = (() => {
  const divCard = document.createElement('div');
  divCard.setAttribute('class', 'card');
  const divCity = document.createElement('div');
  divCity.setAttribute('class', 'city');
  divCity.innerHTML = '<h1>Delhi</h1>'
  
  const canvas = document.createElement('canvas');
  canvas.id = 'icon9'
  canvas.width = '128'
  canvas.height = '128'
  
  const divTemperature = document.createElement('div');
  divTemperature.setAttribute('class', 'temperature');
  divTemperature.innerHTML = '<h1 class="temp-text">15°<span>C</span></h1> <h2 class="temp-report">Overcast temp</h2>'
  
  const form = document.createElement('form')
  const input = document.createElement('input')
  input.type = 'text';
  input.setAttribute('class', 'city-search');
  input.placeholder = 'Enter a city name'
  
  const divDescription = document.createElement('div');
  divDescription.setAttribute('class', 'description');
  divDescription.innerHTML = '<h2>Wind Speed <span> 5km/hr</span></h2><h2>Humidity <span>10%</span> </h2><h2> Min Temp <span>5km/hr</span></h2>  <h2>Max Temp <span>10%</span> </h2>'

  form.appendChild(input)
  divCard.appendChild(divCity)
  divCard.appendChild(canvas)
  divCard.appendChild(divTemperature)
  divCard.appendChild(form)  
  divCard.appendChild(divDescription)

  return divCard
})()

export default weatherCard 