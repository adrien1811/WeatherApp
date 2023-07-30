import React, { useState, useEffect } from 'react'; // Import useEffect
import './navbar.css';

export default function Navibar() {
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to update the current time
  const updateCurrentTime = () => {
    setCurrentTime(new Date());
  };

  // Use useEffect to start and clear the interval for updating time
  useEffect(() => {
    const intervalId = setInterval(updateCurrentTime, 1000); // Update time every second
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <div className="navbar">
        <a href="#home">WeatherApp</a>
        <p className='Time'>Current Time: {currentTime.toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
