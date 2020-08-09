const geoLocation = async (lat, long, key) => {
  const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`);
  const data = await api.json();
  return data;
};

export default geoLocation;