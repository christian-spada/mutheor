import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton/ProfileButton';
import './UserDashboard.css';
import { useEffect, useRef, useState } from 'react';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import PracticeSessionCard from './PracticeSessionCard/PracticeSessionCard';
import InstrumentCard from './InstrumentCard/InstrumentCard';
import GoalCard from './GoalCard/GoalCard';
import './UserDashboard.css';
import { logger } from '../../utils/helpers';
import { thunkGetAllPracticeSessions } from '../../store/practiceSessions';
import { thunkGetAllInstruments } from '../../store/instruments';
import { thunkGetAllGoals } from '../../store/goals';

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

  const handlePracticeSessionClick = async e => {
    setContentView('Practice Sessions');

    dispatch(thunkGetAllPracticeSessions(user.id));
  };
  const handleInstrumentClick = async e => {
    setContentView('Instruments');

    dispatch(thunkGetAllInstruments(user.id));
  };
  const handleGoalClick = async e => {
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
            <button
              onClick={handleInstrumentClick}
              className={contentView === 'Instruments' ? 'active' : ''}
            >
              Instruments
            </button>
            <button
              onClick={handlePracticeSessionClick}
              className={contentView === 'Practice Sessions' ? 'active' : ''}
            >
              Practice Sessions
            </button>
            <button
              onClick={handleGoalClick}
              className={contentView === 'Goals' ? 'active' : ''}
            >
              Goals
            </button>
          </div>
        </section>

        {/* ===== CONTENT SECTION ==== */}
        <section className="user-dashboard__content-section">
          <div className="user-dashboard__content-container">
            {contentView === 'Practice Sessions' &&
              practiceSessions.map(session => (
                <PracticeSessionCard key={session.id} session={session} />
              ))}
            {contentView === 'Instruments' &&
              instruments.map(instrument => (
                <InstrumentCard key={instrument.id} instrument={instrument} />
              ))}
            {contentView === 'Goals' &&
              goals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
          </div>
        </section>
      </main>
    </>
  );
};
export default UserDashboard;
