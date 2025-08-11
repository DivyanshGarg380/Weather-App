const apiKey = "";
// Insert your own API key :) 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherImage = document.querySelector('.icon');
const weatherStatus = document.querySelector('.description');

// Resetting Logic 
searchBox.addEventListener('input', () => {
    if (searchBox.value.trim() === '') {
        document.querySelector('.city').innerHTML = "Enter A Location Please";
        document.querySelector('.temp').innerHTML = "--°C";
        document.querySelector('.humidity').innerHTML = "Humidity : --%";
        document.querySelector('.wind').innerHTML = "Wind Speed : -- km/hr";
    }
});

async function getWeather(city){
    try{
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("Location not found");
        }

        const weather = await response.json();
        console.log(weather); 

        document.querySelector('.city').innerHTML = 'Weather in ' + weather.name;
        document.querySelector('.temp').innerHTML = Math.round(weather.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = 'Humidity :  ' + weather.main.humidity + ' %';
        document.querySelector('.wind').innerHTML = 'Wind Speed :  ' + weather.wind.speed + ' km/hr';

        const condition = weather.weather[0].main.toLowerCase();

        if (condition === 'clouds') {
            weatherImage.src = "clouds.png";
            weatherStatus.innerHTML = 'Cloudy ☂️';
            console.log(weatherStatus);
        } else if (condition === 'clear') {
            weatherImage.src = "clear.png";
            weatherStatus.innerHTML = 'Clear 😊';
            console.log(weatherStatus);
        } else if (condition === 'drizzle') {
            weatherImage.src = "drizzle.png";
            weatherStatus.innerHTML = 'Drizzling 😢';
        } else if (condition === 'mist') {
            weatherImage.src = "mist.png";
            weatherStatus.innerHTML = 'Mist 🫨';
        } else if (condition === 'snow') {
            weatherImage.src = "snow.png";
            weatherStatus.innerHTML = 'Snowing 😍';
        } else if (condition === 'rain') {
            weatherImage.src = "rain.png";
            weatherStatus.innerHTML = 'Raining 😭';
        }
        
    }catch(error){
        console.error(error);
        document.querySelector('.city').innerHTML = "Location not found!";
        document.querySelector('.temp').innerHTML = "--°C";
        document.querySelector('.humidity').innerHTML = "Humidity : --%";
        document.querySelector('.wind').innerHTML = "Wind Speed : -- km/hr";
        weatherImage.src = '';
        weatherStatus.innerHTML = '';

    }
}

searchBtn.addEventListener("click" , ()=>{
    const city = searchBox.value.trim();
    if (city) {
        getWeather(city);
    }
})
