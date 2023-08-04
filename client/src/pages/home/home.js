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
  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M575.2 325.7c.2-1.9.8-3.7.8-5.6 0-35.3-28.7-64-64-64-12.6 0-24.2 3.8-34.1 10-17.6-38.8-56.5-66-101.9-66-61.8 0-112 50.1-112 112 0 3 .7 5.8.9 8.7-49.6 3.7-88.9 44.7-88.9 95.3 0 53 43 96 96 96h272c53 0 96-43 96-96 0-42.1-27.2-77.4-64.8-90.4zm-430.4-22.6c-43.7-43.7-43.7-114.7 0-158.3 43.7-43.7 114.7-43.7 158.4 0 9.7 9.7 16.9 20.9 22.3 32.7 9.8-3.7 20.1-6 30.7-7.5L386 81.1c4-11.9-7.3-23.1-19.2-19.2L279 91.2 237.5 8.4C232-2.8 216-2.8 210.4 8.4L169 91.2 81.1 61.9C69.3 58 58 69.3 61.9 81.1l29.3 87.8-82.8 41.5c-11.2 5.6-11.2 21.5 0 27.1l82.8 41.4-29.3 87.8c-4 11.9 7.3 23.1 19.2 19.2l76.1-25.3c6.1-12.4 14-23.7 23.6-33.5-13.1-5.4-25.4-13.4-36-24zm-4.8-79.2c0 40.8 29.3 74.8 67.9 82.3 8-4.7 16.3-8.8 25.2-11.7 5.4-44.3 31-82.5 67.4-105C287.3 160.4 258 140 224 140c-46.3 0-84 37.6-84 83.9z"></path></svg>
        );
        case '01n':
          return (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M575.2 325.7c.2-1.9.8-3.7.8-5.6 0-35.3-28.7-64-64-64-12.6 0-24.2 3.8-34.1 10-17.6-38.8-56.5-66-101.9-66-61.8 0-112 50.1-112 112 0 3 .7 5.8.9 8.7-49.6 3.7-88.9 44.7-88.9 95.3 0 53 43 96 96 96h272c53 0 96-43 96-96 0-42.1-27.2-77.4-64.8-90.4zm-430.4-22.6c-43.7-43.7-43.7-114.7 0-158.3 43.7-43.7 114.7-43.7 158.4 0 9.7 9.7 16.9 20.9 22.3 32.7 9.8-3.7 20.1-6 30.7-7.5L386 81.1c4-11.9-7.3-23.1-19.2-19.2L279 91.2 237.5 8.4C232-2.8 216-2.8 210.4 8.4L169 91.2 81.1 61.9C69.3 58 58 69.3 61.9 81.1l29.3 87.8-82.8 41.5c-11.2 5.6-11.2 21.5 0 27.1l82.8 41.4-29.3 87.8c-4 11.9 7.3 23.1 19.2 19.2l76.1-25.3c6.1-12.4 14-23.7 23.6-33.5-13.1-5.4-25.4-13.4-36-24zm-4.8-79.2c0 40.8 29.3 74.8 67.9 82.3 8-4.7 16.3-8.8 25.2-11.7 5.4-44.3 31-82.5 67.4-105C287.3 160.4 258 140 224 140c-46.3 0-84 37.6-84 83.9z"></path></svg>
          );
      case '02d':
        return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"></path></svg>
        );
        case '02n':
        return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"></path></svg>
        );
      case '03d':
        return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"></path></svg>
        );
        case '03n':
        return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"></path></svg>
        );
      case '04d':
        return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"></path></svg>
        );
        case '04n':
          return (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"></path></svg>
          );
          case '05d':
            return (
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M433.9 175.6c-19-17.6-44.6-27.3-72.1-27.3h-5.6c-6.5-23.5-19.4-43.5-37.6-58.2C297.3 73 269.5 64 238.1 64c-32.7 0-63.2 11.7-86 32.9-22.8 21.2-35.5 50-36.1 81.4-17.5 4-33.6 13.7-46 27.9-14.2 16.2-22 36.6-22 57.4 0 44.6 34.9 82.6 77.4 86L101.2 382c-2.4 3.2-3.3 7.2-2.7 11.1.6 3.9 2.8 7.3 6 9.6 2.5 1.8 5.5 2.7 8.6 2.7 5.2 0 9.8-2.1 12.5-5.8l37.1-50h35.1l-55.3 75.1c-2.3 3.2-3.4 6.9-2.9 10.6.5 3.9 2.6 7.4 5.9 9.8 3.5 2.5 7.5 2.8 9 2.8 7.2 0 11.2-3.5 13.4-6.4l67.4-91.8H270L246 382c-2.4 3.3-3.4 7.2-2.7 11.1.6 3.9 2.8 7.3 6 9.6 2.5 1.8 5.5 2.7 8.6 2.7 5.2 0 9.8-2.1 12.5-5.8l37-50h35.1l-55.3 75.1c-2.3 3.2-3.4 7-2.9 10.6.5 3.8 2.6 7.2 5.9 9.6 2.6 1.9 5.9 3 8.9 3 5.1 0 9.7-2.2 12.5-6l69.7-95.1c22.4-4.5 43-16.6 58.1-34.5 15.9-18.8 24.7-42.6 24.7-67.1-.1-26.8-10.8-51.6-30.2-69.6z"></path></svg>
            );
            case '05n':
              return (
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M433.9 175.6c-19-17.6-44.6-27.3-72.1-27.3h-5.6c-6.5-23.5-19.4-43.5-37.6-58.2C297.3 73 269.5 64 238.1 64c-32.7 0-63.2 11.7-86 32.9-22.8 21.2-35.5 50-36.1 81.4-17.5 4-33.6 13.7-46 27.9-14.2 16.2-22 36.6-22 57.4 0 44.6 34.9 82.6 77.4 86L101.2 382c-2.4 3.2-3.3 7.2-2.7 11.1.6 3.9 2.8 7.3 6 9.6 2.5 1.8 5.5 2.7 8.6 2.7 5.2 0 9.8-2.1 12.5-5.8l37.1-50h35.1l-55.3 75.1c-2.3 3.2-3.4 6.9-2.9 10.6.5 3.9 2.6 7.4 5.9 9.8 3.5 2.5 7.5 2.8 9 2.8 7.2 0 11.2-3.5 13.4-6.4l67.4-91.8H270L246 382c-2.4 3.3-3.4 7.2-2.7 11.1.6 3.9 2.8 7.3 6 9.6 2.5 1.8 5.5 2.7 8.6 2.7 5.2 0 9.8-2.1 12.5-5.8l37-50h35.1l-55.3 75.1c-2.3 3.2-3.4 7-2.9 10.6.5 3.8 2.6 7.2 5.9 9.6 2.6 1.9 5.9 3 8.9 3 5.1 0 9.7-2.2 12.5-6l69.7-95.1c22.4-4.5 43-16.6 58.1-34.5 15.9-18.8 24.7-42.6 24.7-67.1-.1-26.8-10.8-51.6-30.2-69.6z"></path></svg>
              );
          case '06d':
            return (
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M139 400s-23 25.3-23 40.7c0 12.8 10.3 23.3 23 23.3s23-10.5 23-23.3c0-15.4-23-40.7-23-40.7zM217 368s-23 25.3-23 40.7c0 12.8 10.4 23.3 23 23.3 12.7 0 23-10.5 23-23.3 0-15.4-23-40.7-23-40.7zM295 400s-23 25.3-23 40.7c0 12.8 10.3 23.3 23 23.3 12.6 0 23-10.5 23-23.3 0-15.4-23-40.7-23-40.7zM373 368s-23 25.3-23 40.7c0 12.8 10.4 23.3 23 23.3 12.7 0 23-10.5 23-23.3 0-15.4-23-40.7-23-40.7zM393.2 161.2C380.5 96.6 323.9 48 256 48c-39.7 0-76 14-100.9 45.4 34.3 2.6 66.1 15.2 90.7 39.8 18.2 18.2 31 40.5 37.4 64.8h-33.5c-15.3-43.7-56-75-105.7-75-6 0-14.3.7-20.6 2C70 136 32 180.4 32 235.5 32 297.6 79.4 352 141.2 352h242.7c51.5 0 96.2-46 96.2-97.8-.1-49.4-38.4-89.6-86.9-93z"></path></svg>
  
            );
          case '06n':
            return (
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M139 400s-23 25.3-23 40.7c0 12.8 10.3 23.3 23 23.3s23-10.5 23-23.3c0-15.4-23-40.7-23-40.7zM217 368s-23 25.3-23 40.7c0 12.8 10.4 23.3 23 23.3 12.7 0 23-10.5 23-23.3 0-15.4-23-40.7-23-40.7zM295 400s-23 25.3-23 40.7c0 12.8 10.3 23.3 23 23.3 12.6 0 23-10.5 23-23.3 0-15.4-23-40.7-23-40.7zM373 368s-23 25.3-23 40.7c0 12.8 10.4 23.3 23 23.3 12.7 0 23-10.5 23-23.3 0-15.4-23-40.7-23-40.7zM393.2 161.2C380.5 96.6 323.9 48 256 48c-39.7 0-76 14-100.9 45.4 34.3 2.6 66.1 15.2 90.7 39.8 18.2 18.2 31 40.5 37.4 64.8h-33.5c-15.3-43.7-56-75-105.7-75-6 0-14.3.7-20.6 2C70 136 32 180.4 32 235.5 32 297.6 79.4 352 141.2 352h242.7c51.5 0 96.2-46 96.2-97.8-.1-49.4-38.4-89.6-86.9-93z"></path></svg>
            );
          case '07d':
            return (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3z"></path></svg>
            );
          case '07n':
            return (
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3z"></path></svg>
            );
          case '08d':
            return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3z"></path></svg>
            );
          case '08n':
            return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3z"></path></svg>
            );
          case '09d':
            return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M416 128c-.6 0-1.1.2-1.6.2 1.1-5.2 1.6-10.6 1.6-16.2 0-44.2-35.8-80-80-80-24.6 0-46.3 11.3-61 28.8C256.4 24.8 219.3 0 176 0 114.1 0 64 50.1 64 112c0 7.3.8 14.3 2.1 21.2C27.8 145.8 0 181.5 0 224c0 53 43 96 96 96h320c53 0 96-43 96-96s-43-96-96-96zM88 374.2c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0z"></path></svg>
            );
          case '09n':
            return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M416 128c-.6 0-1.1.2-1.6.2 1.1-5.2 1.6-10.6 1.6-16.2 0-44.2-35.8-80-80-80-24.6 0-46.3 11.3-61 28.8C256.4 24.8 219.3 0 176 0 114.1 0 64 50.1 64 112c0 7.3.8 14.3 2.1 21.2C27.8 145.8 0 181.5 0 224c0 53 43 96 96 96h320c53 0 96-43 96-96s-43-96-96-96zM88 374.2c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0z"></path></svg>
            );
       case '10d':
        return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M416 128c-.6 0-1.1.2-1.6.2 1.1-5.2 1.6-10.6 1.6-16.2 0-44.2-35.8-80-80-80-24.6 0-46.3 11.3-61 28.8C256.4 24.8 219.3 0 176 0 114.1 0 64 50.1 64 112c0 7.3.8 14.3 2.1 21.2C27.8 145.8 0 181.5 0 224c0 53 43 96 96 96h320c53 0 96-43 96-96s-43-96-96-96zM88 374.2c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0z"></path></svg>
        );
        case '11d':
        return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 18v-2h.5a3.5 3.5 0 1 0-2.5-5.95V10a6 6 0 1 0-8 5.659v2.089a8 8 0 1 1 9.458-10.65A5.5 5.5 0 1 1 17.5 18l-.5.001zm-4-1.995h3l-5 6.5v-4.5H8l5-6.505v4.505z"></path></g></svg>
        );
        case '11n':
          return (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 18v-2h.5a3.5 3.5 0 1 0-2.5-5.95V10a6 6 0 1 0-8 5.659v2.089a8 8 0 1 1 9.458-10.65A5.5 5.5 0 1 1 17.5 18l-.5.001zm-4-1.995h3l-5 6.5v-4.5H8l5-6.505v4.505z"></path></g></svg>
          );
        case '13d':
          return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 18v-2h.5a3.5 3.5 0 1 0-2.5-5.95V10a6 6 0 1 0-8 5.659v2.089a8 8 0 1 1 9.458-10.65A5.5 5.5 0 1 1 17.5 18l-.5.001zm-4-1.995h3l-5 6.5v-4.5H8l5-6.505v4.505z"></path></g></svg>
            );
       case '13n':
            return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 18v-2h.5a3.5 3.5 0 1 0-2.5-5.95V10a6 6 0 1 0-8 5.659v2.089a8 8 0 1 1 9.458-10.65A5.5 5.5 0 1 1 17.5 18l-.5.001zm-4-1.995h3l-5 6.5v-4.5H8l5-6.505v4.505z"></path></g></svg>
              );
        case '14d':
          return (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M8 13H10V17H8zM8 18H10V20H8zM11 15H13V19H11zM11 20H13V22H11zM14 13H16V17H14zM14 18H16V20H14z"></path><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path></svg>
            );
       case '14n':
            return (
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M8 13H10V17H8zM8 18H10V20H8zM11 15H13V19H11zM11 20H13V22H11zM14 13H16V17H14zM14 18H16V20H14z"></path><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path></svg>
              );
       case '15d':
                return (
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M8 13H10V17H8zM8 18H10V20H8zM11 15H13V19H11zM11 20H13V22H11zM14 13H16V17H14zM14 18H16V20H14z"></path><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path></svg>
                  );
       case '15n':
                  return (
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M8 13H10V17H8zM8 18H10V20H8zM11 15H13V19H11zM11 20H13V22H11zM14 13H16V17H14zM14 18H16V20H14z"></path><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path></svg>
                    );
       case '16d':
                  return (
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M8 13H10V17H8zM8 18H10V20H8zM11 15H13V19H11zM11 20H13V22H11zM14 13H16V17H14zM14 18H16V20H14z"></path><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path></svg>
                        );
       case '16n':
                  return (
                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M8 13H10V17H8zM8 18H10V20H8zM11 15H13V19H11zM11 20H13V22H11zM14 13H16V17H14zM14 18H16V20H14z"></path><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path></svg>
                          );
       case '17d':
                  return (
                              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M8 13H10V17H8zM8 18H10V20H8zM11 15H13V19H11zM11 20H13V22H11zM14 13H16V17H14zM14 18H16V20H14z"></path><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path></svg>
                          );
       case '17n':
                  return (
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M8 13H10V17H8zM8 18H10V20H8zM11 15H13V19H11zM11 20H13V22H11zM14 13H16V17H14zM14 18H16V20H14z"></path><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path></svg>
                        );
       case '18d':
                  return (
                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path><circle cx="15" cy="16" r="1"></circle><circle cx="15" cy="19" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="12" cy="21" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="9" cy="16" r="1"></circle></svg>
                          );
       case '18n':
                  return (
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path><circle cx="15" cy="16" r="1"></circle><circle cx="15" cy="19" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="12" cy="21" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="9" cy="16" r="1"></circle></svg>
                        );
       case '19d':
                  return (
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path><circle cx="15" cy="16" r="1"></circle><circle cx="15" cy="19" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="12" cy="21" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="9" cy="16" r="1"></circle></svg>
                                  );
       case '19n':
                  return (
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path><circle cx="15" cy="16" r="1"></circle><circle cx="15" cy="19" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="12" cy="21" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="9" cy="16" r="1"></circle></svg>
                                );
       case '20d':
                    return (
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path><circle cx="15" cy="16" r="1"></circle><circle cx="15" cy="19" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="12" cy="21" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="9" cy="16" r="1"></circle></svg>
                                );
       case '20n':
                    return (
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path><circle cx="15" cy="16" r="1"></circle><circle cx="15" cy="19" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="12" cy="21" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="9" cy="16" r="1"></circle></svg>
                                );
        case '21d':
                    return (
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path><circle cx="15" cy="16" r="1"></circle><circle cx="15" cy="19" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="12" cy="21" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="9" cy="16" r="1"></circle></svg>
                              );
        case '21n':
                    return (
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M18.944,10.112C18.507,6.67,15.56,4,12,4C9.244,4,6.85,5.611,5.757,8.15C3.609,8.792,2,10.819,2,13c0,2.757,2.243,5,5,5v-2 c-1.654,0-3-1.346-3-3c0-1.403,1.199-2.756,2.673-3.015l0.581-0.103l0.192-0.559C8.149,7.273,9.895,6,12,6c2.757,0,5,2.243,5,5v1h1 c1.103,0,2,0.897,2,2s-0.897,2-2,2h-1v2h1c2.206,0,4-1.794,4-4C22,12.119,20.695,10.538,18.944,10.112z"></path><circle cx="15" cy="16" r="1"></circle><circle cx="15" cy="19" r="1"></circle><circle cx="12" cy="18" r="1"></circle><circle cx="12" cy="21" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="9" cy="16" r="1"></circle></svg>
                              );                     
      case '50d':
        return (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="5em" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3z"></path></svg>
        );
        case '50n':
          return (
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3z"></path></svg>
          );
      default:
        return null; // Return null for unknown weather codes or night conditions
    }
  };
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
        <p>{`Day ${index + 1}`}</p>
        <span className="icon-card2">
          {getWeatherIcon(forecastItem.weather[0].icon)}
        </span>
        <p>{`${forecastItem.main.temp}°C`}</p>
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