import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../../store/session';
import { ErrorView } from '../../../UtilComponents/ErrorView';
import './SignupForm.css';

export const SignupForm = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errors = {};
    if (email.length === 128) errors.email = 'You have reached the 128 character limit';
    if (password.length === 128) errors.password = 'You have reached the 128 character limit';
    if (username.length === 40) errors.username = 'You have reached the 40 character limit';

    setErrors(errors);
  }, [email, password, username]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password === confirmPassword) {
      const formData = new FormData();

      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profile_pic', image);

      setLoadingState(true);

      const data = await dispatch(signUp(formData));

      setLoadingState(false);

      if (data?.errors) {
        setErrors(data.errors);
      }
    } else {
      setErrors({ confirmPassword: 'Confirm password must be the same as password' });
    }
  };

  return (
    <div className="form-wrapper">
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <section className="signup-form__img-section">
          <div>
            <span>
              Profile Picture <span className="optional">(optional)</span>
            </span>
          </div>
          <div>
            <span className="signup-form__img-file-name">{image?.name}</span>
            <label htmlFor="signup-img">Choose Image File</label>
          </div>
          <input
            type="file"
            accept="image/*"
            className="signup-form__input--style"
            id="signup-img"
            onChange={e => setImage(e.target.files[0])}
          />
        </section>

        {/* ===== EMAIL ===== */}
        <section className="signup-form__email-section">
          {errors.email ? (
            <ErrorView error={errors.email} />
          ) : (
            <label htmlFor="signup-email">Email</label>
          )}
          <input
            id="signup-email"
            className={`signup-form__input--style ${errors.email ? 'error-outline' : ''}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
            maxLength={128}
          />
        </section>

        {/* ===== NAME ===== */}
        <section className="signup-form__name-section">
          {errors.username ? (
            <ErrorView error={errors.username} />
          ) : (
            <label htmlFor="signup-name">Username</label>
          )}
          <input
            id="signup-name"
            className={`signup-form__input--style ${errors.username ? 'error-outline' : ''}`}
            value={username}
            onChange={e => setUsername(e.target.value)}
            maxLength={40}
          />
        </section>

        {/* ===== PASSWORD ===== */}
        <section className="signup-form__password-section">
          {errors.password ? (
            <ErrorView error={errors.password} />
          ) : (
            <label htmlFor="signup-password">Password</label>
          )}
          <input
            id="signup-password"
            className={`signup-form__input--style ${errors.password ? 'error-outline' : ''}`}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={2}
            maxLength={128}
          />
        </section>

        {/* ===== CONFIRM PASSWORD ===== */}
        <section className="signup-form__confirm-password-section">
          {errors.confirmPassword ? (
            <ErrorView error={errors.confirmPassword} />
          ) : (
            <label htmlFor="signup-confirm-password">Confirm Password</label>
          )}
          <input
            id="signup-confirm-password"
            className={`signup-form__input--style ${
              errors.confirmPassword ? 'error-outline' : ''
            }`}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </section>

        {/* ===== BUTTON ===== */}
        <section className="signup-form__btn-section">
          <button
            className="signup-form__signup-btn"
            type="submit"
          >
            {loadingState ? 'Loading...' : 'Sign Up'}
          </button>
        </section>
      </form>
    </div>
  );
};
