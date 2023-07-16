import './PracticeSessionCard.css';

const PracticeSessionCard = ({ session }) => {
  return (
    <div
      className="session-card"
      style={{ height: '200px', width: '200px', backgroundColor: 'lightblue' }}
    >
      <header className="session-card__header">
        <i className="fa-solid fa-xmark"></i>
      </header>
      <section className="session-card__time">
        <div>{session.date}</div>
        <div>{session.duration}</div>
      </section>
    </div>
  );
};

export default PracticeSessionCard;
