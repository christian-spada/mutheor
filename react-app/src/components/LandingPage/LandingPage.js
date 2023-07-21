import { NavBar } from './NavBar/NavBar';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LandingPage.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const LandingPage = () => {
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  return (
    <div className="landing-page">
      <header style={{ position: 'sticky', top: 0 }}>
        <NavBar user={user} />
      </header>
      <section className="hero">
        <div className="hero__heading-container">
          <div className="hero__heading">
            <h1 className="hero__headline">Level Up Your Practice</h1>
            <h2 className="hero__subheading">
              Mutheor is a place for musicians to track there progress with practice session
              data and goal setting
            </h2>
            <Link to="/signup">
              <button className="hero__action-btn">Start Your Journey</button>
            </Link>
          </div>
          <img
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/splash-shapes.svg"
            alt=""
          ></img>
        </div>
      </section>
      <section className="instruments-section">
        <div className="instruments-section__content-container">
          <div>
            <h2 className="instruments__headline">
              Create records for all of your instruments
            </h2>
            <h3 className="subheading">
              Keep all of your instruments in one place with pictures and info on them
            </h3>
          </div>
          <img
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Instrument-card-image.png"
            alt="instrument-card"
          ></img>
        </div>
      </section>
      <section className="sessions-section">
        <div className="sessions-section__content-container">
          <div>
            <h2 className="sessions__headline">
              Create records for all of your practice sessions. Upload your own pictures as
              well.
            </h2>
            <h3 className="subheading">
              Keep record of all of your sessions with date information and notes on the
              session
            </h3>
          </div>
          <img
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Session-Card-image.png"
            alt="session-card"
          ></img>
        </div>
      </section>
      <section className="goals-section">
        <div className="goals-section__content-container">
          <div>
            <h2 className="goals__headline">
              Create records for all of your goals. Upload your own pictures as well.
            </h2>
            <h3 className="subheading">Set goals to keep yourself accountable</h3>
          </div>
          <img
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Goal-Card-image.png"
            alt="goal-card"
          ></img>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
