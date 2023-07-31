import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Helmet } from 'react-helmet';

export default function Navibar() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const updateCurrentDateTime = () => {
    setCurrentDateTime(new Date());
  };

  useEffect(() => {
    const intervalId = setInterval(updateCurrentDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
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
      <div className="navbar">
        <a href="#home" id="webTitle">EcoWeather</a>
        <p className='Date'>{formatDate(currentDateTime)}</p>
        <p className='Time'>Indonesian Standard Time {currentDateTime.toLocaleTimeString()} WIB</p>
      </div>
    </div>
  );
}
