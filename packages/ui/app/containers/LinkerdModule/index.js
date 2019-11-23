import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Helmet from 'components/Helmet/Helmet';

import {
  makeSelectCurrentID as makeSelectCurrentClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
  makeSelectURL,
} from 'ducks/clusters/selectors';
import {
  makeSelectCurrentID as makeSelectCurrentNamespaceID,
} from 'ducks/namespaces/selectors';

import ApiHelpers from './components/util/ApiHelpers.jsx';
import AppContext from './components/util/AppContext.jsx';
import Namespace from './components/Namespace.jsx';
import Navigation from './components/Navigation.jsx';
import NoMatch from './components/NoMatch.jsx';
import ResourceDetail from './components/ResourceDetail.jsx';
import ResourceList from './components/ResourceList.jsx';
import ServiceMesh from './components/ServiceMesh.jsx';
import Tap from './components/Tap.jsx';
import Top from './components/Top.jsx';
import TopRoutes from './components/TopRoutes.jsx';
import { dashboardTheme } from './components/util/theme.js';
import messages from './messages';

class App extends React.Component {
  state = {
    productName: 'Linkerd',
    releaseVersion: '2.6.0',
    uuid: 'Qz194r6a6wSIWpCaohYXI2xv9Jjv8C1z',
    pathPrefix: `/clusters/${this.props.clusterID}/linkerd`,
    api: ApiHelpers(`/apis/zcloud.cn/v1/clusters/${this.props.clusterID}/linkerd`),
    selectedNamespace: this.props.namespaceID,
    updateNamespaceInContext: (name) => {
      this.setState({selectedNamespace: name});
    },
    checkNamespaceMatch(){},
  };

  componentDidMount() {
    this.setup();
  }

  componentDidUpdate(prevProps) {
    this.setup(prevProps);
  }

  setup(prevProps) {
    const { clusterID, namespaceID } = this.props;
    const pathPrefix = `/clusters/${clusterID}/linkerd`;
    if (prevProps) {
      if (prevProps.clusterID !== clusterID) {
        this.setState({
          api: ApiHelpers(`/apis/zcloud.cn/v1${pathPrefix}`),
          pathPrefix,
        });
      }
      if (prevProps.namespaceID !== namespaceID) {
        this.setState({
          selectedNamespace: namespaceID,
        });
      }
    } else {
      this.setState({
        selectedNamespace: namespaceID,
        api: ApiHelpers(`/apis/zcloud.cn/v1${pathPrefix}`),
        pathPrefix,
      });
    }
  }

  render() {
    const { clusterID, namespaceID } = this.props;
    const pathPrefix = `/clusters/${clusterID}/linkerd`;

    return (
      <AppContext.Provider value={this.state}>
        <Helmet title={messages.pageTitle} description={messages.pageDesc} />
        <Switch>
          <Route
            path={`${pathPrefix}/controlplane`}
            render={props => <Navigation {...props} ChildComponent={ServiceMesh} />} />
          <Route
            exact
            path={`${pathPrefix}/namespaces/:namespace`}
            render={props => <Navigation {...props} ChildComponent={Namespace} />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/pods/:pod`}
            render={props => <Navigation {...props} ChildComponent={ResourceDetail} />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/pods`}
            render={props => <Navigation {...props} ChildComponent={ResourceList} resource="pod" />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/daemonsets/:daemonset`}
            render={props => <Navigation {...props} ChildComponent={ResourceDetail} />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/daemonsets`}
            render={props => <Navigation {...props} ChildComponent={ResourceList} resource="daemonset" />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/statefulsets/:statefulset`}
            render={props => <Navigation {...props} ChildComponent={ResourceDetail} />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/statefulsets`}
            render={props => <Navigation {...props} ChildComponent={ResourceList} resource="statefulset" />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/trafficsplits/:trafficsplit`}
            render={props => <Navigation {...props} ChildComponent={ResourceDetail} />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/trafficsplits`}
            render={props => <Navigation {...props} ChildComponent={ResourceList} resource="trafficsplit" />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/jobs/:job`}
            render={props => <Navigation {...props} ChildComponent={ResourceDetail} />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/jobs`}
            render={props => <Navigation {...props} ChildComponent={ResourceList} resource="job" />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/deployments/:deployment`}
            render={props => <Navigation {...props} ChildComponent={ResourceDetail} />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/deployments`}
            render={props => <Navigation {...props} ChildComponent={ResourceList} resource="deployment" />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/replicationcontrollers/:replicationcontroller`}
            render={props => <Navigation {...props} ChildComponent={ResourceDetail} />} />
          <Route
            path={`${pathPrefix}/namespaces/:namespace/replicationcontrollers`}
            render={props => <Navigation {...props} ChildComponent={ResourceList} resource="replicationcontroller" />} />
          <Route
            path={`${pathPrefix}/tap`}
            render={props => <Navigation {...props} ChildComponent={Tap} />} />
          <Route
            path={`${pathPrefix}/top`}
            render={props => <Navigation {...props} ChildComponent={Top} />} />
          <Route
            path={`${pathPrefix}/routes`}
            render={props => <Navigation {...props} ChildComponent={TopRoutes} />} />
          <Route
            path={`${pathPrefix}/namespaces`}
            render={props => <Navigation {...props} ChildComponent={ResourceList} resource="namespace" />} />
          <Redirect to={`/clusters/${clusterID}/show`} />
        </Switch>
      </AppContext.Provider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  cluster: makeSelectCurrentCluster(),
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {},
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(App);
