import { useEffect } from 'react';

const useCloseSideBar = (sidebarRef, showSideBar, setShowSidebar) => {
  useEffect(() => {
    if (!showSideBar) return;

    const closeMenu = e => {
      if (!sidebarRef.current?.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showSideBar]);
};

export default useCloseSideBar;
