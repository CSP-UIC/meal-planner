import React from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class SignOutButton extends React.Component {
  handleSignOut = event => {
    event.preventDefault();

    this.props.firebase.doSignOut();
    this.props.enqueueSnackbar('Signed Out Succesfully');
    this.props.history.push(ROUTES.DASHBOARD);
  };

  render() {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={this.handleSignOut}>
        Log Out
      </Button>
    );
  }
}

export default compose(
  withSnackbar,
  withFirebase,
  withRouter
)(SignOutButton);
