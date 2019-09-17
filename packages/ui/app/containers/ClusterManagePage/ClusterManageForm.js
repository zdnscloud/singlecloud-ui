/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent, Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import {
  makeSelectURL,
  makeSelectCurrentCluster,
} from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import NodesTable from './NodesTable';
import messages from './messages';
import ButtonGroup from './ButtonGroup';
import NodeViewDialog from './NodeViewDialog';
import styles from './styles';

class ClusterManageForm extends PureComponent {
  state = {};

  render() {
    const { handleSubmit, error, classes, cluster, openNode } = this.props;

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer className={classes.formGrid}>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.basicInfo} />
              </h4>
              <span>
                <FormattedMessage {...messages.zcloudVersion} />
                {': '}
                {cluster.get('zcloudVersion')}
              </span>
            </CardHeader>
            <CardBody>
              <ButtonGroup />
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={
                      <FormattedMessage {...messages.formClusterName} />
                    }
                    fullWidth
                    value={cluster.get('name')}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={
                      <FormattedMessage {...messages.formClusterSuffix} />
                    }
                    fullWidth
                    value={cluster.get('clusterDomain')}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formSSHPort} />}
                    fullWidth
                    value={cluster.get('sshPort')}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formSSHUser} />}
                    fullWidth
                    value={cluster.get('sshUser')}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formServiceIP} />}
                    fullWidth
                    value={cluster.get('serviceCidr')}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formPodIP} />}
                    fullWidth
                    value={cluster.get('clusterCidr')}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={
                      <FormattedMessage {...messages.formClustersNet} />
                    }
                    fullWidth
                    value={cluster.get('network.plugin')}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={
                      <FormattedMessage {...messages.formClustersDNSIP} />
                    }
                    fullWidth
                    value={cluster.get('clusterDNSServiceIP')}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={
                      <FormattedMessage {...messages.formForwardDNSFirst} />
                    }
                    fullWidth
                    value={cluster.getIn(['clusterUpstreamDNS', 0])}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={
                      <FormattedMessage {...messages.formForwardDNSSecond} />
                    }
                    fullWidth
                    value={cluster.getIn(['clusterUpstreamDNS', 1])}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card style={{ margin: 0, marginTop: 20 }}>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.nodeList} />
              </h4>
              <IconButton
                aria-label={<FormattedMessage {...messages.clusters} />}
                onClick={(evt) => {
                  openNode();
                }}
              >
                <AddIcon />
              </IconButton>
            </CardHeader>
            <CardBody>
              <NodeViewDialog />
              <NodesTable />
            </CardBody>
          </Card>
        </GridContainer>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  cluster: makeSelectCurrentCluster(),
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
)(ClusterManageForm);
