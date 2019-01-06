import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUpPage</h1>
    <SignUpForm />
  </div>
);

const BasicState = {
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

  onSubmit = event => {};

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { email, password, cp_password, error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div>Hello</div>
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;
export { SignUpForm, SignUpLink };
