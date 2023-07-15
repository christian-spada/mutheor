import { NavBar } from './NavBar/NavBar';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  if (user) history.push(`/users/${user.id}/dashboard`);

  return (
    <div className="landing-page">
      <NavBar />
    </div>
  );
};

export default LandingPage;
