import React from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

// Includes Profile (SignOut and Acoount) and Dashboard
class NavigationAuth extends React.Component {
  render() {
    return (
      <div>
        Auth <br />
      </div>
    );
  }
}

export default compose(withAuthentication)(NavigationAuth);
