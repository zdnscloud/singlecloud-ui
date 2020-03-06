/**
 *
 * WorkFlow
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import parseCmd from '@gsmlg/utils/parseCmd';

import InputAdornment from '@material-ui/core/InputAdornment';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import ReadOnlyCheckbox from 'components/CustomCheckbox/ReadOnlyCheckbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import * as cActions from 'ducks/configMaps/actions';
import * as actions from 'ducks/workFlows/actions';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectConfigMaps } from 'ducks/configMaps/selectors';

import messages from './messages';
import useStyles from './styles';

/* eslint-disable react/prefer-stateless-function */
export const WorkFlow = ({
  executeWorkFlowAction,
  workFlow,
  clusterID,
  namespaceID,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const containers = workFlow &&
  workFlow.getIn(['deploy','containers']);
  
  const persistentVolumes = workFlow &&
  workFlow.getIn(['deploy','persistentVolumes']);
  return (
    <GridContainer className={classes.grid}>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <ReadOnlyInput
                  labelText={<FormattedMessage {...messages.formName} />}
                  fullWidth
                  value={workFlow.get('name')}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.formBuildConfiguration } />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <ReadOnlyInput
                  labelText={<FormattedMessage {...messages.formGitRepositoryUrl} />}
                  fullWidth
                  value={workFlow.getIn(['git','repositoryUrl'])}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formGitRevision} />}
                  fullWidth
                  value={workFlow.getIn(['git','revision'])}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formGitUser} />}
                  value={workFlow.getIn(['git','user'])}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formGitPassword} />}
                  value={workFlow.getIn(['git','password'])}
                  fullWidth
                  inputProps={ { type: 'password', autoComplete: 'off' } }
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formImageName} />}
                  value={workFlow.getIn(['image','name'])}
                  fullWidth
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formImageRegistryUser} />}
                  value={workFlow.getIn(['image','registryUser'])}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formImageRegistryPassword} />}
                  value={workFlow.getIn(['image','registryPassword'])}
                  fullWidth
                  inputProps={ { type: 'password', autoComplete: 'off' } }
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.formDeploymentConfiguration } />
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formReplicas} />}
                  fullWidth
                  value={workFlow.getIn(['deploy','replicas'])}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyCheckbox
                  labelText={
                    <FormattedMessage {...messages.formInjectServiceMesh} />
                  }
                  value={workFlow.size>0 && workFlow.getIn([
                    'deploy', 'advancedOptions',
                    'injectServiceMesh',
                  ])}
                />
              </GridItem>
            </GridContainer>
            {containers &&
              containers.map((c, i) => (
                <GridContainer key={i}>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      label={<FormattedMessage {...messages.formContainerName} />}
                      value={c.get('name')}
                      fullWidth
                    /> 
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      label={<FormattedMessage {...messages.formContainerCommand} />}
                      value={parseCmd(c.get('command'))}
                      fullWidth
                    /> 
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <ReadOnlyInput
                      label={<FormattedMessage {...messages.formContainerArgs} />}
                      value={parseCmd(c.get('args'))}
                      fullWidth
                    /> 
                  </GridItem>
                 
                  <GridItem xs={12} sm={12} md={12}>
                    <p> <FormattedMessage {...messages.formEnvBtn} /></p>
                    {c.get('env') ? (
                      <Card  className={classes.addList} border={c.get('env') .size>0 ? 'border':null } >
                        <CardBody>
                          {c.get('env').map((e, j) => (
                            <GridContainer key={j}>
                              <GridItem xs={3} sm={3} md={3}>
                                <ReadOnlyInput
                                  value={e.get('name')}
                                  fullWidth
                                  label={<FormattedMessage {...messages.formEnvName} />}
                                />
                              </GridItem>
                              <GridItem xs={3} sm={3} md={3}>
                                <ReadOnlyInput
                                  value={e.get('value')}
                                  fullWidth
                                  label={<FormattedMessage {...messages.formEnvValue} />}
                                />
                              </GridItem>
                            </GridContainer>
                          ))}
                        </CardBody>
                      </Card>
                    ):null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <p> <FormattedMessage {...messages.formVolumeBtn} /></p>
                    {c.get('volumes') ? (
                      <Card  className={classes.addList} border={c.get('volumes') .size>0 ? 'border':null } >
                        <CardBody>
                          {c.get('volumes').map((v, k) => (
                            <GridContainer key={k}>
                              <GridItem xs={3} sm={3} md={3}>
                                <ReadOnlyInput
                                  value={v.get('type')}
                                  fullWidth
                                  label={<FormattedMessage {...messages.formVolumeType} />}
                                />
                              </GridItem>
                              <GridItem xs={3} sm={3} md={3}>
                                <ReadOnlyInput
                                  value={v.get('name')}
                                  fullWidth
                                  label={<FormattedMessage {...messages.formVolumeName} />}
                                />
                              </GridItem>
                              <GridItem xs={3} sm={3} md={3}>
                                <ReadOnlyInput
                                  value={v.get('mountPath')}
                                  fullWidth
                                  label={<FormattedMessage {...messages.formVolumeMountPath} />}
                                />
                              </GridItem>
                            </GridContainer>
                          ))}
                        </CardBody>
                      </Card>
                    ):null}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <p> <FormattedMessage {...messages.formExposedPortBtn} /></p>
                    {c.get('exposedPorts') ? (
                      <Card  className={classes.addList} border={c.get('exposedPorts') .size>0 ? 'border':null } >
                        <CardBody>
                          {c.get('exposedPorts').map((ep, l) => (
                            <GridContainer key={l}>
                              <GridItem xs={3} sm={3} md={3}>
                                <ReadOnlyInput
                                  value={ep.get('name')}
                                  fullWidth
                                  label={<FormattedMessage {...messages.formPortName} />}
                                />
                              </GridItem>
                              <GridItem xs={3} sm={3} md={3}>
                                <ReadOnlyInput
                                  value={ep.get('protocol')}
                                  fullWidth
                                  label={<FormattedMessage {...messages.formPortProtocol} />}
                                />
                              </GridItem>
                              <GridItem xs={3} sm={3} md={3}>
                                <ReadOnlyInput
                                  value={ep.get('port')}
                                  fullWidth
                                  label={<FormattedMessage {...messages.formPort} />}
                                />
                              </GridItem>
                            </GridContainer>
                          ))}
                        </CardBody>
                      </Card>
                    ):null}
                  </GridItem>
                </GridContainer>
              ))}

            <GridContainer style={{marginBottom:'16px'}}>
              <GridItem xs={3} sm={3} md={3}>
                <span className={classes.serviceConfig}>
                  <FormattedMessage {...messages.formServiceConfiguration} />:
                </span> 
                <ReadOnlyCheckbox
                  labelText={
                    <FormattedMessage {...messages.formAutoDeploy} />
                  }
                  value={workFlow.size>0 && workFlow.get('autoDeploy')}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formExposedMetricPath} />}
                  value={workFlow.getIn(['deploy','advancedOptions','exposedMetric','path'])}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
                <ReadOnlyInput
                  label={<FormattedMessage {...messages.formExposedMetricPort} />}
                  value={workFlow.getIn(['deploy','advancedOptions','exposedMetric','port'])}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <p> <FormattedMessage {...messages.formPersistentVolumeBtn} /></p>
                <Card  className={classes.addList} border={persistentVolumes&&persistentVolumes.size>0 ? 'border':null } >
                  <CardBody>
                    {persistentVolumes &&
              persistentVolumes.map((pv,k) => (
                <GridContainer key={k}>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formPvName}
                        />
                      }
                      value={pv.get('name')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formPvSize}
                        />
                      }
                      value={pv.get('size')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formPvStorageClassName}
                        />
                      }
                      value={pv.get('storageClassName')}
                    />
                  </GridItem>
                </GridContainer>
              ))}
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  configMaps: makeSelectConfigMaps(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadConfigMaps: cActions.loadConfigMaps,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WorkFlow);
