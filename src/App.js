// src/App.js
import React, { useState } from 'react';
import Clock from 'react-live-clock';
import AnimatedWeather from 'react-animated-weather';
import axios from 'axios';
import './App.css';
import background1 from './images/background1.jpg';
import background2 from './images/background.jpg';

const iconMapping = {
  Clear: 'CLEAR_DAY',
  Clouds: 'CLOUDY',
  Rain: 'RAIN',
  Snow: 'SNOW',
  Drizzle: 'SLEET',
  Thunderstorm: 'WIND',
  Mist: 'FOG',
  Haze: 'FOG',
  Fog: 'FOG',
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [searched, setSearched] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ce19af83307a1f091db54f5aec9e63a1&units=metric`
      );
      setWeather(response.data);
      setSearched(true);
    } catch {
      alert('City not found');
      setWeather(null);
      setSearched(false);
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${searched ? background2 : background1})`,
      }}
    >
      <div className="overlay">
        <div className="left-panel">
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Kolkata'} />
          <div>{new Date().toDateString()}</div>
          <div className="temp-big">
            {weather ? Math.round(weather.main.temp) : '--'}°C
          </div>
        </div>

        <div className="right-panel">
          <h2>{weather ? weather.weather[0].main : 'Weather'}</h2>
          {weather && (
            <AnimatedWeather
              icon={iconMapping[weather.weather[0].main] || 'CLOUDY'}
              color="white"
              size={64}
              animate={true}
            />
          )}

          <div className="search-box">
            <input
              type="text"
              placeholder="Search any city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={getWeather}>🔍</button>
          </div>

          {weather && (
            <div className="info">
              <p>
                <strong>
                  {weather.name}, {weather.sys.country}
                </strong>
              </p>
              <p>Temperature: {weather.main.temp}°C ({weather.weather[0].main})</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Visibility: {weather.visibility} m</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
