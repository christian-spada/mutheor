import OpenModalButton from '../../../OpenModalButton';
import DeleteInstrumentModal from './DeleteInstrumentModal/DeleteInstrumentModal';
import EditInstrumentModal from './EditInstrumentModal/EditInstrumentModal';
import './InstrumentCard.css';

const InstrumentCard = ({ instrument, user }) => {
  return (
    <div className="instrument-card card">
      <header className="instrument-card__header">
        <OpenModalButton
          modalComponent={
            <EditInstrumentModal
              instrumentToEdit={instrument}
              user={user}
            />
          }
          icon={<i className="fa-regular fa-pen-to-square instrument-card__edit-btn"></i>}
        />

        <OpenModalButton
          modalComponent={
            <DeleteInstrumentModal
              instrumentToDelete={instrument}
              user={user}
            />
          }
          icon={<i className="fa-solid fa-xmark instrument-card__delete-btn"></i>}
        />
      </header>
      <section className="instrument-card__img-section">
        <div className="instrument-card__img-container">
          <img
            src={instrument.image}
            alt="An instrument"
            loading="lazy"
          ></img>
        </div>
      </section>
      <section className="instrument-card__model-section">
        <div>
          <i className="fa-solid fa-signature"></i>
          <p className="instrument-card__model">{instrument.model}</p>
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
