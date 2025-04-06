// Replace 'YOUR_OPENWEATHER_API_KEY' with your own OpenWeather API Key
const apiKey = 'YOUR_OPENWEATHER_API_KEY'; 

document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayError(data.message);
            }
        })
        .catch(error => displayError('An error occurred while fetching data.'));
}

function displayWeather(data) {
    document.getElementById('error-message').textContent = '';
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('forecast').textContent = `Weather: ${data.weather[0].description}`;
}

function displayError(message) {
    document.getElementById('error-message').textContent = `Error: ${message}`;
    document.getElementById('city-name').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('forecast').textContent = '';
}
