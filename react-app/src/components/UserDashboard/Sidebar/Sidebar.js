import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ sidebarRef, showSideBar, user }) => {
  return (
    <>
      <aside
        className={`sidebar ${showSideBar ? 'show' : ''}`}
        ref={sidebarRef}
      >
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
      </aside>
      {showSideBar && <div className="overlay"></div>}
    </>
  );
};

export default Sidebar;
