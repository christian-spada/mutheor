import OpenModalButton from '../../OpenModalButton';
import './InstrumentCard.css';

const DeleteInstrumentModal = () => {
  return (
    <div>
      <h1>HEY</h1>
      <button>Delete</button>
    </div>
  );
};

const EditInstrumentModal = () => {
  return (
    <div>
      <h1>HEY</h1>
      <button>Save Changes</button>
    </div>
  );
};

const InstrumentCard = ({ instrument }) => {
  return (
    <div className="instrument-card card">
      <header className="instrument-card__header">
        <OpenModalButton
          modalComponent={EditInstrumentModal}
          icon={<i className="fa-regular fa-pen-to-square instrument-card__edit-btn"></i>}
        />

        <OpenModalButton
          modalComponent={DeleteInstrumentModal}
          icon={<i className="fa-solid fa-xmark instrument-card__delete-btn"></i>}
        />
      </header>
      <section className="instrument-card__img-section">
        <div className="instrument-card__img-container">
          <img src={instrument.image} alt="An instrument"></img>
        </div>
      </section>
      <section className="instrument-card__nickname-section">
        <div>
          <i className="fa-solid fa-signature"></i>
          <p className="instrument-card__nickname">{instrument.nickname}</p>
        </div>
      </section>
      <section className="instrument-card__type-section">
        <div>
          <i className="fa-solid fa-sliders"></i>
          <p>{instrument.type}</p>
        </div>
      </section>
      <section className="instrument-card__category-section">
        <div>
          <i className="fa-solid fa-circle-info"></i>
          <p>{instrument.category}</p>
        </div>
      </section>
    </div>
  );
};

export default InstrumentCard;
