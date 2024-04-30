import { useEffect, useRef, useState } from 'react';
import './Metronome.css';
import Synth_Tick_D_hi from './sounds/Synth_Tick_D_hi.wav';

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

const BPMSlider = ({ bpm, setBpm }) => {
  return (
    <div className="bpm-slider">
      <i
        className="fa-solid fa-minus"
        onClick={e => setBpm(prev => Number(prev) - 1)}
      ></i>
      <input
        type="range"
        onChange={e => setBpm(e.target.value)}
        value={bpm}
        min={40}
        max={230}
      />
      <i
        className="fa-solid fa-plus"
        onClick={e => setBpm(prev => Number(prev) + 1)}
      ></i>
    </div>
  );
};

const Metronome = () => {
  const [bpm, setBpm] = useState(140);
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    if (isMetronomeActive) {
      const intervalId = setInterval(() => {
        clickSoundRef.current.play();
      }, Math.round(60000 / bpm));

      return () => clearInterval(intervalId);
    }
  }, [bpm, isMetronomeActive]);

  return (
    <div className="metronome">
      <audio
        ref={clickSoundRef}
        src={Synth_Tick_D_hi}
      ></audio>
      <div className="bpm-container">
        <div>
          <span className="bpm-container__bpm">{bpm}</span>
          <span>BPM</span>
        </div>
        <PlayButton setIsMetronomeActive={setIsMetronomeActive} />
      </div>
      <div className="bpm-slider-container">
        <BPMSlider
          bpm={bpm}
          setBpm={setBpm}
        />
      </div>
    </div>
  );
};

export default Metronome;
