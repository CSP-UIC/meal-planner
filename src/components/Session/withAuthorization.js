import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          if (!!!authUser) {
            this.props.enqueueSnackbar('Login required to access page', {
              variant: 'warning'
            });
            this.props.history.push(ROUTES.SIGN_IN);
          } else {
            this.props.enqueueSnackbar('Already logged in', {
              variant: 'info'
            });
            this.props.history.push(ROUTES.DASHBOARD);
          }
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? (
              <Component {...this.props} authUser={authUser} />
            ) : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
    withSnackbar
  )(WithAuthorization);
};

export default withAuthorization;
// const condition = authUser => !!authUser;
