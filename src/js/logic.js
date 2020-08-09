const fetchData = async (searchValue, key) => {
  const searchResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${key}&units=metric`);
  const data = await searchResult.json();
  return data;
};

export default fetchData;