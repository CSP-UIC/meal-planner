import React from 'react';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';

import Profile from './profile';
import PasswordChange from './passwordChange';

const styles = theme => ({});

class AccountPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Profile />
        <PasswordChange />
      </React.Fragment>
    );
  }
}

export default compose(withStyles(styles))(AccountPage);
