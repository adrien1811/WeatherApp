import React, { useState, useEffect } from 'react';

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to update the current time
  const updateTime = () => {
    setCurrentTime(new Date());
  };

  // Set up an interval to update the time every second
  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format the time as "HH:mm:ss"
  const formattedTime = currentTime.toTimeString().slice(0, 8);

  return (
    <div>
      <h1>Current Time:</h1>
      <p>{formattedTime}</p>
    </div>
  );
}

export default CurrentTime;
