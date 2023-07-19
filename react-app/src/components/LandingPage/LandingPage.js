import { NavBar } from './NavBar/NavBar';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LandingPage.css';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  if (user) return <Redirect to={`/users/${user.id}/dashboard`} />;

  return (
    <div className="landing-page">
      <section className="hero">
        <NavBar />
        <div className="hero__heading-container">
          <div className="hero__heading">
            <h1 className="hero__headline">Level Up Your Practice</h1>
            <p className="hero__subheading">
              Mutheor is a place for musicians to track there progress with practice session
              data and goal setting
            </p>
            <button
              className="hero__action-btn"
              onClick={() => history.push('/signup')}
            >
              Start Your Journey
            </button>
          </div>
          <div
            id="hero-session-card"
            className="session-card card"
          >
            <section className="session-card__time-section">
              <div>
                <i className="fa-regular fa-calendar"></i>
                <time>7/14/23</time>
              </div>
              <div>
                <i className="fa-regular fa-clock"></i>
                <span>1 h 43 m</span>
              </div>
            </section>
            <section className="session-card__instrument-type">
              <div>
                <i className="fa-solid fa-sliders"></i>
                <span>Fender Stratocaster</span>
              </div>
            </section>
            <section className="session-card__focus-area">
              <div>
                <i className="fa-solid fa-arrows-to-circle"></i>
                <span>Chords</span>
              </div>
            </section>
            <section className="session-card__notes-section">
              <p>Worked on maj7 chord voicings for every inversion</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
