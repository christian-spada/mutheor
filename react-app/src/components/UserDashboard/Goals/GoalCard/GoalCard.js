import { formatDate, getDaysRemaining } from '../../../../utils/helpers';
import OpenModalButton from '../../../OpenModalButton';
import DeleteGoalModal from '../DeleteGoalModal/DeleteGoalModal';
import EditGoalModal from '../EditGoalModal/EditGoalModal';
import useCardFlip from '../../../../custom-hooks/useCardFlip';
import './GoalCard.css';

const GoalCard = ({ goal, user }) => {
  const { isCardFlipped, flipCard } = useCardFlip();
  const currentDate = new Date();
  const targetDateObj = new Date(goal.targetDate);
  const daysRemaining = getDaysRemaining(targetDateObj, currentDate);

  return (
    <div
      className={`goal-card card ${daysRemaining < 0 ? 'target-date-missed' : ''} ${
        isCardFlipped ? 'isFlipped' : ''
      }`}
      onClick={flipCard}
    >
      <header className="goal-card__header">
        <OpenModalButton
          modalComponent={
            <EditGoalModal
              goalToEdit={goal}
              user={user}
            />
          }
          icon={<i className="fa-regular fa-pen-to-square goal-card__edit-btn"></i>}
        />

        <OpenModalButton
          modalComponent={
            <DeleteGoalModal
              goalToDelete={goal}
              user={user}
            />
          }
          icon={<i className="fa-solid fa-xmark goal-card__delete-btn"></i>}
        />
      </header>
      <div className={`goal-card__info-container ${isCardFlipped ? 'isFlipped' : ''}`}>
        <section className="goal-card__info-section">
          <div className="goal-card__instruments-container">
            <i className="fa-solid fa-sliders"></i>
            <div>
              <p className="goal-card__model">{goal.instrument.model}</p>
              <p className="goal-card__type">{goal.instrument.type}</p>
            </div>
          </div>
          <div>
            <i className="fa-regular fa-calendar"></i>
            <time>{formatDate(goal.targetDate, '-')}</time>
          </div>
        </section>

        <section className="goal-card__days-remaining-section">
          <p className="goal-card__days-remaining">
            {daysRemaining > 0 && (
              <>
                <span className="days-remaining">{daysRemaining}</span>
                <span> days remaining</span>
              </>
            )}
            {daysRemaining === 0 && (
              <span className="today-target-date">Today is your target date!</span>
            )}
            {daysRemaining < 0 && (
              <span className="missed-target-date-message">You missed your target date!</span>
            )}
          </p>
        </section>
      </div>

      <section
        className={`goal-card__description-section ${isCardFlipped ? 'isFlipped' : ''}`}
      >
        <p className="goal-card__description">{goal.description}</p>
      </section>
    </div>
  );
};

export default GoalCard;
