import { formatDate, formatDuration } from '../../../../utils/helpers';
import useCardFlip from '../../../../custom-hooks/useCardFlip';
import './PracticeSessionCard.css';

const PracticeSessionCard = ({ session }) => {
  const { isCardFlipped, flipCard } = useCardFlip();
  return (
    <div
      className={`session-card card ${isCardFlipped ? 'isFlipped' : ''}`}
      onClick={flipCard}
    >
      <div className={`session-card__info-container ${isCardFlipped ? 'isFlipped' : ''}`}>
        <section className="session-card__time-section">
          <div>
            <i className="fa-regular fa-calendar"></i>
            <time>{formatDate(session.date, '-')}</time>
          </div>
          <div>
            <i className="fa-regular fa-clock"></i>
            <span>{formatDuration(session.duration)}</span>
          </div>
        </section>
        <section className="session-card__info-section">
          <div>
            <i className="fa-solid fa-sliders"></i>
            <div>
              <p className="session-card__model">{session.instrument.model}</p>
              <p className="session-card__type">{session.instrument.type}</p>
            </div>
          </div>
          <div>
            <i className="fa-solid fa-arrows-to-circle"></i>
            <span className="session-card__focus">{session.areaOfFocus}</span>
          </div>
        </section>
      </div>
      <section className={`session-card__notes-section ${isCardFlipped ? 'isFlipped' : ''}`}>
        <p>{session.notes}</p>
      </section>
    </div>
  );
};

export default PracticeSessionCard;
