import HamburgerMenu from '../UserDashboard/HamburgerMenu/HamburgerMenu';
import ProfileButton from '../ProfileButton/ProfileButton';
import './Header.css';

const Header = ({ showSideBar, setShowSidebar, user }) => {
  return (
    <header className="header">
      <HamburgerMenu
        showSideBar={showSideBar}
        setShowSidebar={setShowSidebar}
      />
      <div className="profile-container">
        <ProfileButton user={user} />
      </div>
    </header>
  );
};

export default Header;
