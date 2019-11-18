import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import ApiHelpers from './components/util/ApiHelpers.jsx';
import AppContext from './components/util/AppContext.jsx';
import Community from './components/Community.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Namespace from './components/Namespace.jsx';
import Navigation from './components/Navigation.jsx';
import NoMatch from './components/NoMatch.jsx';
import ResourceDetail from './components/ResourceDetail.jsx';
import ResourceList from './components/ResourceList.jsx';
import { RouterToUrlQuery } from 'react-url-query';
import ServiceMesh from './components/ServiceMesh.jsx';
import Tap from './components/Tap.jsx';
import Top from './components/Top.jsx';
import TopRoutes from './components/TopRoutes.jsx';
import { dashboardTheme } from './components/util/theme.js';

let appData = {};

let pathPrefix = "/clusters/cluster.local/linkerd";

let selectedNamespace = "default";
let pathArray = window.location.pathname.split("/");

// if the current URL path specifies a namespace, this should become the
// selectedNamespace
if (pathArray[0] === "" && pathArray[1] === "namespaces" && pathArray[2]) {
  selectedNamespace = pathArray[2];
// if the current URL path is a legacy path such as `/daemonsets`, the
// selectedNamespace should be "_all", unless the path is `/namespaces`
} else if (pathArray.length === 2 && pathArray[1] !== "" && pathArray[1] !== "namespaces") {
  selectedNamespace = "_all";
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...appData
    };

    pathPrefix = props.pathPrefix || pathPrefix;

    this.state.api = ApiHelpers(`/apis/zcloud.cn/v1${pathPrefix}`);
    this.state.pathPrefix = pathPrefix;
    this.state.productName = "Linkerd";
    this.state.selectedNamespace = selectedNamespace;

    this.state.updateNamespaceInContext = name => {
      this.setState({selectedNamespace:name});
    };

    this.state.checkNamespaceMatch = path => {
      let pathNamespace = path.split("/")[2];
      if (pathNamespace && pathNamespace !== this.state.selectedNamespace) {
        this.setState({selectedNamespace:pathNamespace});
      }
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <AppHTML pathPrefix={pathPrefix} />
      </AppContext.Provider>
    );
  }
}


function AppHTML({ pathPrefix }) {

  return (
    <React.Fragment>
      <CssBaseline />
        <BrowserRouter>
          <RouterToUrlQuery>
            <Switch>
              <Redirect exact from={`${pathPrefix}/`} to={`${pathPrefix}/namespaces`} />

              <Route
                path={`${pathPrefix}/controlplane`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ServiceMesh} />} />
              <Route
                exact
                path={`${pathPrefix}/namespaces/:namespace`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={Namespace} />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/pods/:pod`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceDetail} />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/pods`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceList} resource="pod" />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/daemonsets/:daemonset`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceDetail} />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/daemonsets`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceList} resource="daemonset" />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/statefulsets/:statefulset`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceDetail} />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/statefulsets`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceList} resource="statefulset" />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/trafficsplits/:trafficsplit`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceDetail} />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/trafficsplits`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceList} resource="trafficsplit" />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/jobs/:job`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceDetail} />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/jobs`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceList} resource="job" />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/deployments/:deployment`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceDetail} />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/deployments`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceList} resource="deployment" />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/replicationcontrollers/:replicationcontroller`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceDetail} />} />
              <Route
                path={`${pathPrefix}/namespaces/:namespace/replicationcontrollers`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceList} resource="replicationcontroller" />} />
              <Route
                path={`${pathPrefix}/namespaces`}
                render={props => <Navigation releaseVersion="2.6.0" {...props} ChildComponent={ResourceList} resource="namespace" />} />
              <Route component={NoMatch} />
            </Switch>
          </RouterToUrlQuery>
        </BrowserRouter>
    </React.Fragment>
  );
}


export default App;
