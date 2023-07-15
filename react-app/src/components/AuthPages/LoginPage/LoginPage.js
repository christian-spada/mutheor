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
      <aside className="login-page__sidebar"></aside>
      <main className="login-page__main-section">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
