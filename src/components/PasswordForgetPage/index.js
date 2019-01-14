import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

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
  email: '',
  error: ''
};

class PasswordForgetPage extends React.Component {
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
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.props.enqueueSnackbar('Email sent!', {
          variant: 'success'
        });
        this.setState({ ...BasicState });
      })
      .catch(error => {
        this.setState({ error });
        this.props.enqueueSnackbar(error.message, { variant: 'warning' });
      });

    event.preventDefault();
    // if (!passwordMatch) {
    //   this.props.enqueueSnackbar('Passwords do not match', {
    //     variant: 'warning'
    //   });
    //   return;
    // }

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
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="email"
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Submit
          </Button>
        </form>
        {/* </Paper> */}
      </main>
    );
  }
}

PasswordForgetPage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const PasswordForgetLink = () => (
  <p>
    Forgot password? <Link to={ROUTES.PASSWORD_FORGET}>Click</Link> here
  </p>
);

export { PasswordForgetLink };

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles),
  withFirebase
)(PasswordForgetPage);
