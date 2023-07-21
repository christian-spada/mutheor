import { useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';
import { useEffect, useState } from 'react';
import { thunkCreatePracticeSession } from '../../../../store/practiceSessions';
import './CreatePracticeSessionModal.css';
import { ErrorView } from '../../../UtilComponents/ErrorView';
import { thunkGetUser } from '../../../../store/session';

const CreatePracticeSessionModal = ({ user }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const instruments = user.instruments;
  const [instrumentId, setInstrumentId] = useState();
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState(1);
  const [notes, setNotes] = useState('');
  const [areaOfFocus, setAreaOfFocus] = useState('Chords');
  const [instrumentType, setInstrumentType] = useState(user.instruments[0].type);

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

    const newSession = {
      user_id: user.id,
      instrument_id: instrumentId,
      duration,
      date,
      area_of_focus: areaOfFocus,
      notes,
    };

    const res = await dispatch(thunkCreatePracticeSession(user.id, newSession));

    await dispatch(thunkGetUser(user.id));

    if (res.errors) {
      setErrors(res.errors);
    } else {
      closeModal();
    }
  };

  return (
    <div className="create-session-modal">
      <form
        className="create-session-form"
        onSubmit={handleSubmit}
      >
        <section className="create-session-form__time-section">
          <div className="create-session-form__date-container">
            {errors.date ? (
              <ErrorView error={errors.date} />
            ) : (
              <label htmlFor="create-session-date">Date</label>
            )}
            <input
              id="create-session-date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className={errors.date && 'error-outline'}
            />
          </div>
          <div className="create-session-form__duration-container">
            {errors.duration && <ErrorView error={errors.duration} />}
            <label htmlFor="create-session-duration">Duration (minutes)</label>
            <input
              id="create-session-duration"
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
            />
          </div>
        </section>
        <div className="session-flex">
          <section className="create-session-form__instrument-section">
            <label htmlFor="create-session-inst-type">Instrument Type</label>
            <select
              id="create-session-inst-type"
              value={instrumentType}
              onChange={e => setInstrumentType(e.target.value)}
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
          </section>
          <section className="create-session-form__focus-section">
            <label htmlFor="create-session-focus">Area of Focus</label>
            <select
              id="create-session-focus"
              value={areaOfFocus}
              onChange={e => setAreaOfFocus(e.target.value)}
            >
              <option value="Chords">Chords</option>
              <option value="Scales">Scales</option>
              <option value="Technique">Technique</option>
              <option value="Theory">Theory</option>
              <option value="Rhythm">Rhythm</option>
              <option value="Repertoire">Repertoire</option>
            </select>
          </section>
        </div>
        {/* ===== OPTIONAL INSTRUMENT MODEL SECTION ===== */}
        {multipleSameTypeInstruments.length > 1 && (
          <section className="create-session-form__multiple-same-type-section">
            <label htmlFor="create-session-multiple-inst-type">
              Which one of your {instrumentType}'s?
            </label>
            <select
              id="create-session-multiple-inst-type"
              className="create-session-form__multiple-same-type"
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
        <section className="create-session-form__notes-section">
          {errors.notes ? (
            <ErrorView error={errors.notes} />
          ) : (
            <label htmlFor="create-session-notes">Session Notes</label>
          )}
          <textarea
            id="create-session-notes"
            placeholder="Describe what you worked on here..."
            onChange={e => setNotes(e.target.value)}
            value={notes}
            className={errors.notes && 'error-outline'}
          />
        </section>
        <section className="create-session-form__btn-section">
          <button className="create-session-form__create-session-btn">Create Session</button>
        </section>
      </form>
    </div>
  );
};

export default CreatePracticeSessionModal;
