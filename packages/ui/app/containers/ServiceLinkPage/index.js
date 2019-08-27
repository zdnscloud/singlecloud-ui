/**
 *
 * Service Link Page
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import * as actions from 'ducks/serviceLinks/actions';
import request from 'utils/request';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectCurrentNamespace } from 'ducks/namespaces/selectors';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import ServiceLinkPageHelmet from './helmet';
import styles from './styles';
import InnerCharts from './InnerCharts';
import OuterCharts from './OuterCharts';

/* eslint-disable react/prefer-stateless-function */
export class ServiceLinkPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
  };

  state = { tab: 0 };

  setTab = (evt, val) => this.setState({ tab: val });

  componentWillMount() {
    this.load();
    // this.timer = setInterval(() => this.load(), 10000);
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

  componentWillUnmount() {
    clearInterval(this.timer);
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
      const ourl = namespace.getIn(['links', 'outerservices']);
      const iurl = namespace.getIn(['links', 'innerservices']);
      loadOuterServices(ourl, clusterID, namespaceID);
      loadInnerServices(iurl, clusterID, namespaceID);
    }
  }

  render() {
    const { classes, clusterID, namespaceID } = this.props;

    return (
      <div className={classes.root}>
        <ServiceLinkPageHelmet />
        <CssBaseline />
        <Paper className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/namespaces/${namespaceID}/serviceLink`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader style={{ padding: 0 }}>
                  <h4>
                    <Tabs
                      value={this.state.tab}
                      onChange={this.setTab}
                      textColor="inherit"
                      classes={{
                        indicator: classes.indicator,
                      }}
                    >
                      <Tab
                        label={<FormattedMessage {...messages.outerServices} />}
                      />
                      <Tab
                        label={<FormattedMessage {...messages.innerServices} />}
                      />
                    </Tabs>
                  </h4>
                </CardHeader>
                <CardBody>
                  {this.state.tab === 0 ? (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <OuterCharts />
                      </GridItem>
                    </GridContainer>
                  ) : (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <InnerCharts />
                      </GridItem>
                    </GridContainer>
                  )}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
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
)(ServiceLinkPage);
