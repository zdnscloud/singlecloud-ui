/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  reduxForm,
  FormSection,
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { Link } from 'react-router-dom';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import IconButton from '@material-ui/core/IconButton';
import FileReaderField from 'components/Field/FileReaderField';
import Button from '@material-ui/core/Button';
import AddIcon from 'components/Icons/Add';
import NodesTable from './NodesTable';
import messages from './messages';
import checkIcon from 'images/clusters/check.png';
import failIcon from 'images/clusters/fail.png';
import loadingIcon from 'images/clusters/loading.png';
import logIcon from 'images/clusters/log.png';
import stopIcon from 'images/clusters/stop.png';
import unableStopIcon from 'images/clusters/unableStop.png';
import ShellIcon from 'components/Icons/Shell';

import { openTerminal } from 'containers/TerminalPage/actions';

class ClusterManageForm extends PureComponent {
  state = {};

  render() {
    const { handleSubmit, error, classes, formValues, theme, clusterID, cluster } = this.props;
    console.log('cluster',cluster.toJS())
    let status = cluster.get('status');
    let clusterStatus = null;
    
    switch (status) {
      case 'Running':
        clusterStatus = (<Button className={classes.runningBtn}>
          <img src={checkIcon} alt="checkIcon" className={classes.buttonIcon}/>
          <FormattedMessage {...messages.runningStatus} />
        </Button>);
        break;
      case 'Updating':
          clusterStatus = ( <Button className={classes.loadingBtn}>
            <img src={loadingIcon} alt="loadingIcon" className={classes.buttonIcon}/>
            <FormattedMessage {...messages.updatingStatus} />
          </Button>);
          break;
      case 'Connecting':
          clusterStatus= ( <Button className={classes.loadingBtn}>
            <img src={loadingIcon} alt="loadingIcon" className={classes.buttonIcon}/>
            <FormattedMessage {...messages.connectingStatus} />
          </Button>);
          break;
      case 'Creating':
          clusterStatus= (<Button className={classes.loadingBtn}>
            <img src={loadingIcon} alt="loadingIcon" className={classes.buttonIcon}/>
            <FormattedMessage {...messages.creatingStatus} />
          </Button>);
          break;
      case 'Unavailable':
        clusterStatus= (<Button className={classes.failBtn}>
          <img src={failIcon} alt="checkIcon" className={classes.buttonIcon}/>
          <FormattedMessage {...messages.unavailableStatus} />
        </Button>);
        break;
      case 'Unreachable':
        clusterStatus= ( <Button className={classes.failBtn}>
          <img src={failIcon} alt="checkIcon" className={classes.buttonIcon}/>
          <FormattedMessage {...messages.unreachableStatus} />
        </Button>);
        break;
      default:
         break;
     }

    return (
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer className={classes.grid}>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>{getByKey(error, ['response', 'message'])}</Danger>
            </GridItem>
          ) : null}
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.basicInfo} />
              </h4>
            </CardHeader>
            <CardBody>
                <GridContainer className={classes.btnGroup} >
                    <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                      {clusterStatus}
                      <Button 
                        className={ status === "Running" ? classes.handleBtn :  classes.unableBtn }
                        onClick={(evt) => {
                          openTerminal(clusterID);
                        }}
                      >
                        <ShellIcon className={classes.shellIcon} />
                        <FormattedMessage {...messages.shellButton} />
                      </Button>
                      <Button 
                        className={(
                          status === "Updating" || status === "Creating"
                          ) ? classes.handleBtn :  classes.unableBtn }
                        >
                        <img src={logIcon} alt="logIcon" className={classes.buttonIcon}/>
                        <FormattedMessage {...messages.updateLogButton} />
                      </Button>
                      <Button 
                        className={(
                          status === "Updating" || status === "Connecting" || status === "Creating"
                          ) ? classes.handleBtn :  classes.unableBtn }
                        >
                        <img src={stopIcon} alt="stopIcon" className={classes.buttonIcon}/>
                        <FormattedMessage {...messages.stopButton} />
                      </Button>
                    </GridItem>
                  </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={<FormattedMessage {...messages.formClusterName} />}
                      name="name"
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={
                        <FormattedMessage {...messages.formClusterSuffix} />
                      }
                      name="clusterDomain"
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem
                      xs={3}
                      sm={3}
                      md={3}
                      className={classes.formLine}
                    >
                      <InputField
                        label={<FormattedMessage {...messages.formSSHPort} />}
                        fullWidth
                        name="sshPort"
                      />
                    </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={<FormattedMessage {...messages.formSSHUser} />}
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="sshUser"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.formLine}
                  >
                    <InputField
                      label={
                        <FormattedMessage {...messages.formServiceIP} />
                      }
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="serviceCidr"
                    />
                  </GridItem>
                  <GridItem
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.formLine}
                  >
                    <InputField
                      label={<FormattedMessage {...messages.formPodIP} />}
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="clusterCidr"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem
                    xs={6}
                    sm={6}
                    md={6}
                    className={classes.formLine}
                  >
                      <InputField
                      label={
                        <FormattedMessage {...messages.formClustersNet} />
                      }
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="network.plugin"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.formLine}
                  >
                    <InputField
                      label={
                        <FormattedMessage {...messages.formClustersDNSIP} />
                      }
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="clusterDNSServiceIP"
                    />
                  </GridItem>
                  <GridItem
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.formLine}
                  >
                    <InputField
                      label={
                        <FormattedMessage {...messages.formForwardDNS} />
                      }
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="clusterUpstreamDNS"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.formLine}
                  >
                    <label>
                      <FormattedMessage
                        {...messages.formPrivateWarehouses}
                      />
                    </label>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.formLine}
                  >
                    <InputField
                      label={<FormattedMessage {...messages.formUrl} />}
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="privateRegistries[0].url"
                    />
                  </GridItem>
                  <GridItem
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.formLine}
                  >
                      <InputField
                      label={<FormattedMessage {...messages.formUser} />}
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      name="privateRegistries[0].user"
                    />
                  </GridItem>
                </GridContainer>
            </CardBody>
          </Card>
          <Card style={{ margin: 0, marginTop: 20 }}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.nodeList} />
                <IconButton
                      aria-label={<FormattedMessage {...messages.clusters} />}
                      className={classes.menuButton}
                      component={Link}
                      to={`/clusters/${clusterID}/manage/create`}
                    >
                      <AddIcon style={{ color: '#fff' }} />
                    </IconButton>
              </h4>
            </CardHeader>
            <CardBody>
              <NodesTable />
            </CardBody>
          </Card>
        </GridContainer>
      </form>
    );
  }
}

export default ClusterManageForm;
