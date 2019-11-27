import React, { PureComponent, Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { makeSelectURL, makeSelectCurrent } from 'ducks/clusters/selectors';
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
import useStyles from './styles';

const ClusterManageForm = ({
  handleSubmit,
  error,
  cluster,
  nodes,
  setNodes,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
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
              <FormattedMessage {...messages.formCreate} />
            </h4>
            <span className={classes.zcloudVersion}>
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
                  labelText={<FormattedMessage {...messages.formClusterName} />}
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
                  labelText={<FormattedMessage {...messages.formClustersNet} />}
                  fullWidth
                  value={cluster.getIn(['network', 'plugin'])}
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
              <FormattedMessage {...messages.formNode} />
            </h4>
            <IconButton
              aria-label={<FormattedMessage {...messages.clusters} />}
              onClick={(evt) => {
                setIsOpen(true);
              }}
              className={classes.createBtnLink}
            >
              <AddIcon />
            </IconButton>
          </CardHeader>
          <CardBody>
            <NodeViewDialog
              nodes={nodes}
              setNodes={setNodes}
              isOpen={isOpen}
              closeDialog={(evt) => setIsOpen(false)}
            />
            <NodesTable nodes={nodes} setNodes={setNodes} />
          </CardBody>
        </Card>
      </GridContainer>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  cluster: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ClusterManageForm);
