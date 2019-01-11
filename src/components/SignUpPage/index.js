import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
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
  name: '',
  email: '',
  password: '',
  cp_password: '',
  error: ''
};

class SignUpPage extends React.Component {
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

    const { name, email, password, cp_password } = this.state;

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
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          name,
          email
        });
      })
      .then(authUser => {
        this.setState({ ...BasicState });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
        this.props.enqueueSnackbar(error.message, { variant: 'warning' });
      });

    event.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        {/* <Paper className={classes.paper}> */}
        <br />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <Input
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              autoFocus
            />
          </FormControl>

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
            Register
          </Button>
        </form>
        {/* </Paper> */}
      </main>
    );
  }
}

SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export { SignUpLink };

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles),
  withFirebase
)(SignUpPage);

// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { Link } from 'react-router-dom';

// import * as ROUTES from '../../constants/routes';

// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';

// const SignUpPage = () => (
//   <div>
//     <h1>SignUpPage</h1>
//     <SignUpForm />
//   </div>
// );

//

// class SignUpForm extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = { ...BasicState };
//   }

//   handleSubmit = event => {};

//   handleChange = event => {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   };

//   render() {
//     const { email, password, cp_password, error, name } = this.state;
//     const { classes } = this.props;

//     const isInvalid =
//       password !== cp_password ||
//       password === '' ||
//       email === '' ||
//       name === '';

//     console.log(classes);
//     return (
//       <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
//         <TextField
//           id="outlined-name"
//           label="Full Name"
//           value={this.state.name}
//           name="name"
//           onChange={this.handleChange}
//           margin="normal"
//           variant="outlined"
//         />
//         <TextField
//           id="outlined-name"
//           label="Email"
//           value={this.state.email}
//           name="email"
//           type="email"
//           onChange={this.handleChange}
//           margin="normal"
//           variant="outlined"
//         />
//         <TextField
//           id="outlined-name"
//           label="Password"
//           value={this.state.password}
//           name="password"
//           type="password"
//           onChange={this.handleChange}
//           margin="normal"
//           variant="outlined"
//         />
//         <TextField
//           id="outlined-name"
//           label="Confirm Password"
//           value={this.state.cp_password}
//           name="cp_password"
//           type="password"
//           onChange={this.handleChange}
//           margin="normal"
//           variant="outlined"
//         />
//         <Button variant="contained" disabled={isInvalid} color="default">
//           Submit
//           {/* <CloudUploadIcon className={classes.rightIcon} /> */}
//         </Button>
//       </form>
//     );
//   }
// }

// SignUpForm.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default SignUpPage;

// export { SignUpForm, SignUpLink };
