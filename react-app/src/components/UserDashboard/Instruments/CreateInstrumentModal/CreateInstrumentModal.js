import './CreateInstrumentModal.css';

const CreateInstrumentModal = ({ user }) => {
  return (
    <div className="create-instrument-modal">
      <form className="create-instrument-form">
        <section className="create-instrument-form__img-section">
          <div className="create-instrument-form__img-container">
            <img src="" alt=""></img>
          </div>
          <div>
            <label htmlFor="instrument-image">Image Url</label>
            <input id="instrument-image" />
          </div>
        </section>
        <section className="create-instrument-form__type-section">
          <div>
            <label htmlFor="instrument-type">Type</label>
            <select id="instrument-type">
              <option>Drums</option>
              <option>Electric Guitar</option>
              <option>Flute</option>
            </select>
          </div>
          <div>
            <label htmlFor="instrument-category">Category</label>
            <select id="instrument-category">
              <option>Percussion</option>
              <option>String</option>
              <option>Woodwind</option>
              <option>Brass</option>
              <option>Electronic</option>
            </select>
          </div>
        </section>
        <section className="create-instrument-form__btn-section">
          <button className="create-instrument-form__create-btn">Create Instrument</button>
        </section>
      </form>
    </div>
  );
};

export default CreateInstrumentModal;
