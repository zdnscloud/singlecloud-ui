/**
 *
 * NodesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import injectSaga from 'utils/injectSaga';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import styles from './styles';
import NodesTable from './NodesTable';
import NodesPageHelmet from './helmet';

/* eslint-disable react/prefer-stateless-function */
export class NodesPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  componentWillMount() {
    this.props.initAction(this.props.match);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NodesPageHelmet />
        <CssBaseline />
        <Menubar headerText={<FormattedMessage {...messages.header} />} />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <FormattedMessage {...messages.nodes} />
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <NodesTable />
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

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

const withSaga = injectSaga({ key: 'nodesPage', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles)
)(NodesPage);
