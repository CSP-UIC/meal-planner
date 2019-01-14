import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { withFirebase } from '../Firebase';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const BasicState = {
  password: '',
  cp_password: '',
  error: ''
};

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...BasicState };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { password, cp_password } = this.state;

    const passwordMatch = cp_password === password;
    // const emailValid = /^\w+([\.-]?\w+)*\w@+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    //   email
    // );

    if (!passwordMatch) {
      this.props.enqueueSnackbar('Passwords do not match', {
        variant: 'warning'
      });
      return;
    }

    this.props.firebase
      .doPasswordUpdate(password)
      .then(() => {
        this.setState({ ...BasicState });
        this.props.enqueueSnackbar('Password has been changed', {
          variant: 'success'
        });
      })
      .catch(error => {
        this.setState({ error });
        this.props.enqueueSnackbar(error.message, { variant: 'warning' });
      });

    // this.props.firebase
    //   .doCreateUserWithEmailAndPassword(email, password)
    //   .then(authUser => {
    //     // Create a user in your Firebase realtime database
    //     return this.props.firebase.user(authUser.user.uid).set({
    //       f_name,
    //       l_name,
    //       email
    //     });
    //   })
    //   .then(authUser => {
    //     this.setState({ ...BasicState });
    //     this.props.history.push(ROUTES.DASHBOARD);
    //   })
    //   .catch(error => {
    //     this.setState({ error });
    //     this.props.enqueueSnackbar(error.message, { variant: 'warning' });
    //   });
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        {/* <Paper className={classes.paper}> */}
        <br />
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="cp_password">Confirm Password</InputLabel>
            <Input
              name="cp_password"
              type="password"
              id="cp_password"
              value={this.state.cp_password}
              onChange={this.handleChange}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Change
          </Button>
        </form>
        {/* </Paper> */}
      </main>
    );
  }
}

PasswordChange.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles),
  withFirebase
)(PasswordChange);
