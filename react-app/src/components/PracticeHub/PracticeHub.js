import Metronome from './Metronome/Metronome';
import SessionTimer from './SessionTimer/SessionTimer';
import './PracticeHub.css';

const PracticeHub = () => {
  return (
    <>
      <section className="practice-hub">
        <SessionTimer />
        <Metronome />
      </section>
    </>
  );
};
export default PracticeHub;
