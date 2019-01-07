import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const SignUpPage = () => (
  <div>
    <h1>SignUpPage</h1>
    <SignUpForm />
  </div>
);

const BasicState = {
  name: '',
  email: '',
  password: '',
  cp_password: '',
  error: ''
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...BasicState };
  }

  handleSubmit = event => {};

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { email, password, cp_password, error, name } = this.state;
    const { classes } = this.props;

    const isInvalid =
      password !== cp_password ||
      password === '' ||
      email === '' ||
      name === '';

    console.log(classes);
    return (
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Full Name"
          value={this.state.name}
          name="name"
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Email"
          value={this.state.email}
          name="email"
          type="email"
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Password"
          value={this.state.password}
          name="password"
          type="password"
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Confirm Password"
          value={this.state.cp_password}
          name="cp_password"
          type="password"
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" disabled={isInvalid} color="default">
          Submit
          {/* <CloudUploadIcon className={classes.rightIcon} /> */}
        </Button>
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default SignUpPage;

export { SignUpForm, SignUpLink };
