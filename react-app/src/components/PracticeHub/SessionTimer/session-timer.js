import { useEffect, useState } from 'react';
import './session-timer.css';

const StartStopButton = ({ isActive, setIsActive }) => {
  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  return (
    <div className="session-timer__btn-container">
      {isActive ? (
        <button
          className="session-timer__stop-btn"
          onClick={stopTimer}
        >
          STOP
        </button>
      ) : (
        <button
          className="session-timer__start-btn"
          onClick={startTimer}
        >
          START
        </button>
      )}
    </div>
  );
};

const SessionTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const formatElapsedTime = time => {
    const hour = Math.floor(time / 3600).toString();
    const min = Math.floor((time % 3600) / 60).toString();
    const sec = (time % 60).toString();

    return `${hour.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isActive) return;

    const id = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isActive]);

  return (
    <div className="session-timer">
      <div className="session-timer__time-container">
        <span className="session-timer__time">{formatElapsedTime(elapsedTime)}</span>
      </div>

      <StartStopButton
        isActive={isActive}
        setIsActive={setIsActive}
      />

      {!isActive && <button className="session-timer__end-session-btn">End Session</button>}
    </div>
  );
};

export default SessionTimer;
