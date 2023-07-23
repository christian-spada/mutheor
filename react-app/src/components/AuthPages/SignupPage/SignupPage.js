import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SignupForm } from './SignupForm/SignupForm';
import './SignupPage.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SignupPage = () => {
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  if (user) {
    history.push(`/users/${user.id}/dashboard`);
  }

  return (
    <div className="signup-page">
      <aside className="signup-page__sidebar"></aside>
      <main className="signup-page__main-section">
        <section>
          <div className="signup-page__member-redirect">
            <p>
              Already a member? Login{' '}
              <Link to="/login">
                <span className="login-redirect-btn">Here</span>
              </Link>
            </p>
          </div>
          <SignupForm />
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
