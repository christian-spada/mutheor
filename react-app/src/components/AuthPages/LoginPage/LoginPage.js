import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginForm } from './LoginForm/LoginForm';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
        <section>
          <div className="signup-page__member-redirect">
            <p>
              Not yet a member? Signup{' '}
              <Link to="/signup">
                <span className="login-redirect-btn">Here</span>
              </Link>
            </p>
          </div>
          <LoginForm />
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
