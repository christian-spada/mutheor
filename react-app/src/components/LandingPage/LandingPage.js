import Hero from './Hero/Hero';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const user = useSelector(state => state.session.user);
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
        const { tagName, alt, classList } = entry.target;
        if (entry.isIntersecting && tagName === 'DIV') {
          classList.add('show-text');
          return;
        }
        if (entry.isIntersecting && tagName === 'IMG') {
          alt !== 'session-card'
            ? classList.add('show-img', 'right')
            : classList.add('show-img', 'left');
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
      <Hero user={user} />
      <section className="instruments-section">
        <div
          ref={instrumentsText}
          className="fade"
        >
          <h2 className="instruments__headline">Create records for all of your instruments</h2>
          <h3 className="subheading">
            Keep all of your instruments in one place with pictures and info on them
          </h3>
        </div>
        <img
          ref={instrumentsImg}
          src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Instrument-card-svg.svg"
          alt="instrument-card"
          className="fade"
        ></img>
      </section>
      <section className="sessions-section">
        <img
          ref={sessionsImg}
          src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Session-Card-svg.svg"
          alt="session-card"
          className="fade"
        ></img>
        <div
          ref={sessionsText}
          className="fade"
        >
          <h2 className="sessions__headline">
            Create records for all of your practice sessions.
          </h2>
          <h3 className="subheading">
            Keep record of all of your sessions with date information and notes on the session
          </h3>
        </div>
      </section>
      <section className="goals-section">
        <div
          ref={goalsText}
          className="fade"
        >
          <h2 className="goals__headline">Create records for all of your goals.</h2>
          <h3 className="subheading">Set goals to keep yourself accountable</h3>
        </div>
        <img
          ref={goalsImg}
          src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Goal-Card-svg.svg"
          alt="goal-card"
          className="fade"
        ></img>
      </section>
      <footer className="landing-page__footer">
        <div className="landing-page__footer-info-container">
          <div className="developer-attribution">
            <p>
              Designed <span>&&</span> Developed by:
            </p>
            <p className="name">Christian Spada</p>
          </div>
          <div className="social-icons-container">
            <a
              href="https://github.com/christian-spada"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-square-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/christian-s-82a24a23b/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
