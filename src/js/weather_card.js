const weatherCard = (() => {
  const divCard = document.createElement('div');
  divCard.setAttribute('class', 'card');
  const divCity = document.createElement('div');
  divCity.setAttribute('class', 'city');
  divCity.innerHTML = '<h1 class="location"></h1>'
  
  const canvas = document.createElement('canvas');
  canvas.id = 'icon9'
  canvas.width = '128'
  canvas.height = '128'
  
  const divTemperature = document.createElement('div');
  divTemperature.setAttribute('class', 'temperature');
  divTemperature.innerHTML = '<h1 class="temp-text">Enable your location</h1> <h2 class="temp-report"></h2>'
  
  const form = document.createElement('form')
  const input = document.createElement('input')
  input.type = 'text';
  input.setAttribute('class', 'city-search');
  input.placeholder = 'Enter a city name'
  
  const divDescription = document.createElement('div');
  divDescription.setAttribute('class', 'description');
  divDescription.innerHTML = '<h2 class="humidity"></h2><h2 class="wind-speed"></h2><h2 class="min-temp"></h2> <h2 class="max-temp"></h2>'

  form.appendChild(input)
  divCard.appendChild(divCity)
  divCard.appendChild(canvas)
  divCard.appendChild(divTemperature)
  divCard.appendChild(form)  
  divCard.appendChild(divDescription)

  return divCard
})()

export default weatherCard 