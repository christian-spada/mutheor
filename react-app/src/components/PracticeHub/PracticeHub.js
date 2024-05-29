import Metronome from './Metronome/Metronome';
import SessionTimer from './SessionTimer/SessionTimer';
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
