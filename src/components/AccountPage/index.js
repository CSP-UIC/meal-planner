import React from 'react';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Profile from './profile';
import PasswordChange from './passwordChange';
import { withAuthorization } from '../Session';

const styles = theme => ({});

class AccountPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Profile />
        <Divider />
        <PasswordChange />
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;
export default compose(
  withAuthorization(condition),
  withStyles(styles)
)(AccountPage);
