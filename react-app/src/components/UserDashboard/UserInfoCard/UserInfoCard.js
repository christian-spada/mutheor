import { logger } from '../../../utils/helpers';
import './UserInfoCard.css';

const UserInfoCard = ({ user }) => {
  logger('user', user);
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
          <p># of Instruments - {user?.instruments.length}</p>
        </section>
        <section className="user-info-card__sessions-section">
          <p># of Practice Sessions - {user?.practiceSessions.length}</p>
        </section>
        <section className="user-info-card__goals-section">
          <p># of Goals - {user?.goals.length}</p>
        </section>
        <section className="user-info-card__achievements-section">
          <p># of Achievements - {user?.achievements.length}</p>
        </section>
      </div>
    </div>
  );
};

export default UserInfoCard;
