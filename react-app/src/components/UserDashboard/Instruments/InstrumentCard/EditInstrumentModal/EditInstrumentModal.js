import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkEditInstrument } from '../../../../../store/instruments';
import { useModal } from '../../../../../context/Modal';
import { thunkEditUserInstrument, thunkGetUser } from '../../../../../store/session';
import './EditInstrumentModal.css';
import { ErrorView } from '../../../../UtilComponents/ErrorView';

const EditInstrumentModal = ({ instrumentToEdit, user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [image, setImage] = useState(instrumentToEdit.image);
  const [instrumentType, setInstrumentType] = useState(instrumentToEdit.type);
  const [model, setModel] = useState(instrumentToEdit.model);
  const [category, setCategory] = useState(instrumentToEdit.category);
  const [errors, setErrors] = useState({});

  const [loadingState, setLoadingState] = useState(false);

  const typeSelectRef = useRef();

  useEffect(() => {
    if (model.length === 20) setErrors({ model: 'You have reached the max character limit' });
    else setErrors({});
  }, [model]);

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

    formData.append('id', instrumentToEdit.id);
    formData.append('user_id', user.id);
    formData.append('type', instrumentType);
    formData.append('model', model);
    formData.append('category', category);
    formData.append('image', image);

    setLoadingState(true);

    const res = await dispatch(thunkEditInstrument(user.id, formData));

    dispatch(thunkEditUserInstrument(res));

    setLoadingState(false);

    if (res.errors) {
      setErrors(res.errors);
    } else {
      closeModal();
    }
  };

  return (
    <div className="edit-instrument-modal">
      <form
        className="edit-instrument-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <section className="edit-instrument-form__img-section">
          <div className="edit-instrument-form__img-container">
            <img
              src={image}
              alt=""
            ></img>
          </div>
          <div>
            <span className="edit-instrument-form__img-file-name">{image?.name}</span>
            <label htmlFor="edit-instrument-image">Choose Image File</label>
            <input
              type="file"
              accept="image/*"
              id="edit-instrument-image"
              onChange={e => setImage(e.target.files[0])}
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
        <section className="edit-instrument-form__model-section">
          {errors.model ? (
            <ErrorView error={errors.model} />
          ) : (
            <label htmlFor="edit-instrument-model">Model</label>
          )}
          <input
            id="edit-instrument-model"
            onChange={e => setModel(e.target.value)}
            value={model}
            className={errors.model && 'error-outline'}
            maxLength={20}
          />
        </section>
        <section className="edit-instrument-form__btn-section">
          <button className="edit-instrument-form__update-btn">
            {loadingState ? 'Loading...' : 'Update Instrument'}
          </button>
        </section>
      </form>
    </div>
  );
};

export default EditInstrumentModal;
