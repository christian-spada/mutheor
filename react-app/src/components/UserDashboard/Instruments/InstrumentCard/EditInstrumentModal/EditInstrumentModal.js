import { useEffect, useRef, useState } from 'react';
import { logger } from '../../../../../utils/helpers';
import { useDispatch } from 'react-redux';
import { thunkEditInstrument } from '../../../../../store/instruments';
import { useModal } from '../../../../../context/Modal';
import { thunkGetUser } from '../../../../../store/session';
import './EditInstrumentModal.css';

const EditInstrumentModal = ({ instrumentToEdit, user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [previewImage, setPreviewImage] = useState(instrumentToEdit.image);
  const [image, setImage] = useState(instrumentToEdit.image);
  const [instrumentType, setInstrumentType] = useState(instrumentToEdit.type);
  const [category, setCategory] = useState(instrumentToEdit.category);

  const typeSelectRef = useRef();

  useEffect(() => {
    setInstrumentType(typeSelectRef.current?.value);
  }, [category]);

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handleTypeChange = e => {
    setInstrumentType(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedInstrument = {
      user_id: user.id,
      type: instrumentType,
      category,
      image,
    };

    await dispatch(thunkEditInstrument(user.id, updatedInstrument));

    await dispatch(thunkGetUser(user.id));
    closeModal();
  };

  return (
    <div className="edit-instrument-modal">
      <form
        className="edit-instrument-form"
        onSubmit={handleSubmit}
      >
        <section className="edit-instrument-form__img-section">
          <div className="edit-instrument-form__img-container">
            <img
              src={previewImage}
              alt=""
            ></img>
          </div>
          <div>
            <label htmlFor="edit-instrument-image">Image Url</label>
            <input
              id="edit-instrument-image"
              onBlur={e => setPreviewImage(e.target.value)}
              value={image}
              onChange={e => setImage(e.target.value)}
            />
          </div>
        </section>
        <section className="edit-instrument-form__type-section">
          <div>
            <label htmlFor="edit-instrument-type">Type</label>
            <select
              id="edit-instrument-type"
              value={instrumentType}
              onChange={handleTypeChange}
              ref={typeSelectRef}
            >
              {/* STRING */}
              {category === 'String' && (
                <>
                  <option>Electric Guitar</option>
                  <option>Acoustic Guitar</option>
                  <option>Bass</option>
                  <option>Violin</option>
                </>
              )}
              {/* PERCUSSION */}
              {category === 'Percussion' && (
                <>
                  <option>Drums</option>
                  <option>Bongos</option>
                  <option>Piano</option>
                </>
              )}
              {/* WOODWIND */}
              {category === 'Woodwind' && (
                <>
                  <option>Flute</option>
                  <option>Clarinet</option>
                  <option>Saxophone</option>
                </>
              )}
              {/* BRASS */}
              {category === 'Brass' && (
                <>
                  <option>Trumpet</option>
                  <option>Tuba</option>
                  <option>Trombone</option>
                </>
              )}
              {/* ELECTRONIC */}
              {category === 'Electronic' && (
                <>
                  <option>Synth</option>
                </>
              )}
            </select>
          </div>
          <div>
            <label htmlFor="edit-instrument-category">Category</label>
            <select
              id="edit-instrument-category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option>String</option>
              <option>Percussion</option>
              <option>Woodwind</option>
              <option>Brass</option>
              <option>Electronic</option>
            </select>
          </div>
        </section>
        <section className="edit-instrument-form__btn-section">
          <button className="edit-instrument-form__update-btn">Update Instrument</button>
        </section>
      </form>
    </div>
  );
};

export default EditInstrumentModal;
