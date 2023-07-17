import { thunkDeleteInstrument } from '../../../../../store/instruments';
import { useDispatch } from 'react-redux';
import './DeleteInstrumentModal.css';
import { useModal } from '../../../../../context/Modal';
import { logger } from '../../../../../utils/helpers';

const DeleteInstrumentModal = ({ instrumentToDelete, user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const message = await dispatch(thunkDeleteInstrument(user.id, instrumentToDelete));
    logger('message res', message);
    closeModal();
  };

  return (
    <div className="delete-instrument-modal">
      <p>Are you sure you want to delete this instrument? This action cannot be undone.</p>
      <div className="delete-instrument-modal__btn-container">
        <button className="delete-instrument-modal__cancel-btn" onClick={closeModal}>
          Cancel
        </button>
        <button className="delete-instrument-modal__delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteInstrumentModal;
