import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Hero.css';
import NavBar from '../NavBar/NavBar';

const Hero = ({ user, heroRef }) => {
  return (
    <section
      ref={heroRef}
      className="hero"
    >
      <NavBar user={user} />
      <div className="hero__layout">
        <div className="hero__heading">
          <h1 className="hero__headline">Level Up Your Practice</h1>
          <h2 className="hero__subheading">
            Mutheor is a place for musicians to track their progress with practice session data
            and goal setting
          </h2>
          <Link to="/signup">
            <button className="hero__action-btn">Start Your Journey</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
