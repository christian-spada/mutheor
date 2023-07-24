import { formatDate, formatDuration } from '../../../../utils/helpers';
import './PracticeSessionCard.css';

const PracticeSessionCard = ({ session }) => {
  return (
    <div className="session-card card">
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
      <section className="session-card__notes-section">
        <p>{session.notes}</p>
      </section>
    </div>
  );
};

export default PracticeSessionCard;
