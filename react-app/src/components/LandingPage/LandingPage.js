import { useHistory } from 'react-router-dom';
import './LandingPage.css';

const NavBar = () => {
  const history = useHistory();
  return (
    <nav className="landing-page__navbar">
      <div className="landing-page__logo-container">
        <div className="landing-page__logo"></div>
        <span className="landing-page__app-title">Mutheor</span>
      </div>
      <div className="landing-page__action-btn-container">
        <button onClick={() => history.push('/login')}>Login</button>
        <button onClick={() => history.push('/signup')}>Signup</button>
      </div>
    </nav>
  );
};

const LandingPage = () => {
  return (
    <div className="landing-page">
      <NavBar />
    </div>
  );
};

export default LandingPage;
