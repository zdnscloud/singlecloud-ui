/**
 *
 * PodsPage
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
import makeSelectPodsPage from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import PodsPageHelmet from './helmet';
import styles from './styles';
import PodsTable from './PodsTable';
import LogViewDialog from './LogViewDialog';

/* eslint-disable react/prefer-stateless-function */
export class PodsPage extends React.PureComponent {
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
        <PodsPageHelmet />
        <CssBaseline />
        <Menubar headerContent={<FormattedMessage {...messages.header} />} />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <FormattedMessage {...messages.pods} />
          </Typography>
          <Typography component="div">
            <LogViewDialog />
            <PodsTable />
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  podsPage: makeSelectPodsPage(),
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

const withSaga = injectSaga({ key: 'podsPage', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles)
)(PodsPage);
