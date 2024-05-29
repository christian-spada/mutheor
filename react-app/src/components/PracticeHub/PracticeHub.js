import Metronome from './Metronome/Metronome';
import SessionTimer from './SessionTimer/session-timer';
import './PracticeHub.css';

const PracticeHub = () => {
  return (
    <>
      <SessionTimer />
      <Metronome />
    </>
  );
};
export default PracticeHub;
