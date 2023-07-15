import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton/ProfileButton';
import './UserDashboard.css';
import { useEffect, useRef, useState } from 'react';

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
  const sidebar = useRef();

  useEffect(() => {
    if (!showSideBar) return;

    const closeMenu = e => {
      if (!sidebar.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showSideBar]);

  return (
    <>
      <header className="user-dashboard__header">
        <HamburgerMenu showSideBar={showSideBar} setShowSidebar={setShowSidebar} />
        <div className="user-dashboard__profile-container">
          <ProfileButton user={user} />
        </div>
      </header>
      <main>
        <aside
          className={`user-dashboard__sidebar ${showSideBar ? 'show' : ''}`}
          ref={sidebar}
        ></aside>
        {showSideBar && <div className="overlay"></div>}
      </main>
    </>
  );
};
export default UserDashboard;
