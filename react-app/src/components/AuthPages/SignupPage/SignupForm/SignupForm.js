import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../../store/session';
import { ErrorView } from '../../../UtilComponents/ErrorView';
import './SignupForm.css';

export const SignupForm = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password));
    if (data?.errors) {
      if (confirmPassword !== password) {
        data.errors.confirmPasswordError =
          'Confirm Password field must be the same as the Password field';
      }
      setErrors(data.errors);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* {errors.prof && <ErrorView error={errors.email} />} */}
        <section className="signup-form__img-section">
          <div className="signup-form__img-container">
            <img className="signup-form__profile-pic" src="" alt=""></img>
          </div>
          <label htmlFor="signup-img">Profile Picture</label>
          <input
            className="signup-form__input--style"
            id="signup-img"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </section>
        {/* ===== EMAIL ===== */}
        {errors.email && <ErrorView error={errors.email} />}
        <section className="signup-form__email-section">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            className={`signup-form__input--style ${errors.email ? 'error-outline' : ''}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </section>

        {/* ===== NAME ===== */}
        {errors.username && <ErrorView error={errors.username} />}
        <section className="signup-form__name-section">
          <label htmlFor="signup-name">Username</label>
          <input
            id="signup-name"
            className={`signup-form__input--style ${errors.username ? 'error-outline' : ''}`}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </section>

        {/* ===== PASSWORD ===== */}
        {errors.confirmPasswordError && <ErrorView error={errors.confirmPasswordError} />}
        <section className="signup-form__password-section">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            className="signup-form__input--style"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </section>

        {/* ===== CONFIRM PASSWORD ===== */}
        <section className="signup-form__confirm-password-section">
          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <input
            id="signup-confirm-password"
            className={`signup-form__input--style ${
              errors.confirmPasswordError ? 'error-outline' : ''
            }`}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </section>

        {/* ===== BUTTON ===== */}
        <section className="signup-form__btn-section">
          <button className="signup-form__signup-btn" type="submit">
            Sign Up
          </button>
        </section>
      </form>
    </div>
  );
};
