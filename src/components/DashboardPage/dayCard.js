import React from 'react';
import { compose } from 'recompose';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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
          <Button color="secondary" className={classes.button}>
            View
          </Button>
        </Paper>
        <Dialog
          fullScreen
          name="editOpen"
          open={this.state.editOpen}
          onClose={this.handleClose}>
          {moment(date).format('MMMM Do, Y')}
          <IconButton
            aria-label="Delete"
            className={classes.margin}
            onClick={this.handleClose}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Dialog>
      </Grid>
    );
  }
}

export default compose(withStyles(styles))(DayCard);
