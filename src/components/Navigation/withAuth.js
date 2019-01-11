import React from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { PowerSettingsNew, Portrait } from '@material-ui/icons';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { withAuthentication } from '../Session';

// Includes Profile (SignOut and Acoount) and Dashboard
class NavigationAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignOut = event => {
    event.preventDefault();
    this.handleClose();

    this.props.firebase.doSignOut();
    this.props.enqueueSnackbar('Signed Out Succesfully');
    this.props.history.push(ROUTES.LANDING);
  };

  render() {
    const open = Boolean(this.state.anchorEl);

    return (
      <React.Fragment>
        <Button color="inherit" component={Link} to={ROUTES.DASHBOARD}>
          Dashboard
        </Button>

        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.handleClose}>
          <MenuItem component={Link} to={ROUTES.ACCOUNT}>
            <ListItemIcon>
              <Portrait />
            </ListItemIcon>
            <ListItemText inset primary="Account" />
          </MenuItem>
          <MenuItem onClick={this.handleSignOut}>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText inset primary="Sign Out" />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default compose(
  withAuthentication,
  withFirebase,
  withRouter,
  withSnackbar
)(NavigationAuth);
