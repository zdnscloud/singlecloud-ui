/**
 *
 * DeploymentsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import injectSaga from 'utils/injectSaga';
import makeSelectDeploymentsPage from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import DeploymentsPageHelmet from './helmet';
import styles from './styles';
import DeploymentsTable from './DeploymentsTable';

/* eslint-disable react/prefer-stateless-function */
export class DeploymentsPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {
    this.props.initAction(this.props.match);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DeploymentsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <FormattedMessage {...messages.deployments} />
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <div>
              <Link to={`${this.props.location.pathname}/create`}>
                <Fab
                  color="primary"
                  aria-label="create deployment"
                  className={classes.menuButton}
                >
                  <AddIcon />
                </Fab>
              </Link>
            </div>
          </Typography>
          <Typography component="div">
            <DeploymentsTable location={this.props.location} />
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  deploymentsPage: makeSelectDeploymentsPage(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withSaga = injectSaga({ key: 'deploymentsPage', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles)
)(DeploymentsPage);
