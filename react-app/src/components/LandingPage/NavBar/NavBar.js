import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './NavBar.css';
import { useEffect, useState } from 'react';
import { logger } from '../../../utils/helpers';

const NavBar = ({ user }) => {
  const [backgroundColor, setBackgroundColor] = useState();

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const handleScroll = () => {
      if (hero.getBoundingClientRect().bottom <= 57) {
        setBackgroundColor('var(--primary-900)');
      } else {
        setBackgroundColor('initial');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav
      className="navbar"
      style={{ backgroundColor: backgroundColor }}
    >
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

export default NavBar;
