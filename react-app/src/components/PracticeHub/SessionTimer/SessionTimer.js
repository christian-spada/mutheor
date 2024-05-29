import { useEffect, useState } from 'react';
import CreatePracticeSessionModal from '../../UserDashboard/PracticeSessions/CreatePracticeSessionModal/CreatePracticeSessionModal';
import OpenModalButton from '../../OpenModalButton';
import './SessionTimer.css';

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

const EndSessionButton = ({ time }) => {
  /*
  bring up modal confirming if user would like to end session or not
    - if yes
      - enter modal that request details about session
        - instrument type
        - session notes
        - session focus
        ** date and session length will be entered automatically with current date and timer status, respectively **
      - update practice session store state
      - update practice session DB
    - if no
      - close modal
      - reset timer state to 0
  */
  const handleSessionEnd = () => {};

  return (
    <button
      onClick={handleSessionEnd}
      className="session-timer__end-session-btn"
    >
      End Session
    </button>
  );
};

const SessionTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const isSessionActive = !isActive && elapsedTime > 5;

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

      {isSessionActive && <EndSessionButton time={elapsedTime} />}
    </div>
  );
};

export default SessionTimer;
