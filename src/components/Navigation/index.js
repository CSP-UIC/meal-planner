import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import * as ROUTES from '../../constants/routes';
import { withUser } from '../Session';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/icons/Menu';
import Menu from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import SignOutButton from '../SignOutButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import NavigationAuth from './withAuth';
import NavigationNoAuth from './withoutAuth';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navigation extends React.Component {
  render() {
    const { classes, authUser } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Meal It Up
          </Typography>

          {/* <Button component={Link} color="inherit" to={ROUTES.SIGN_IN}>
            Login
          </Button>

          <Hidden xsDown>
            <Button color="inherit" component={Link} to={ROUTES.SIGN_UP}>
              Get Started
            </Button>
          </Hidden> */}

          {authUser ? <NavigationAuth /> : <NavigationNoAuth />}
        </Toolbar>
      </AppBar>
    );
  }
}

// const Navigation = () => (
//   <div>
//     <ul>
//       <li>
//         <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.LANDING}>Landing</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.ACCOUNT}>Account</Link>
//       </li>
//     </ul>
//   </div>
// );

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withUser
)(Navigation);

// export default Navigation;
