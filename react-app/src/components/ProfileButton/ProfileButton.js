import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { logger } from '../../utils/helpers';
import './ProfileButton.css';
import { Redirect } from 'react-router-dom';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const handleLogout = async e => {
    await dispatch(logout());
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

  if (showMenu && !user) return <Redirect to="/" />;

  return (
    <div className="profile-dropdown-container">
      <div
        onClick={openMenu}
        className="profile-button__img-container"
      >
        <img
          className="profile-button__img"
          src={user?.profilePic}
          alt=""
        ></img>
      </div>
      <ul
        className={ulClassName}
        ref={ulRef}
      >
        <li className="profile-dropdown__username">{user?.username}</li>
        <li className="profile-dropdown__email">{user?.email}</li>
        <li
          className="profile-dropdown__logout-btn"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default ProfileButton;
