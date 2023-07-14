import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginForm } from './LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    history.push('/dashboard');
  }

  return (
    <div className="login-page">
      <div className="login-page__sidebar"></div>
      <div className="login-page__main-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
