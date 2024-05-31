import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Metronome from './Metronome/Metronome';
import SessionTimer from './SessionTimer/SessionTimer';
import Sidebar from '../UserDashboard/Sidebar/Sidebar';
import Header from '../Header/Header';
import useCloseSideBar from '../../custom-hooks/useCloseSideBar';
import './PracticeHub.css';

const PracticeHub = () => {
  const user = useSelector(state => state.session.user);
  const [showSideBar, setShowSidebar] = useState();
  const sidebarRef = useRef();

  useCloseSideBar(sidebarRef, showSideBar, setShowSidebar);

  return (
    <>
      <Header
        showSideBar={showSideBar}
        setShowSidebar={setShowSidebar}
        user={user}
      />
      <Sidebar
        sidebarRef={sidebarRef}
        showSideBar={showSideBar}
        user={user}
        isPracticeHub={true}
      />
      <section className="practice-hub">
        <SessionTimer />
        <Metronome />
      </section>
    </>
  );
};
export default PracticeHub;
