// 🔑 REPLACE WITH YOUR API KEY FROM https://openweathermap.org/api
const API_KEY = '2223317f2fd3157d7d5edf419fa6a02a';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMsg = document.getElementById('errorMsg');

// Search button click
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

// Enter key press
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});

async function getWeather(city) {
  // Hide previous results
  weatherInfo.classList.add('hidden');
  errorMsg.classList.add('hidden');

  try {
    const response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key.');
      } else {
        throw new Error('Failed to fetch weather data.');
      }
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(data) {
  // Update DOM elements
  document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = Math.round(data.main.temp);
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;

  // Show weather info
  weatherInfo.classList.remove('hidden');
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
}

// Load default city on page load (optional)
window.addEventListener('load', () => {
  // Uncomment to load a default city
  // cityInput.value = 'London';
  // getWeather('London');
});
