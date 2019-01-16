import React from 'react';
import { compose } from 'recompose';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const moment = require('moment');

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  }
});

class DayCard extends React.Component {
  render() {
    const { date, info, classes } = this.props;

    return (
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <Typography variant="h6">{moment(date).format('dddd')}</Typography>
          <Typography variant="subtitle5">
            {moment(date).format('MMMM Do, Y')}
          </Typography>
        </Paper>
      </Grid>
    );
  }
}

export default compose(withStyles(styles))(DayCard);
