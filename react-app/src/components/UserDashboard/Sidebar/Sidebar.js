import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({
  sidebarRef,
  showSideBar,
  user,
  isDashboard,
  isPracticeHub,
  isYourStats,
}) => {
  const fromDashboard = (
    <ul className="sidebar__link-container">
      <Link to="/">
        <li className="sidebar__link">Home</li>
      </Link>
      <Link to={`/users/${user.id}/practice-hub`}>
        <li className="sidebar__link">Practice Hub</li>
      </Link>
      <li
        className="sidebar__link"
        onClick={() => alert('Feature coming soon!')}
      >
        Your Stats
      </li>
    </ul>
  );

  const fromPracticeHub = (
    <ul className="sidebar__link-container">
      <Link to="/">
        <li className="sidebar__link">Home</li>
      </Link>
      <Link to={`/users/${user.id}/dashboard`}>
        <li className="sidebar__link">Dashboard</li>
      </Link>
      <li
        className="sidebar__link"
        onClick={() => alert('Feature coming soon!')}
      >
        Your Stats
      </li>
    </ul>
  );

  const fromYourStats = (
    <ul className="sidebar__link-container">
      <Link to="/">
        <li className="sidebar__link">Home</li>
      </Link>
      <Link to={`/users/${user.id}/dashboard`}>
        <li className="sidebar__link">Dashboard</li>
      </Link>
      <Link to={`/users/${user.id}/practice-hub`}>
        <li className="sidebar__link">Practice Hub</li>
      </Link>
    </ul>
  );
  return (
    <>
      <aside
        className={`sidebar ${showSideBar ? 'show' : ''}`}
        ref={sidebarRef}
      >
        {isDashboard && fromDashboard}
        {isPracticeHub && fromPracticeHub}
        {isYourStats && fromYourStats}
      </aside>
      {showSideBar && <div className="overlay"></div>}
    </>
  );
};

export default Sidebar;
