import React from 'react';
import './home.css';
import { Helmet } from 'react-helmet';
const Home = () => {
  // Your Home component implementation
  return <div>
   <Helmet>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossorigin
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
  <div className="home">
    <div className="card">
    <form className="searchbar">
          <input type="text" placeholder="Search City.." name="search" />
        </form>
<button className="searchButton">
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
<div className="title">
  <p>Weather in Jakarta</p>
    </div>
    <div className="temperature">
  <p>35°C</p>
    </div>
    <div className="information">
  <p>Sunny</p>
  <p>Humidity: 60%</p>
  <p>Wind speed: 6.4 km/h</p>
    </div>
  </div>
  </div>
  </div>;
};

export default Home;
