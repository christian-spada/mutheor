import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../../store/session';
import { ErrorView } from '../../../UtilComponents/ErrorView';
import './SignupForm.css';

export const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };
  return (
    <div className="form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form__email-container">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            className="signup-form__input--style"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="signup-form__name-container">
          <label htmlFor="signup-name">Username</label>
          <input
            id="signup-name"
            className="signup-form__input--style"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="signup-form__password-container">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            className="signup-form__input--style"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="signup-form__confirm-password-container">
          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <input
            id="signup-confirm-password"
            className="signup-form__input--style"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="signup-form__btn-container">
          <button className="signup-form__signup-btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
