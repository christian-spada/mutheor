import './UserInfoCard.css';

const UserInfoCard = ({ user }) => {
  return (
    <div className="user-info-card">
      <div className="user-info-card__img-container">
        <img className="user-info-card__img" src={user?.profilePic} alt=""></img>
      </div>
      <div className="user-info-card__info"></div>
    </div>
  );
};

export default UserInfoCard;
