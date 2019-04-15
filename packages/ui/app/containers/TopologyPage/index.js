/**
 *
 * ConfigMapsPage
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

import * as actions from 'ducks/serviceLinks/actions';

import { makeSelectClusterID, makeSelectNamespaceID } from '../App/selectors';
import { makeSelectCurrentNamespace } from '../NamespacesPage/selectors';
import messages from './messages';
import TopologyPageHelmet from './helmet';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class TopologyPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.load();
  }

  load() {
    const {
      clusterID,
      namespaceID,
      namespace,
      loadOuterServices,
      loadInnerServices,
    } = this.props;
    const ourl = namespace
      .getIn(['links', 'outerservices'])
      .replace(/^\w+:\/\/([^/]+)/, '');
    const iurl = namespace
      .getIn(['links', 'innerservices'])
      .replace(/^\w+:\/\/([^/]+)/, '');
    loadOuterServices(ourl, clusterID, namespaceID);
    loadInnerServices(iurl, clusterID, namespaceID);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TopologyPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Typography variant="h4" gutterBottom component="h2">
            <FormattedMessage {...messages.topology} />
          </Typography>
          <Typography component="div">
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  namespace: makeSelectCurrentNamespace(),
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

export default compose(
  withConnect,
  withStyles(styles)
)(TopologyPage);
