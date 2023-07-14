import { useState } from 'react';
import { login } from '../../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ErrorView } from '../../UtilComponents/ErrorView';
import { logger } from '../../../utils/helpers';
import './LoginForm.css';

export const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const data = await dispatch(login(email, password));

    if (data?.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/users/${data.id}/dashboard`);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <section className="login-form__input-section">
          <div className="login-form__name-container">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="off"
              className="login-form__input--style"
            />
            {errors.email && <ErrorView error={errors.email} styling={'login-form__name'} />}
          </div>
          <div className="login-form__password-container">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="off"
              className="login-form__input--style"
            />
            {errors.password && (
              <ErrorView error={errors.password} styling={'login-form__password'} />
            )}
          </div>
        </section>
        <section className="login-form__btn-section">
          <div className="login-form__btn-container">
            <button className="login-form__login-btn" type="submit">
              Log In
            </button>
            <button className="login-form__demo-btn" type="submit">
              Demo User
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};