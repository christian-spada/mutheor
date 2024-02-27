import { thunkDeleteInstrument } from '../../../../../store/instruments';
import { thunkGetUser } from '../../../../../store/session';
import { thunkClearGoals } from '../../../../../store/goals';
import { thunkClearPracticeSessions } from '../../../../../store/practiceSessions';
import { useDispatch } from 'react-redux';
import './DeleteInstrumentModal.css';
import { useModal } from '../../../../../context/Modal';

const DeleteInstrumentModal = ({ instrumentToDelete, user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    dispatch(thunkDeleteInstrument(user.id, instrumentToDelete));
    dispatch(thunkGetUser(user.id));
    dispatch(thunkClearGoals(instrumentToDelete.id));
    dispatch(thunkClearPracticeSessions(instrumentToDelete.id));

    closeModal();
  };

  return (
    <div className="delete-instrument-modal">
      <p>
        Are you sure you want to delete this instrument?{' '}
        <span className="delete-warning">This action cannot be undone.</span>
      </p>
      <div className="delete-instrument-modal__btn-container">
        <button
          className="delete-instrument-modal__cancel-btn"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="delete-instrument-modal__delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteInstrumentModal;
