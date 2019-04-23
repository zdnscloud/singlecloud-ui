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
import Paper from '@material-ui/core/Paper';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import * as actions from 'ducks/serviceLinks/actions';

import { makeSelectClusterID, makeSelectNamespaceID } from '../App/selectors';
import { makeSelectCurrentNamespace } from '../NamespacesPage/selectors';
import messages from './messages';
import TopologyPageHelmet from './helmet';
import styles from './styles';
import Charts from './Charts';

/* eslint-disable react/prefer-stateless-function */
export class TopologyPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    const {
      clusterID: prevClusterID,
      namespaceID: prevNamespaceID,
      namespace: prevNamespace,
    } = prevProps;
    const { clusterID, namespaceID, namespace } = this.props;
    if (
      clusterID !== prevClusterID ||
      namespaceID !== prevNamespaceID ||
      namespace !== prevNamespace
    ) {
      this.load();
    }
  }

  load() {
    const {
      clusterID,
      namespaceID,
      namespace,
      loadOuterServices,
      loadInnerServices,
    } = this.props;
    if (namespace && namespace.size > 0) {
      const ourl = namespace
        .getIn(['links', 'outerservices'])
        .replace(/^\w+:\/\/([^/]+)/, '');
      const iurl = namespace
        .getIn(['links', 'innerservices'])
        .replace(/^\w+:\/\/([^/]+)/, '');
      loadOuterServices(ourl, clusterID, namespaceID);
      loadInnerServices(iurl, clusterID, namespaceID);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TopologyPageHelmet />
        <CssBaseline />
        <Paper className={classes.content}>
          <Charts />
        </Paper>
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
