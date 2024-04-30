import './Metronome.css';

const PlayButton = () => {
  return (
    <div className="playbutton">
      <i className="fa-solid fa-play"></i>
    </div>
  );
};

const BPMSlider = () => {
  return (
    <div className="">
      <i className="fa-solid fa-minus"></i>
      <input type="range" />
      <i className="fa-solid fa-plus"></i>
    </div>
  );
};

const Metronome = () => {
  return (
    <div className="metronome">
      <div className="bpm-container">
        <div>
          <span>100</span>
          <span>BPM</span>
        </div>
        <PlayButton />
      </div>
      <div>
        <BPMSlider />
      </div>
    </div>
  );
};

export default Metronome;
