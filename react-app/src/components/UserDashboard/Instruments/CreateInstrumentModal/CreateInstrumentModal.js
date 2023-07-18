import { useEffect, useRef, useState } from 'react';
import './CreateInstrumentModal.css';
import { logger } from '../../../../utils/helpers';
import { useDispatch } from 'react-redux';
import { thunkCreateInstrument } from '../../../../store/instruments';
import { useModal } from '../../../../context/Modal';
import { thunkGetUser } from '../../../../store/session';

const CreateInstrumentModal = ({ user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [image, setImage] = useState('');
  const [instrumentType, setInstrumentType] = useState('Electric Guitar');
  const [category, setCategory] = useState('String');

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

    const newInstrument = {
      user_id: user.id,
      type: instrumentType,
      category,
      image,
    };

    await dispatch(thunkCreateInstrument(user.id, newInstrument));

    await dispatch(thunkGetUser(user.id));
    closeModal();
  };

  logger('type ref', typeSelectRef.current?.value);
  logger('instrumentType', instrumentType);
  logger('image', image);
  logger('category', category);
  return (
    <div className="create-instrument-modal">
      <form
        className="create-instrument-form"
        onSubmit={handleSubmit}
      >
        <section className="create-instrument-form__img-section">
          <div className="create-instrument-form__img-container">
            <img
              src={image}
              alt=""
            ></img>
          </div>
          <div>
            <label htmlFor="create-instrument-image">Image Url</label>
            <input
              id="create-instrument-image"
              onBlur={e => setImage(e.target.value)}
            />
          </div>
        </section>
        <section className="create-instrument-form__type-section">
          <div>
            <label htmlFor="create-instrument-type">Type</label>
            <select
              id="create-instrument-type"
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
            <label htmlFor="create-instrument-category">Category</label>
            <select
              id="create-instrument-category"
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
        <section className="create-instrument-form__btn-section">
          <button className="create-instrument-form__create-btn">Create Instrument</button>
        </section>
      </form>
    </div>
  );
};

export default CreateInstrumentModal;
