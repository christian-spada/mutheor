import { NavBar } from './NavBar/NavBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { logger } from '../../utils/helpers';
import { useEffect, useRef, useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const user = useSelector(state => state.session.user);
  // const [isInstrumentsVisible, setIsInstrumentsVisible] = useState();
  // const [isSessionsVisible, setIsSessionsVisible] = useState();
  // const [isGoalsVisible, setIsGoalsVisible] = useState();
  const instrumentsText = useRef();
  const instrumentsImg = useRef();
  const sessionsText = useRef();
  const sessionsImg = useRef();
  const goalsText = useRef();
  const goalsImg = useRef();

  const elementRefs = [
    instrumentsText,
    instrumentsImg,
    sessionsText,
    sessionsImg,
    goalsText,
    goalsImg,
  ];

  useEffect(() => {
    const handleIntersect = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.tagName === 'DIV') {
          entry.target.classList.add('show-text');
        }
        if (entry.isIntersecting && entry.target.tagName === 'IMG') {
          entry.target.classList.add('show-img');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect);

    elementRefs.forEach(ref => {
      observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
          <div
            ref={instrumentsText}
            className="fade"
          >
            <h2 className="instruments__headline">
              Create records for all of your instruments
            </h2>
            <h3 className="subheading">
              Keep all of your instruments in one place with pictures and info on them
            </h3>
          </div>
          <img
            ref={instrumentsImg}
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Instrument-card-image.png"
            alt="instrument-card"
            className="fade"
          ></img>
        </div>
      </section>
      <section className="sessions-section">
        <div className="sessions-section__content-container">
          <div
            ref={sessionsText}
            className="fade"
          >
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
            ref={sessionsImg}
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Session-Card-image.png"
            alt="session-card"
            className="fade"
          ></img>
        </div>
      </section>
      <section className="goals-section">
        <div className="goals-section__content-container">
          <div
            ref={goalsText}
            className="fade"
          >
            <h2 className="goals__headline">
              Create records for all of your goals. Upload your own pictures as well.
            </h2>
            <h3 className="subheading">Set goals to keep yourself accountable</h3>
          </div>
          <img
            ref={goalsImg}
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Goal-Card-image.png"
            alt="goal-card"
            className="fade"
          ></img>
        </div>
      </section>
      <footer style={{ height: '400px', backgroundColor: 'var(--primary-600)' }}></footer>
    </div>
  );
};

export default LandingPage;
