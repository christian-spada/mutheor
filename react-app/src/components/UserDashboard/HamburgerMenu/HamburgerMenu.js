import './HamburgerMenu.css';

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

export default HamburgerMenu;
