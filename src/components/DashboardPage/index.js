// import React from 'react';

// const DashboardPage = () => (
//   <div>
//     <h1>DashboardPage</h1>
//   </div>
// );

// export default DashboardPage;

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import ReactJson from 'react-json-view';

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

const moment = require('moment');
const _ = require('lodash');

const styles = theme => ({
  card: {
    maxWidth: 345
  },

  media: {
    height: 140
  }
});

const format = 'MMDDYYYY';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meals: {}
    };
  }

  componentDidMount() {
    this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
      var meals = snapshot.val().meals;

      const tomFormat = moment()
        .add(1, 'day')
        .format(format);

      if (moment().day() === 0 && !meals[tomFormat]) {
        meals = _.pick(meals, [moment().format(format)]);
      } else if (!_.has(meals, moment().format(format))) {
        meals = {};

        [0, 1, 2, 3, 4, 5, 6, 7].forEach(numDays => {
          _.assign(meals, {
            [moment()
              .startOf('week')
              .add(numDays, 'days')
              .format('MMDDYYYY')]: {
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
        meals
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.authUser.uid).off();
  }

  render() {
    const { classes } = this.props;

    return (
      <center>
        WIP
        <br />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={24}>
          <Grid item xs={3}>
            H
          </Grid>
          <Grid item xs={3}>
            H
          </Grid>
          <Grid item xs={3}>
            H
          </Grid>
          <Grid item xs={3}>
            H
          </Grid>
          <Grid item xs={3}>
            H
          </Grid>
          <Grid item xs={3}>
            H
          </Grid>
          <Grid item xs={3}>
            H
          </Grid>
          <Grid item xs={3}>
            H
          </Grid>
        </Grid>
      </center>
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
