import './NavBar.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const NavBar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo-container">
        <div className="navbar__logo"></div>
        <span className="navbar__app-title">Mutheor</span>
      </div>
      <div className="navbar__action-btn-container">
        {user ? (
          <Link to={`/users/${user.id}/dashboard`}>
            <button>Dashboard</button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
