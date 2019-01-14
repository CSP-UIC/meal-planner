import React from 'react';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import { Paper } from '@material-ui/core';

const BasicState = {
  f_name: '',
  l_name: '',
  email: '',
  open: false
};

const styles = theme => ({
  main: {
    marginTop: theme.spacing.unit * 4,
    textAlign: 'center'
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...BasicState };
  }

  componentDidMount() {
    this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
      const user = snapshot.val();

      this.setState({
        f_name: user.f_name,
        l_name: user.l_name,
        email: user.email,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.authUser.uid).off();
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { f_name, l_name, email } = this.state;

    return (
      <div className={this.props.classes.main}>
        <Typography variant="h3">{f_name + ' ' + l_name}</Typography>

        <Typography variant="h6" gutterBottom>
          {email}
        </Typography>

        {/* <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}>
          <Paper className={this.props.classes.main}>
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Paper>
        </Modal> */}
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default compose(
  withFirebase,
  withAuthorization(condition),
  withSnackbar,
  withStyles(styles)
)(Profile);
