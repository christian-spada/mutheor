import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './UserDashboard.css';
import { useState } from 'react';

const HamburgerMenu = ({ showSideBar, setShowSidebar }) => {
  const handleClick = e => {
    setShowSidebar(!showSideBar);
  };

  const menuBarClass = `hamburger-menu-bar ${showSideBar ? 'open ' : ''}`;

  return (
    <div className="hamburger-menu" onClick={handleClick}>
      <div className={menuBarClass + 'bar-1'}></div>
      <div className={menuBarClass + 'bar-2'}></div>
      <div className={menuBarClass + 'bar-3'}></div>
    </div>
  );
};

const UserDashboard = () => {
  const user = useSelector(state => state.session.user);
  const [showSideBar, setShowSidebar] = useState(false);

  return (
    <>
      <header className="user-dashboard__header">
        <HamburgerMenu showSideBar={showSideBar} setShowSidebar={setShowSidebar} />
        <div className="user-dashboard__profile-container">
          <ProfileButton user={user} />
        </div>
      </header>
      <main>
        <aside className={`user-dashboard__sidebar ${showSideBar ? 'show' : ''}`}></aside>
        {showSideBar && <div className="overlay"></div>}
      </main>
    </>
  );
};
export default UserDashboard;
