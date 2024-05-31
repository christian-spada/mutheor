import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import Header from '../Header/Header';
import Sidebar from './Sidebar/Sidebar';
import useCloseSideBar from '../../custom-hooks/useCloseSideBar';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import PracticeSessionCard from './PracticeSessions/PracticeSessionCard/PracticeSessionCard';
import CreatePracticeSessionModal from './PracticeSessions/CreatePracticeSessionModal/CreatePracticeSessionModal';
import InstrumentCard from './Instruments/InstrumentCard/InstrumentCard';
import CreateInstrumentModal from './Instruments/CreateInstrumentModal/CreateInstrumentModal';
import GoalCard from './Goals/GoalCard/GoalCard';
import CreateGoalModal from './Goals/CreateGoalModal/CreateGoalModal';
import OpenModalButton from '../OpenModalButton';

import { thunkGetAllPracticeSessions } from '../../store/practiceSessions';
import { thunkGetAllInstruments } from '../../store/instruments';
import { thunkGetAllGoals } from '../../store/goals';

import './UserDashboard.css';
import { Redirect } from 'react-router-dom';

const UserDashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const practiceSessions = useSelector(state =>
    Object.values(state.practiceSession.allPracticeSessions)
  );
  practiceSessions.sort((a, b) => new Date(a.date) - new Date(b.date));

  const instruments = useSelector(state => Object.values(state.instrument.allInstruments));

  const goals = useSelector(state => Object.values(state.goal.allGoals));
  goals.sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate));

  const [showSideBar, setShowSidebar] = useState(false);
  const sidebarRef = useRef();
  const cardContainer = useRef();
  const [contentView, setContentView] = useState('Instruments');

  const handleViewChange = selection => {
    if (selection === 'Practice Sessions') {
      setContentView('Practice Sessions');
      if (!practiceSessions.length) {
        dispatch(thunkGetAllPracticeSessions(user.id));
      }
      return;
    }
    if (selection === 'Instruments') {
      setContentView('Instruments');
      if (!instruments.length) {
        dispatch(thunkGetAllInstruments(user.id));
      }
      return;
    }
    if (selection === 'Goals') {
      setContentView('Goals');
      if (!goals.length) {
        dispatch(thunkGetAllGoals(user.id));
      }
      return;
    }
  };

  useCloseSideBar(sidebarRef, showSideBar, setShowSidebar);

  useEffect(() => {
    if (user && contentView === 'Practice Sessions')
      dispatch(thunkGetAllPracticeSessions(user.id));
    if (user && contentView === 'Instruments') dispatch(thunkGetAllInstruments(user.id));
    if (user && contentView === 'Goals') dispatch(thunkGetAllGoals(user.id));
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.visible-card');

    const handleCardIntersect = entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    };

    const cardObserver = new IntersectionObserver(handleCardIntersect, {
      root: cardContainer.current,
      rootMargin: '0px',
      threshold: 0.4,
    });

    cards.forEach(card => cardObserver.observe(card));

    return () => cardObserver.disconnect();
  }, [practiceSessions, goals, instruments]);

  if (!user) return <Redirect to="/" />;

  return (
    <div className="user-dashboard-wrapper">
      {/* ===== HEADER ==== */}
      <Header
        showSideBar={showSideBar}
        setShowSidebar={setShowSidebar}
        user={user}
      />

      {/* ===== SIDEBAR ===== */}
      <Sidebar
        sidebarRef={sidebarRef}
        showSideBar={showSideBar}
        user={user}
        isDashboard={true}
      />

      {/* ===== MAIN ==== */}
      <main className="user-dashboard__main-content">
        <div className="svg-container">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="hsla(202, 100%, 86%, .6)"
              d="M34.4,-56.3C43.3,-54.4,48.4,-42.7,57.6,-31.6C66.7,-20.6,79.7,-10.3,84.2,2.6C88.6,15.4,84.4,30.9,76.4,43.9C68.5,56.8,56.7,67.4,43.4,67.9C30,68.4,15,58.8,4,51.8C-6.9,44.8,-13.8,40.4,-25.4,38.8C-36.9,37.3,-53,38.6,-63,32.6C-72.9,26.6,-76.8,13.3,-73.1,2.1C-69.4,-9,-58.2,-18.1,-50,-27.1C-41.8,-36.2,-36.6,-45.3,-28.7,-47.8C-20.9,-50.3,-10.5,-46.3,1.1,-48.3C12.7,-50.3,25.5,-58.2,34.4,-56.3Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="svg-container-2">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="hsla(30, 100%, 50%, .3)"
              d="M48.7,-69.7C60,-58.8,63.9,-40.4,64.3,-24.4C64.6,-8.4,61.2,5.2,57.8,19.8C54.4,34.3,51,49.9,41.3,63.3C31.7,76.8,15.8,88.2,3.9,82.8C-8,77.5,-16.1,55.3,-21.9,40.6C-27.7,25.9,-31.2,18.6,-39.2,9.2C-47.2,-0.3,-59.7,-11.9,-61.8,-24.6C-63.9,-37.3,-55.6,-51.2,-43.6,-61.9C-31.5,-72.6,-15.8,-80,1.5,-82C18.7,-84,37.4,-80.6,48.7,-69.7Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <section className="user-dashboard__user-info-section">
          <UserInfoCard user={user} />
        </section>

        {/* ===== SELECTION SECTION ==== */}
        <section className="user-dashboard__view-selection-section">
          <div className="user-dashboard__view-selection">
            <div className="user-dashboard__view-selection-btn-container">
              <button
                onClick={() => handleViewChange('Instruments')}
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
            <div className="user-dashboard__view-selection-btn-container">
              <button
                onClick={() => handleViewChange('Practice Sessions')}
                className={contentView === 'Practice Sessions' ? 'active' : ''}
              >
                Practice Sessions
              </button>
              {contentView === 'Practice Sessions' && instruments.length > 0 && (
                <OpenModalButton
                  modalComponent={<CreatePracticeSessionModal user={user} />}
                  icon={<i className="fa-solid fa-square-plus"></i>}
                />
              )}
              {contentView === 'Practice Sessions' && !instruments.length && (
                <span className="need-instruments-reminder">
                  Add instruments to create new practice sessions
                </span>
              )}
            </div>
            <div className="user-dashboard__view-selection-btn-container">
              <button
                onClick={() => handleViewChange('Goals')}
                className={contentView === 'Goals' ? 'active' : ''}
              >
                Goals
              </button>
              {contentView === 'Goals' && instruments.length > 0 && (
                <OpenModalButton
                  modalComponent={<CreateGoalModal user={user} />}
                  icon={<i className="fa-solid fa-square-plus"></i>}
                />
              )}
              {contentView === 'Goals' && !instruments.length && (
                <span className="need-instruments-reminder">
                  Add instruments to create new goals
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ===== CONTENT SECTION ==== */}
        <section
          className="user-dashboard__content-section"
          ref={cardContainer}
        >
          <div className="user-dashboard__content-container">
            {contentView === 'Practice Sessions' &&
              practiceSessions.map(session => (
                <div
                  className="visible-card"
                  key={session.id}
                >
                  <PracticeSessionCard
                    user={user}
                    session={session}
                  />
                </div>
              ))}
            {contentView === 'Instruments' &&
              instruments.map(instrument => (
                <div
                  className="visible-card"
                  key={instrument.id}
                >
                  <InstrumentCard
                    user={user}
                    instrument={instrument}
                  />
                </div>
              ))}
            {contentView === 'Goals' &&
              goals.map(goal => (
                <div
                  className="visible-card"
                  key={goal.id}
                >
                  <GoalCard
                    user={user}
                    goal={goal}
                  />
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default UserDashboard;
