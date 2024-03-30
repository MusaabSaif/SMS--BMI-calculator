/*const apiKey= "32a18644974b3c8d564e4d52e36b4589";*/

const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=karachi";


document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '32a18644974b3c8d564e4d52e36b4589';
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');
    const weatherIcon = document.querySelector('.weather-icon');
    const tempElement = document.querySelector('.temp');
    const cityElement = document.querySelector('.city');
    const humidityElement = document.querySelector('.humidity p:first-child');
    const windElement = document.querySelector('.wind p:first-child');

    searchButton.addEventListener('click', function () {
        const cityName = searchInput.value.trim();
        if (cityName !== '') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.cod === 200) {
                        const weatherMain = data.weather[0].main;
                
                        let weatherImage = '';
                
                        // Map main weather conditions to corresponding image filenames
                        if (weatherMain === "Thunderstorm") {
                            weatherImage = 'thunderstorm.jpg';
                        } else if (weatherMain === "Drizzle" || weatherMain === "Rain") {
                            weatherImage = 'rainy-clouds.webp';
                        } else if (weatherMain === "Snow") {
                            weatherImage = 'snow.jpg';
                        } else if (weatherMain === "Mist" || weatherMain === "Smoke" || weatherMain === "Haze" || weatherMain === "Dust" || weatherMain === "Fog" || weatherMain === "Sand" || weatherMain === "Ash" || weatherMain === "Squall" || weatherMain === "Tornado") {
                            weatherImage = 'fog.png';
                        } else if (weatherMain === "Clear") {
                            weatherImage = 'sunny.png';
                        } else if (weatherMain === "Clouds") {
                            weatherImage = 'cloudy.jpg';
                        } 

                        document.querySelector(".weather").style.display = "block";
            
                        weatherIcon.src = weatherImage;
                       // weatherIcon.src = `http://openweathermap.org/img/wn/${weather.icon}.png`;
                        tempElement.textContent = `${Math.round(data.main.temp)}°C`;
                        cityElement.textContent = data.name;
                        humidityElement.textContent = `${data.main.humidity}%`;
                        windElement.textContent = `${data.wind.speed} km/h`;
                    } else {
                        alert('City not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Error fetching weather data');
                });
        } else {
            alert('Please enter a city name');
        }
    });
});
