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
  const [model, setModel] = useState('');
  const [category, setCategory] = useState('String');

  const [loadingState, setLoadingState] = useState(false);

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

    const formData = new FormData();

    formData.append('user_id', user.id);
    formData.append('type', instrumentType);
    formData.append('model', model);
    formData.append('category', category);
    formData.append('image', image);

    setLoadingState(true);

    await dispatch(thunkCreateInstrument(user.id, formData));

    await dispatch(thunkGetUser(user.id));

    closeModal();
    setLoadingState(false);
  };

  return (
    <div className="create-instrument-modal">
      <form
        className="create-instrument-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <section className="create-instrument-form__img-section">
          <span className="create-instrument-form__img-file-name">{image?.name}</span>
          <label htmlFor="create-instrument-image">Choose Image File</label>
          <input
            type="file"
            accept="image/*"
            id="create-instrument-image"
            onChange={e => setImage(e.target.files[0])}
          />
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
        <section className="create-instrument-form__model-section">
          <label htmlFor="create-instrument-model">Model</label>
          <input
            id="create-instrument-model"
            onChange={e => setModel(e.target.value)}
            value={model}
          />
        </section>
        <section className="create-instrument-form__btn-section">
          <button className="create-instrument-form__create-btn">
            {loadingState ? 'Loading...' : 'Create Instrument'}
          </button>
        </section>
      </form>
    </div>
  );
};

export default CreateInstrumentModal;
