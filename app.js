'use strict'

// app.js
const apiKey = 'b28121b65cabb418ad0b19bb0bf37bfe';
let currentUnit = 'metric'

// Function to get weather data// Function to get weather data
async function getWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${currentUnit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Log the raw data
        displayWeatherData(data);
    } catch (error) {
        console.error("Error fetching the weather data:", error);
    }
}

// Function to display the weather data on the page
function displayWeatherData(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const location = `${data.name}, ${data.sys.country}`;

    weatherInfoDiv.innerHTML = `
        <h2>${location}</h2>
        <p>Temperature: ${temperature}° ${currentUnit === 'metric' ? 'C' : 'F'}</p>
        <p>Condition: ${description}</p>
    `;
}

// Event listener for form submission
document.getElementById('location-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const location = document.getElementById('location-input').value;
    document.getElementById('loading').style.display = 'block';
    getWeatherData(location).then(() => {
        document.getElementById('loading').style.display = 'none';
    });
});

// Event listener for unit toggle using dropdown
document.getElementById('unit-select').addEventListener('change', function (e) {
    currentUnit = e.target.value; // Update the unit based on the selected option
    const location = document.getElementById('location-input').value;
    if (location) {
        // If there's already a location entered, fetch the weather data again with the new unit
        getWeatherData(location);
    }
});