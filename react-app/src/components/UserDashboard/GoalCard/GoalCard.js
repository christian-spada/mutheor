import './GoalCard.css';

const GoalCard = ({ goal }) => {
  return (
    <div className="goal-card card">
      <header className="goal-card__header">
        <i className="fa-regular fa-pen-to-square"></i>
        <i className="fa-solid fa-xmark"></i>
      </header>
    </div>
  );
};

export default GoalCard;
