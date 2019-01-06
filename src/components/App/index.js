import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Navigation from '../Navigation';
import LandingPage from '../LandingPage';
import SignUpPage from '../SignUpPage';
import SignInPage from '../SignInPage';
import PasswordForgetPage from '../PasswordForgetPage';
import DashboardPage from '../DashboardPage';
import AccountPage from '../AccountPage';

import * as ROUTES from '../../constants/routes';
import csp_theme from './theme.js';

const App = () => (
  <MuiThemeProvider theme={csp_theme}>
    <Router>
      <div>
        <Navigation />

        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
