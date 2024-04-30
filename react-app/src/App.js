import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupPage from './components/AuthPages/SignupPage';
import LoginPage from './components/AuthPages/LoginPage';
import { authenticate } from './store/session';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard/UserDashboard';
import PracticeHub from './components/PracticeHub/PracticeHub';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route
            exact
            path="/"
          >
            <LandingPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/users/:userId/dashboard">
            <UserDashboard />
          </Route>
          <Route path="/users/:userId/practice-hub">
            <PracticeHub />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
