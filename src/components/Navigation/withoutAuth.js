import React from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from '../../constants/routes';

// Login and SignUp
class NavigationNoAuth extends React.Component {
  render() {
    return (
      <div>
        No Auth <br />
      </div>
    );
  }
}

export default NavigationNoAuth;
