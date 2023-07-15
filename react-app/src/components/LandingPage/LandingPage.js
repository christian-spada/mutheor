import { NavBar } from './NavBar/NavBar';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const user = useSelector(state => state.session.user);

  if (user) return <Redirect to={`/users/${user.id}/dashboard`} />;

  return (
    <div className="landing-page">
      <NavBar />
    </div>
  );
};

export default LandingPage;
