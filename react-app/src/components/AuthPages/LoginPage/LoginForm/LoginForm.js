import { useState } from 'react';
import { login } from '../../../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ErrorView } from '../../../UtilComponents/ErrorView';
import { logger } from '../../../../utils/helpers';
import './LoginForm.css';

export const LoginForm = () => {
  // TODO - make validation errors display more naturally

  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();

    const data = await dispatch(login(email, password));

    if (data?.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/users/${data.id}/dashboard`);
    }
  };

  const handleDemoUser = async e => {
    e.preventDefault();

    await dispatch(login('demo@aa.io', 'password'));
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
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="off"
              className={`login-form__input--style ${errors.email ? 'error-outline' : ''}`}
            />
            {errors.email && (
              <ErrorView
                error={errors.email}
                styling="login-form__name"
              />
            )}
          </div>

          {/* ===== PASSWORD ===== */}
          <div className="login-form__password-container">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
              className={`login-form__input--style ${errors.password ? 'error-outline' : ''}`}
            />
            {errors.password && (
              <ErrorView
                error={errors.password}
                styling="login-form__password"
              />
            )}
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
