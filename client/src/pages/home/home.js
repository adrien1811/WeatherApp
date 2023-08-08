import React, { useState, useEffect } from 'react';
import './home.css';
import { Helmet } from 'react-helmet';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const Home = (props) => {
  const [city, setCity] = useState('Jakarta');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    'https://source.unsplash.com/1600x900/?Sunny'
  );
  const jakartaLatLng = { lat: -6.21462, lng: 106.84513 };
  const searchedCityLatLng = {
    lat: weatherData?.coord?.lat || jakartaLatLng.lat,
    lng: weatherData?.coord?.lon || jakartaLatLng.lng,
  };
  const apiKey = '08677fe5b1335144e7e7313dcd0674b4';

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
      .then((data) => {
        setWeatherData(data);
        setBackgroundImage(`https://source.unsplash.com/1600x1000/?${city}`);

        const lastUpdateTimestamp = data?.dt;
        if (lastUpdateTimestamp) {
          const lastUpdateDate = new Date(lastUpdateTimestamp * 1000);
          const formattedLastUpdate = lastUpdateDate.toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
          });
          setLastUpdate(formattedLastUpdate);
        }
      })
      .catch((error) => console.error(error));

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert('No forecast found.');
          throw new Error('No forecast found.');
        }
        return response.json();
      })
      .then((data) => {
        const forecastList = data?.list?.slice(0, 40);
        setForecastData(forecastList);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);
  function getForecastTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="home" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="card">
          <form className="searchbar" onSubmit={handleSearch}>
            <input
              type="text"
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
             <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              className="weather-icon"
              />
              </div>
              <div className="information">
                <p>{weatherData.weather[0].main}</p>
                <p>{`Humidity: ${weatherData.main.humidity}%`}</p>
                <p>{`Wind speed: ${weatherData.wind.speed} km/h`}</p>
                <p>{`Last Update: ${lastUpdate}`}</p>
              </div>
            </>
          ) : (
            <div className="loading">Couldn't find location</div>
          )}
        </div>
        <div className="map">
          <Map
            google={props.google}
            zoom={10}
            initialCenter={searchedCityLatLng}
            center={searchedCityLatLng}
          />
        </div>
        <div className="card2">
         {forecastData ? (
         forecastData.slice(0, 5).map((forecastItem, index) => (
         <div key={index} className="item">
        <p className="hour">{getForecastTime(forecastItem.dt)}</p>
        <span className="icon-card2">
          <img
            src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`}
            alt={forecastItem.weather[0].description}
          />
        </span>
        <p className="temperature-hourly">{`${forecastItem.main.temp}°C`}</p>
      </div>
    ))
  ) : (
    <div className="loading">Couldn't find forecast data</div>
  )}
</div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBSdo2B2ysgOQGZAMOSpTCGXeUJ5JP51sI'
})(Home);