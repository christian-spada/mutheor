import { useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import OpenModalButton from '../../OpenModalButton';
import CreatePracticeSessionModal from '../../UserDashboard/PracticeSessions/CreatePracticeSessionModal/CreatePracticeSessionModal';
import './EndSessionModal.css';

const EndSessionModal = ({ sessionTime }) => {
  const user = useSelector(state => state.session.user);
  const { closeModal } = useModal();

  return (
    <div className="end-session-modal">
      <p style={{ fontWeight: 500 }}>Are you sure you want to end this session?</p>
      <div className="end-session-modal__btn-container">
        <button
          className="end-session-modal__cancel-btn"
          onClick={closeModal}
        >
          Cancel
        </button>
        <OpenModalButton
          modalComponent={
            <CreatePracticeSessionModal
              user={user}
              isPracticeHubSession={true}
              sessionTime={sessionTime}
            />
          }
          icon={<button className="end-session-modal__btn">End Session</button>}
        />
      </div>
    </div>
  );
};

export default EndSessionModal;
