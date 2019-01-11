import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import * as ROUTES from '../../constants/routes';

// Login and SignUp
class NavigationNoAuth extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button color="inherit" component={Link} to={ROUTES.SIGN_IN}>
          Login
        </Button>
      </React.Fragment>
    );
  }
}

export default NavigationNoAuth;
