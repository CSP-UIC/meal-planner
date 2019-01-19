import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import DayCard from './dayCard';
import { Divider, Typography } from '@material-ui/core';

const moment = require('moment');
const _ = require('lodash');

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

const format = 'YYYYMMDD';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      meals: {}
    };
  }

  componentDidMount() {
    this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
      var meals = snapshot.val().meals;

      const tomFormat = moment()
        .add(1, 'day')
        .format(format);

      if (moment().day() === 0 && !_.has(meals, tomFormat)) {
        meals = _.pick(meals, [moment().format(format)]);

        [1, 2, 3, 4, 5, 6, 7].forEach(numDays => {
          _.assign(meals, {
            [moment()
              .add(numDays, 'days')
              .format(format)]: {
              empty: true,
              breakfast: null,
              lunch: null,
              dinner: null
            }
          });
        });

        this.props.firebase.user(this.props.authUser.uid).set({
          f_name: snapshot.val().f_name,
          l_name: snapshot.val().l_name,
          email: snapshot.val().email,
          meals: meals
        });
      } else if (!_.has(meals, moment().format(format))) {
        meals = {};

        [0, 1, 2, 3, 4, 5, 6, 7].forEach(numDays => {
          _.assign(meals, {
            [moment()
              .startOf('week')
              .add(numDays, 'days')
              .format(format)]: {
              empty: true,
              breakfast: null,
              lunch: null,
              dinner: null
            }
          });
        });

        this.props.firebase.user(this.props.authUser.uid).set({
          f_name: snapshot.val().f_name,
          l_name: snapshot.val().l_name,
          email: snapshot.val().email,
          meals: meals
        });
      }

      this.setState({
        meals,
        name: snapshot.val().f_name + ' ' + snapshot.val().l_name
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.authUser.uid).off();
  }

  render() {
    const { classes } = this.props;
    const { meals, name } = this.state;

    return (
      <main className={classes.main}>
        <Typography variant="h4">{name}</Typography>

        <Divider className={classes.divider} />

        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={24}>
          {Object.keys(meals).map((key, index) => (
            <DayCard date={key} info={meals[key]} key={key} />
          ))}
        </Grid>
      </main>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const condition = authUser => !!authUser;
export default compose(
  withFirebase,
  withAuthorization(condition),
  withStyles(styles)
)(DashboardPage);
