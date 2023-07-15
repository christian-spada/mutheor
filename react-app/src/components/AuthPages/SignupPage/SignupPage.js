import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SignupForm } from './SignupForm/SignupForm';
import './SignupPage.css';

const SignupPage = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    history.push('/');
  }

  return (
    <div className="signup-page">
      <div className="signup-page__sidebar"></div>
      <div className="signup-page__main-section">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
