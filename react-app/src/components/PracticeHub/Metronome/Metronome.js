import { useEffect, useState } from 'react';
import './Metronome.css';

const PlayButton = ({ setIsMetronomeActive }) => {
  const [isActive, setIsActive] = useState(false);

  const handleActiveStateChange = e => {
    setIsActive(prev => !prev);
    setIsMetronomeActive(prev => !prev);
  };

  return (
    <div
      className="playbutton"
      onClick={handleActiveStateChange}
    >
      {isActive ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
    </div>
  );
};

const BPMSlider = ({ setBpm }) => {
  return (
    <div className="bpm-slider">
      <i
        className="fa-solid fa-minus"
        onClick={e => setBpm(prev => Number(prev) - 1)}
      ></i>
      <input
        type="range"
        onChange={e => setBpm(e.target.value)}
        defaultValue={150}
        min={1}
        max={300}
      />
      <i
        className="fa-solid fa-plus"
        onClick={e => setBpm(prev => Number(prev) + 1)}
      ></i>
    </div>
  );
};

const Metronome = () => {
  const [bpm, setBpm] = useState(150);
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);

  useEffect(() => {
    if (isMetronomeActive) {
      const intervalId = setInterval(() => {
        console.log('bpm', bpm);
      }, Math.round(60000 / bpm));

      return () => clearInterval(intervalId);
    }
  }, [bpm, isMetronomeActive]);

  return (
    <div className="metronome">
      <div className="bpm-container">
        <div>
          <span className="bpm-container__bpm">{bpm}</span>
          <span>BPM</span>
        </div>
        <PlayButton setIsMetronomeActive={setIsMetronomeActive} />
      </div>
      <div className="bpm-slider-container">
        <BPMSlider setBpm={setBpm} />
      </div>
    </div>
  );
};

export default Metronome;
