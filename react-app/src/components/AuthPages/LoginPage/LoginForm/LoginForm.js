import { useEffect, useState } from 'react';
import { login } from '../../../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ErrorView } from '../../../UtilComponents/ErrorView';
import './LoginForm.css';

export const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errors = {};
    if (email.length === 128) errors.email = 'You have reached the 128 character limit';
    if (password.length === 128) errors.password = 'You have reached the 128 character limit';
    setErrors(errors);
  }, [email, password]);

  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();

    const data = dispatch(login(email, password));

    if (data?.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/users/${data.id}/dashboard`);
    }
  };

  const handleDemoUser = async e => {
    e.preventDefault();

    dispatch(login('demo@aa.io', 'password'));
    history.push('/users/1/dashboard');
  };

  return (
    <div className="form-wrapper">
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <section className="login-form__input-section">
          {/* ===== NAME ===== */}
          <div className="login-form__name-container">
            {errors.email ? (
              <ErrorView error={errors.email} />
            ) : (
              <label htmlFor="login-email">Email</label>
            )}
            <input
              id="login-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="off"
              className={`login-form__input--style ${errors.email ? 'error-outline' : ''}`}
              maxLength={128}
            />
          </div>

          {/* ===== PASSWORD ===== */}
          <div className="login-form__password-container">
            {errors.password ? (
              <ErrorView error={errors.password} />
            ) : (
              <label htmlFor="login-password">Password</label>
            )}
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
              className={`login-form__input--style ${errors.password ? 'error-outline' : ''}`}
              minLength={2}
              maxLength={128}
            />
          </div>
        </section>

        {/* ===== BUTTONS ===== */}
        <section className="login-form__btn-section">
          <div className="login-form__btn-container">
            <button
              className="login-form__login-btn"
              type="submit"
            >
              Log In
            </button>
            <button
              className="login-form__demo-btn"
              onClick={handleDemoUser}
            >
              Demo User
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};
