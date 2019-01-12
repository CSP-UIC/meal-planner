import React from 'react';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';

import { withFirebase } from '../Firebase';
import { withUser } from '../Session';

const BasicState = {
  f_name: '',
  l_name: '',
  email: '',
  editing: false
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...BasicState };
  }

  render() {
    const { firebase, authUser } = this.props;
    const { f_name, l_name, email, editing } = this.state;

    return (
      <div>
        {authUser &&
          firebase.user(authUser.uid).on('value', snapshot => {
            const user = snapshot.val();

            if (
              user.f_name !== f_name ||
              user.email !== email ||
              user.l_name !== l_name
            )
              this.setState({
                f_name: user.f_name,
                l_name: user.l_name,
                email: user.email
              });
          })}

        {f_name + ' ' + l_name}
        <br />
        {email}
      </div>
    );
  }
}
export default compose(
  withFirebase,
  withUser,
  withSnackbar
)(Profile);
