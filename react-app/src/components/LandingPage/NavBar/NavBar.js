import { useHistory } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
  const history = useHistory();
  return (
    <nav className="navbar">
      <div className="navbar__logo-container">
        <div className="navbar__logo"></div>
        <span className="navbar__app-title">Mutheor</span>
      </div>
      <div className="navbar__action-btn-container">
        <button onClick={() => history.push('/login')}>Login</button>
        <button onClick={() => history.push('/signup')}>Signup</button>
      </div>
    </nav>
  );
};
