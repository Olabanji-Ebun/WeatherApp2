'use strict'

// app.js
const apiKey = 'b28121b65cabb418ad0b19bb0bf37bfe';

async function getWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Log the raw data
        return data;
    } catch (error) {
        console.error("Error fetching the weather data:", error);
    }
}


function processWeatherData(data) {
    return {
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    };
}


document.getElementById('location-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('location-input').value;
    document.getElementById('loading').style.display = 'block'; // Show loading

    const rawData = await getWeatherData(location);
    const weatherData = processWeatherData(rawData);

    console.log(weatherData); // Log the processed data

    displayWeather(weatherData);

    document.getElementById('loading').style.display = 'none'; // Hide loading
});


function displayWeather(weather) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
        <h2>${weather.location}</h2>
        <img src="${weather.icon}" alt="${weather.description}">
        <p>Temperature: ${weather.temperature}°C</p>
        <p>${weather.description}</p>
    `;
}
