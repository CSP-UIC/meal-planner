import React from 'react';
import { compose } from 'recompose';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import Navigation from '../Navigation';
import LandingPage from '../LandingPage';
import SignUpPage from '../SignUpPage';
import SignInPage from '../SignInPage';
import PasswordForgetPage from '../PasswordForgetPage';
import DashboardPage from '../DashboardPage';
import AccountPage from '../AccountPage';

import * as ROUTES from '../../constants/routes';
import csp_theme from './theme.js';
import { withAuthentication } from '../Session';

const App = () => (
  <MuiThemeProvider theme={csp_theme}>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <Navigation />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      </SnackbarProvider>
    </Router>
  </MuiThemeProvider>
);

export default compose(withAuthentication)(App);
