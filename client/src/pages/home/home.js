import React, { useState, useEffect } from 'react';
import './home.css';
import { Helmet } from 'react-helmet';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const Home = (props) => {
  const [city, setCity] = useState('Jakarta');
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    'https://source.unsplash.com/1600x900/?Sunny'
  );

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
      .then((data) => {
        setWeatherData(data);
        setBackgroundImage(`https://source.unsplash.com/1600x1000/?${city}`);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Fetch weather data on component mount

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const jakartaLatLng = { lat: -6.21462, lng: 106.84513 };
  const searchedCityLatLng = {
    lat: weatherData?.coord?.lat || jakartaLatLng.lat,
    lng: weatherData?.coord?.lon || jakartaLatLng.lng,
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
                <svg
                  stroke="currentColor"
                  className="cloud"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3zm36.3 281a123.07 123.07 0 0 1-87.6 36.3H263.9c-33.1 0-64.2-12.9-87.6-36.3A123.3 123.3 0 0 1 140 612c0-28 9.1-54.3 26.2-76.3a125.7 125.7 0 0 1 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10c54.3 14.5 92.1 63.8 92.1 120 0 33.1-12.9 64.3-36.3 87.7z"></path>
                </svg>
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
        <div className="map">
          <Map
            google={props.google}
            zoom={10}
            initialCenter={searchedCityLatLng}
            center={searchedCityLatLng}
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBSdo2B2ysgOQGZAMOSpTCGXeUJ5JP51sI'
})(Home);
