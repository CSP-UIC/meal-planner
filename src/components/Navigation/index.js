import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Meal It Up
            </Typography>

            <Button component={Link} color="inherit" to={ROUTES.SIGN_IN}>
              Login
            </Button>
            <Hidden xsDown>
              <Button color="inherit" component={Link} to={ROUTES.SIGN_UP}>
                Get Started
              </Button>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);

// export default Navigation;
