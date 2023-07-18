import { useEffect, useRef, useState } from 'react';
import { formatDate, logger } from '../../../../utils/helpers';
import { thunkEditGoal } from '../../../../store/goals';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';

import './EditGoalModal.css';

export const EditGoalModal = ({ goalToEdit, user }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  let dateInput = useRef();

  const [focus, setFocus] = useState(false);

  const instruments = user.instruments;
  const [instrumentId, setInstrumentId] = useState();
  const [targetDate, setTargetDate] = useState(goalToEdit.targetDate);
  const [description, setDescription] = useState(goalToEdit.description);
  const [instrumentType, setInstrumentType] = useState(goalToEdit.instrument.type);
  const [errors, setErrors] = useState({});

  const userInstruments = new Set();

  const multipleSameTypeInstruments = instruments.filter(inst => {
    return inst.type === instrumentType;
  });

  useEffect(() => {
    const currentInstrument = multipleSameTypeInstruments.find(
      inst => inst.type === instrumentType
    );

    setInstrumentId(currentInstrument.id);
  }, [instrumentType]);

  const handleSubmit = async e => {
    e.preventDefault();

    const newGoal = {
      id: goalToEdit.id,
      instrument_id: instrumentId,
      target_date: targetDate,
      description,
    };

    const res = await dispatch(thunkEditGoal(user.id, newGoal));

    if (res.errors) {
    } else {
      closeModal();
    }
  };

  if (dateInput.current) {
    if (focus) dateInput.current.setAttribute('type', 'date');
    else dateInput.current.setAttribute('type', 'text');
  }

  return (
    <div className="edit-goal-modal">
      <form
        className="edit-goal-form"
        onSubmit={handleSubmit}
      >
        {/* ===== INSTRUMENT TYPE SECTION ===== */}
        <section className="edit-goal-form__type-section">
          <div>
            <label htmlFor="goal-instrument-type">Instrument Type</label>
            <select
              value={instrumentType}
              onChange={e => setInstrumentType(e.target.value)}
              id="goal-instrument-type"
            >
              {instruments.map(inst => {
                if (userInstruments.has(inst.type)) return null;
                userInstruments.add(inst.type);
                return (
                  <option
                    key={inst.id}
                    value={inst.type}
                  >
                    {inst.type}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="goal-target-date">Target Date</label>
            <input
              type="text"
              value={targetDate}
              placeholder={0 + formatDate(goalToEdit.targetDate, '/')}
              onChange={e => setTargetDate(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              ref={dateInput}
              className="edit-goal-form__date-input"
            />
          </div>
        </section>

        {/* ===== OPTIONAL INSTRUMENT MODEL SECTION ===== */}
        {multipleSameTypeInstruments.length > 1 && (
          <section className="edit-goal-form__multiple-same-type-section">
            <label>Which one of your {instrumentType}'s?</label>
            <select
              className="edit-goal-form__multiple-same-type"
              onChange={e => setInstrumentId(parseInt(e.target.value))}
            >
              {multipleSameTypeInstruments.map(inst => (
                <option
                  key={inst.id}
                  value={inst.id}
                >
                  {inst.model}
                </option>
              ))}
            </select>
          </section>
        )}

        {/* ===== GOAL DESCRIPTION SECTION ===== */}
        <section className="edit-goal-form__description-section">
          <textarea
            className="edit-goal-form__description"
            placeholder="Describe your goal here..."
            onChange={e => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </section>
        <section className="edit-goal-form__btn-section">
          <button className="edit-goal-form__update-goal-btn">Update Goal</button>
        </section>
      </form>
    </div>
  );
};

export default EditGoalModal;
