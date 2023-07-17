import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import ProfileButton from '../ProfileButton/ProfileButton';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import PracticeSessionCard from './PracticeSessions/PracticeSessionCard/PracticeSessionCard';
import CreatePracticeSessionModal from './PracticeSessions/CreatePracticeSessionModal/CreatePracticeSessionModal';
import InstrumentCard from './Instruments/InstrumentCard/InstrumentCard';
import CreateInstrumentModal from './Instruments/CreateInstrumentModal/CreateInstrumentModal';
import GoalCard from './Goals/GoalCard/GoalCard';
import CreateGoalModal from './Goals/CreateGoalModal/CreateGoalModal';
import './UserDashboard.css';

import { thunkGetAllPracticeSessions } from '../../store/practiceSessions';
import { thunkGetAllInstruments } from '../../store/instruments';
import { thunkGetAllGoals } from '../../store/goals';

import OpenModalButton from '../OpenModalButton';
import { logger } from '../../utils/helpers';
import './UserDashboard.css';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const practiceSessions = useSelector(state =>
    Object.values(state.practiceSession.allPracticeSessions)
  );
  const instruments = useSelector(state => Object.values(state.instrument.allInstruments));
  const goals = useSelector(state => Object.values(state.goal.allGoals));
  const [showSideBar, setShowSidebar] = useState(false);
  const [contentView, setContentView] = useState('Practice Sessions');
  const sidebar = useRef();

  const handlePracticeSessionSelection = async e => {
    setContentView('Practice Sessions');

    dispatch(thunkGetAllPracticeSessions(user.id));
  };
  const handleInstrumentSelection = async e => {
    setContentView('Instruments');

    dispatch(thunkGetAllInstruments(user.id));
  };
  const handleGoalSelection = async e => {
    setContentView('Goals');

    dispatch(thunkGetAllGoals(user.id));
  };

  useEffect(() => {
    if (!showSideBar) return;

    const closeMenu = e => {
      if (!sidebar.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showSideBar]);

  return (
    <>
      {/* ===== HEADER ==== */}
      <header className="user-dashboard__header">
        <HamburgerMenu showSideBar={showSideBar} setShowSidebar={setShowSidebar} />
        <div className="user-dashboard__profile-container">
          <ProfileButton user={user} />
        </div>
      </header>

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`user-dashboard__sidebar ${showSideBar ? 'show' : ''}`}
        ref={sidebar}
      ></aside>
      {showSideBar && <div className="overlay"></div>}

      {/* ===== MAIN ==== */}
      <main className="user-dashboard__main-content">
        <section className="user-dashboard__user-info-section">
          <UserInfoCard user={user} />
        </section>

        {/* ===== SELECTION SECTION ==== */}
        <section className="user-dashboard__view-selection-section">
          <div className="user-dashboard__view-selection">
            <div>
              <button
                onClick={handleInstrumentSelection}
                className={contentView === 'Instruments' ? 'active' : ''}
              >
                Instruments
              </button>
              {contentView === 'Instruments' && (
                <OpenModalButton
                  modalComponent={<CreateInstrumentModal user={user} />}
                  icon={<i className="fa-solid fa-square-plus"></i>}
                />
              )}
            </div>
            <div>
              <button
                onClick={handlePracticeSessionSelection}
                className={contentView === 'Practice Sessions' ? 'active' : ''}
              >
                Practice Sessions
              </button>
              {contentView === 'Practice Sessions' && (
                <OpenModalButton
                  modalComponent={<CreatePracticeSessionModal user={user} />}
                  icon={<i className="fa-solid fa-square-plus"></i>}
                />
              )}
            </div>
            <div>
              <button
                onClick={handleGoalSelection}
                className={contentView === 'Goals' ? 'active' : ''}
              >
                Goals
              </button>
              {contentView === 'Goals' && (
                <OpenModalButton
                  modalComponent={<CreateGoalModal user={user} />}
                  icon={<i className="fa-solid fa-square-plus"></i>}
                />
              )}
            </div>
          </div>
        </section>

        {/* ===== CONTENT SECTION ==== */}
        <section className="user-dashboard__content-section">
          <div className="user-dashboard__content-container">
            {contentView === 'Practice Sessions' &&
              practiceSessions.map(session => (
                <PracticeSessionCard key={session.id} user={user} session={session} />
              ))}
            {contentView === 'Instruments' &&
              instruments.map(instrument => (
                <InstrumentCard key={instrument.id} user={user} instrument={instrument} />
              ))}
            {contentView === 'Goals' &&
              goals.map(goal => <GoalCard key={goal.id} user={user} goal={goal} />)}
          </div>
        </section>
      </main>
    </>
  );
};
export default UserDashboard;
