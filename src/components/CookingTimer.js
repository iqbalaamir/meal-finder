import React, { useState, useEffect } from 'react';
import './CookingTimer.css';

const CookingTimer = ({ time, animated }) => {
  const [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    if (seconds === 0) {
      setIsActive(false);
    }
  }, [seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`cooking-timer ${animated ? 'animated' : ''}`}>
      <span className="time">{seconds}s</span>
      <button onClick={toggleTimer} className="timer-button">
        {isActive ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default CookingTimer;
