import React from 'react';
import './App.css';

// Routes
import { Route, Switch, Redirect } from 'react-router-dom';
import SignInPage from './public/pages/SignInPage';
import SignUpPage from './public/pages/SignUpPage';
import ApplicationPage from './application/ApplicationPage';
import SignOutPage from './application/components/pages/SignOutPage';
import VerifyEmailPage from './application/components/pages/VerifyEmailPage';

// notifications
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// cookies
import {useCookies} from 'react-cookie';
import NotFoundPage from './public/pages/NotFoundPage';
import LandingPage from './public/pages/LandinPage';
import AuthUserContext from './modules/session/auth/AuthUserContext';


function App() {
  const [cookies, setCookie] = useCookies(['authToken']);
  const authToken = cookies.authToken || null;

  const handleUpdateToken = (token) => {
    setCookie('authToken', token);
  }

  return (
    <div>
      <AuthUserContext.Provider value={authToken}>
          <NotificationContainer />
          <Switch>
            <Route path="/app" render={(props) => <ApplicationPage handleUpdateToken={handleUpdateToken} {...props} authToken={authToken} /> } />
            <Route path="/signin" render={(props) => <SignInPage authToken={authToken} {...props} handleUpdateToken={handleUpdateToken} /> } />
            <Route path="/signup" render={(props) => <SignUpPage authToken={authToken} {...props} handleUpdateToken={handleUpdateToken} /> } />
            <Route path="/signout" render={(props) => <SignOutPage authToken={authToken} {...props} /> } />
            <Route
              exact
              path="/verify"
              render={(props) => <VerifyEmailPage authToken={authToken} {...props} handleUpdateToken={handleUpdateToken} /> } 
            />
            <Route path="/404" component={NotFoundPage} />
            <Route exact path="/" component={LandingPage} />
            <Route path="*" render={()=><Redirect to="/404"/>} />
          </Switch>
      </AuthUserContext.Provider>
    </div>
  );
}

export default App;
