import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginForm } from './LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  if (user) {
    history.push(`/users/${user.id}/dashboard`);
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
