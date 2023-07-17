import { logger, formatDate, formatDuration } from '../../../utils/helpers';
import './PracticeSessionCard.css';

const PracticeSessionCard = ({ session }) => {
  const handleDelete = async () => {};

  return (
    <div className="session-card card">
      <header className="session-card__header">
        <i className="fa-solid fa-xmark"></i>
      </header>
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
      <section className="session-card__instrument-type">
        <div>
          <i className="fa-solid fa-sliders"></i>
          <span>
            {session.instrument.type}{' '}
            {session.instrument.nickname !== 'Needs nickname!'
              ? session.instrument.nickname
              : ''}
          </span>
        </div>
      </section>
      <section className="session-card__focus-area">
        <div>
          <i onClick={handleDelete} className="fa-solid fa-arrows-to-circle"></i>
          <span>{session.areaOfFocus}</span>
        </div>
      </section>
      <section className="session-card__notes-section">
        <p>{session.notes}</p>
      </section>
    </div>
  );
};

export default PracticeSessionCard;
