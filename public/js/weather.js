function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const API_KEY = '138c7e7c2fbaad791af4bec11dc9b07d';
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(weatherApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector('.cloud');
      const city = document.querySelector('.location');
      const temp = document.querySelector('.temperture');

      weather.innerText = data.weather[0].main;
      city.innerText = data.name;
      temp.innerText = `${data.main.temp} ℃`;
    });
}

function onGeoFail() {}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);

// {
//     "coord": {
//         "lon": 127.071,
//         "lat": 37.6406
//     },
//     "weather": [{
//         "id": 804,
//         "main": "Clouds",
//         "description": "overcast clouds",
//         "icon": "04n"
//     }],
//     "base": "stations",
//     "main": {
//         "temp": 297.95,
//         "feels_like": 298.55,
//         "temp_min": 297.52,
//         "temp_max": 299,
//         "pressure": 1010,
//         "humidity": 79,
//         "sea_level": 1010,
//         "grnd_level": 1006
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 0.73,
//         "deg": 250,
//         "gust": 1.11
//     },
//     "clouds": {
//         "all": 100
//     },
//     "dt": 1626106950,
//     "sys": {
//         "type": 1,
//         "id": 8105,
//         "country": "KR",
//         "sunrise": 1626121224,
//         "sunset": 1626173642
//     },
//     "timezone": 32400,
//     "id": 1841988,
//     "name": "Guri-si",
//     "cod": 200
// }
