import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SignupForm } from './SignupForm/SignupForm';
import './SignupPage.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const SignupPage = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    history.push('/');
  }

  return (
    <div className="signup-page">
      <aside className="signup-page__sidebar"></aside>
      <main className="signup-page__main-section">
        <section>
          <div className="signup-page__member-redirect">
            <p>
              Already a member? Login{' '}
              <span
                className="login-redirect-btn"
                onClick={() => history.push('/login')}
              >
                Here
              </span>
            </p>
          </div>
          <SignupForm />
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
