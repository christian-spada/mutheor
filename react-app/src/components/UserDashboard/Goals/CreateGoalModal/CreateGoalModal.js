import { useEffect, useState } from 'react';
import { logger } from '../../../../utils/helpers';
import './CreateGoalModal.css';
import { thunkCreateGoal } from '../../../../store/goals';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';

const CreateGoalModal = ({ user }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const instruments = user.instruments;
  const [instrumentId, setInstrumentId] = useState();
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState('');
  const [instrumentType, setInstrumentType] = useState(user.instruments[0].type);

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
      instrument_id: instrumentId,
      target_date: targetDate,
      description,
    };

    const res = await dispatch(thunkCreateGoal(user.id, newGoal));
    closeModal();
  };

  return (
    <div className="create-goal-modal">
      <form
        className="create-goal-form"
        onSubmit={handleSubmit}
      >
        {/* ===== INSTRUMENT TYPE SECTION ===== */}
        <section className="create-goal-form__type-section">
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
                    data-instrument-id={inst.id}
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
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
            />
          </div>
        </section>

        {/* ===== OPTIONAL INSTRUMENT MODEL SECTION ===== */}
        {multipleSameTypeInstruments.length > 1 && (
          <section className="create-goal-form__multiple-same-type-section">
            <label>Which one of your {instrumentType}'s?</label>
            <select
              className="create-goal-form__multiple-same-type"
              onChange={e => setInstrumentId(parseInt(e.target.value))}
            >
              {multipleSameTypeInstruments.map(inst => (
                <option
                  key={inst.id}
                  value={inst.id}
                >
                  {inst.nickname}
                </option>
              ))}
            </select>
          </section>
        )}
        {/* ===== GOAL DESCRIPTION SECTION ===== */}
        <section className="create-goal-form__description-section">
          <textarea
            className="create-goal-form__description"
            placeholder="Describe your goal here..."
            onChange={e => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </section>

        <section className="create-goal-form__btn-section">
          <button className="create-goal-form__create-goal-btn">Create Goal</button>
        </section>
      </form>
    </div>
  );
};

export default CreateGoalModal;
