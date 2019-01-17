import React from 'react';
import { compose } from 'recompose';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/CloseRounded';
import { withStyles } from '@material-ui/core/styles';

const moment = require('moment');

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },
  button: {
    marginRight: theme.spacing.unit
  },
  closeButton: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit,
    padding: 0
  }
});

class DayCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editOpen: false,
      viewOpen: false
    };
  }

  handleOpen = event => {
    this.setState({
      editOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      editOpen: false
    });
  };

  render() {
    const { date, info, classes } = this.props;

    return (
      <Grid item lg={3} xs={12} md={3} sm={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6">{moment(date).format('dddd')}</Typography>
          <Typography variant="subtitle5">
            {moment(date).format('MMMM Do, Y')}
          </Typography>
          <br /> <br /> <br />
          <Button
            color="primary"
            className={classes.button}
            for="editOpen"
            onClick={this.handleOpen}>
            <b>Edit</b>
          </Button>
          <Button color="info" className={classes.button}>
            <b>View</b>
          </Button>
        </Paper>
        <Dialog
          fullScreen
          name="editOpen"
          open={this.state.editOpen}
          onClose={this.handleClose}>
          {moment(date).format('MMMM Do, Y')}
          <Fab
            variant="contained"
            color="secondary"
            aria-label="Close"
            className={classes.closeButton}
            onClick={this.handleClose}>
            <CloseIcon fontSize="medium" />
          </Fab>
        </Dialog>
      </Grid>
    );
  }
}

export default compose(withStyles(styles))(DayCard);
