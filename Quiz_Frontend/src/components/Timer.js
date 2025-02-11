import React, { useState, useEffect } from 'react';
import './Timer.css'

const Timer = ({ handleSubmit }) => {
  const [timeLeft, setTimeLeft] = useState(60*2); // Timer set to 10 minutes (in seconds)

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();  // Call handleSubmit when the timer reaches zero
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [timeLeft, handleSubmit]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const timerClass = timeLeft <= 10 ? 'timer red' : 'timer';

  return (
    <div className={timerClass}>
      <p>Time Remaining: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
