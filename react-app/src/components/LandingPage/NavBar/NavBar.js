import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useRef } from 'react';
import './NavBar.css';

const NavBar = ({ user, heroRef }) => {
  const navbarRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current.getBoundingClientRect().bottom <= 57) {
        navbarRef.current.classList.add('add-bg-color');
      } else {
        navbarRef.current.classList.remove('add-bg-color');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="navbar"
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
