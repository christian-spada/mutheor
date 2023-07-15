import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';

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
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
