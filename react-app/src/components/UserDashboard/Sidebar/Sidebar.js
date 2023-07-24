import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ sidebarRef, showSideBar }) => {
  return (
    <aside
      className={`sidebar ${showSideBar ? 'show' : ''}`}
      ref={sidebarRef}
    >
      <ul className="sidebar__link-container">
        <Link to="/">
          <li className="sidebar__link">Home</li>
        </Link>
        <li
          className="sidebar__link"
          onClick={() => alert('Feature coming soon!')}
        >
          Practice Hub
        </li>
        <li
          className="sidebar__link"
          onClick={() => alert('Feature coming soon!')}
        >
          Your Stats
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
