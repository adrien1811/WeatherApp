import React, { useState, useEffect } from 'react';
import './home.css';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [city, setCity] = useState('Jakarta');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'eca2caaf30ffc4ff8992ceabfd6c89e9';

  const fetchWeatherData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert('No weather found.');
          throw new Error('No weather found.');
        }
        return response.json();
      })
      .then((data) => setWeatherData(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Fetch weather data on component mount

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="home">
        <div className="card">
          <form className="searchbar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search City.."
              name="search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className="searchButton" type="submit">
              <svg
                stroke="currentColor"
                fill="white"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
               <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
              </svg>
            </button>
          </form>
          {weatherData ? (
            <>
              <div className="title">
                <p>{`Weather in ${weatherData.name}`}</p>
              </div>
              <div className="temperature">
                <p>{`${weatherData.main.temp}°C`}</p>
              </div>
              <div className="information">
                <p>{weatherData.weather[0].main}</p>
                <p>{`Humidity: ${weatherData.main.humidity}%`}</p>
                <p>{`Wind speed: ${weatherData.wind.speed} km/h`}</p>
              </div>
            </>
          ) : (
            <div className="loading">Couldn't find location</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
