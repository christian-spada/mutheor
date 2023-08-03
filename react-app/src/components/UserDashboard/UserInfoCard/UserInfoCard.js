import './UserInfoCard.css';

const UserInfoCard = ({ user }) => {
  return (
    <div className="user-info-card">
      <div className="user-info-card__img-container">
        <img
          className="user-info-card__img"
          src={user?.profilePic}
          alt=""
        ></img>
      </div>
      <div className="user-info-card__info">
        <section className="user-info-card__instruments-section">
          <p>
            <span className="num-tag"> #</span> of Instruments -{' '}
            <span className="num-count">{user?.instruments.length}</span>
          </p>
        </section>
        <section className="user-info-card__sessions-section">
          <p>
            <span className="num-tag"> #</span> of Practice Sessions -{' '}
            <span className="num-count">{user?.practiceSessions.length}</span>
          </p>
        </section>
        <section className="user-info-card__goals-section">
          <p>
            <span className="num-tag"> #</span> of Goals -{' '}
            <span className="num-count">{user?.goals.length}</span>
          </p>
        </section>
        <section className="user-info-card__achievements-section">
          <p>
            <span className="num-tag"> #</span> of Achievements -{' '}
            <span className="num-count">{user?.achievements.length}</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default UserInfoCard;
