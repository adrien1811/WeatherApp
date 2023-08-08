import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Helmet } from 'react-helmet';
import Form from 'react-bootstrap/Form';


export default function Navibar() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedTempUnit, setSelectedTempUnit] = useState('Celcius');
  const [selectedWindSpeedUnit, setSelectedWindSpeedUnit] = useState('km/h');

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

  const handlePreferencesClick = () => {
    setShowPreferences(!showPreferences);
    // Apply the selected units here (e.g., update the display values)
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
      <div className="navbar">
        <a href="#home" id="webTitle">
          EcoWeather
        </a>
        <p className="Date">{formatDate(currentDateTime)}</p>
        <p className="Time">
          Indonesian Standard Time {currentDateTime.toLocaleTimeString()} WIB
        </p>
        <div className="preferences" onClick={handlePreferencesClick}>
          Preferences
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M128 192l128 128 128-128z"></path>
          </svg>
        </div>
      </div>
      {showPreferences && (
        <div className="preferencesCard">
          <div className="temp">
            <h1>Temperature</h1>
            <Form.Select
              aria-label="Temperature Unit"
              value={selectedTempUnit}
              onChange={(e) => setSelectedTempUnit(e.target.value)}
            >
              <option value="Celcius">Celcius</option>
              <option value="Fahrenheit">Fahrenheit</option>
            </Form.Select>
          </div>
          <div className="wind">
            <h1>Wind Speed</h1>
            <Form.Select
              className="custom-select"
              aria-label="Wind Speed Unit"
              value={selectedWindSpeedUnit}
              onChange={(e) => setSelectedWindSpeedUnit(e.target.value)}
            >
              <option value="km/h">km/h</option>
              <option value="m/s">m/s</option>
            </Form.Select>
          </div>
          <button type="button" className="button" onClick={handlePreferencesClick}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
