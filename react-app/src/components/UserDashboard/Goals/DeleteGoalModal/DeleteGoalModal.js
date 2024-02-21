import { useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';
import './DeleteGoalModal.css';
import { thunkDeleteGoal } from '../../../../store/goals';
import { thunkGetUser } from '../../../../store/session';

export const DeleteGoalModal = ({ goalToDelete, user }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(thunkDeleteGoal(user.id, goalToDelete));
    await dispatch(thunkGetUser(user.id));

    closeModal();
  };

  return (
    <div className="delete-goal-modal">
      <p>
        Are you sure you want to delete this goal?{' '}
        <span className="delete-warning">This action cannot be undone.</span>
      </p>
      <div className="delete-goal-modal__btn-container">
        <button
          className="delete-goal-modal__cancel-btn"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="delete-goal-modal__delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteGoalModal;
