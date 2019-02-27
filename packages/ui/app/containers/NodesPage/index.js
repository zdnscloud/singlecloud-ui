/**
 *
 * NodesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Cloud';
import AddIcon from '@material-ui/icons/Add';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles';
import NodesList from './nodes';

/* eslint-disable react/prefer-stateless-function */
export class NodesPage extends React.PureComponent {
  componentWillMount() {
    this.props.initAction(this.props.match.params);
  }

  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar disableGutters className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="single cloud"
              className={classes.menuButton}
            >
              <CloudIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <FormattedMessage {...messages.header} />
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Nodes
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <NodesList />
          </Typography>
        </div>
      </div>
    );
  }
}

NodesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...actions,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'nodesPage', reducer });
const withSaga = injectSaga({ key: 'nodesPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(NodesPage);
