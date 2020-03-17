/**
 *
 * Job
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import * as cActions from 'ducks/configMaps/actions';
import * as actions from 'ducks/jobs/actions';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectConfigMaps } from 'ducks/configMaps/selectors';

import messages from './messages';
import useStyles from './styles';

/* eslint-disable react/prefer-stateless-function */
export const Job = ({ updateJob, job, clusterID, namespaceID }) => {
  const classes = useStyles();
  const intl = useIntl();
  const replicas = job.get('replicas');
  const updateUrl = job.getIn(['links', 'update']);
  const typeMap = {
    configmap: intl.formatMessage(messages.formVolumeTypeConfigMap),
    secret: intl.formatMessage(messages.formVolumeTypeSecret),
    persistentVolume: intl.formatMessage(
      messages.formVolumeTypePersistentVolume
    ),
  };

  return (
    <Fragment>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.jobDetail} />
            </h4>
          </CardHeader>
          <CardBody>
            <GridItem xs={12} sm={12} md={12}>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formName} />}
                    name="name"
                    fullWidth
                    value={job.get('name')}
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={
                      <FormattedMessage {...messages.formRestartPolicy} />
                    }
                    name="restartPolicy"
                    fullWidth
                    value={job.get('restartPolicy')}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <h4>
              <FormattedMessage {...messages.formContainers} />
            </h4>
          </CardHeader>
          <CardBody>
            <List component="ul" className={classes.noPaddingList}>
              {job &&
                job.get('containers') &&
                job.get('containers').map((c, i) => (
                  <Card key={i}>
                    <CardBody>
                      <ListItem key={i}>
                        <ListItemText>
                          <GridContainer>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage
                                    {...messages.formContainerName}
                                  />
                                }
                                fullWidth
                                value={c.get('name')}
                              />
                            </GridItem>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage {...messages.formImage} />
                                }
                                fullWidth
                                value={c.get('image')}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage {...messages.formCommand} />
                                }
                                fullWidth
                                value={parseCmd(c.get('command'))}
                              />
                            </GridItem>
                            <GridItem xs={3} sm={3} md={3}>
                              <ReadOnlyInput
                                labelText={
                                  <FormattedMessage {...messages.formArgs} />
                                }
                                fullWidth
                                value={parseCmd(c.get('args'))}
                              />
                            </GridItem>
                          </GridContainer>
                          {c.get('env') ? (
                            <GridContainer>
                              <GridItem>
                                <List component="ul" className={classes.noPaddingList}>
                                  <ListItem>
                                    <ListItemText
                                      primary={
                                        <FormattedMessage
                                          {...messages.formENV}
                                        />
                                      }
                                    />
                                  </ListItem>
                                  {c.get('env').map((p, j) => (
                                    <ListItem key={j}>
                                      <ListItemText>
                                        <ReadOnlyInput
                                          labelText={
                                            <FormattedMessage
                                              {...messages.formENVName}
                                            />
                                          }
                                          value={p.get('name')}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <ReadOnlyInput
                                          labelText={
                                            <FormattedMessage
                                              {...messages.formENVValue}
                                            />
                                          }
                                          value={p.get('value')}
                                        />
                                      </ListItemText>
                                    </ListItem>
                                  ))}
                                </List>
                              </GridItem>
                            </GridContainer>
                          ) : null}
                          {c.get('volumes') ? (
                            <GridContainer>
                              <GridItem>
                                <List component="ul" className={classes.noPaddingList}>
                                  <ListItem>
                                    <ListItemText
                                      primary={
                                        <FormattedMessage
                                          {...messages.formVolumes}
                                        />
                                      }
                                    />
                                  </ListItem>
                                  {c.get('volumes').map((p, k) => (
                                    <ListItem key={k}>
                                      <ListItemText>
                                        <ReadOnlyInput
                                          labelText={
                                            <FormattedMessage
                                              {...messages.formVolumeType}
                                            />
                                          }
                                          value={typeMap[p.get('type')]}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <ReadOnlyInput
                                          labelText={
                                            <FormattedMessage
                                              {...messages.formVolumeName}
                                            />
                                          }
                                          value={p.get('name')}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <ReadOnlyInput
                                          labelText={
                                            <FormattedMessage
                                              {...messages.formMountPath}
                                            />
                                          }
                                          value={p.get('mountPath')}
                                        />
                                      </ListItemText>
                                    </ListItem>
                                  ))}
                                </List>
                              </GridItem>
                            </GridContainer>
                          ) : null}
                          {c.get('exposedPorts') ? (
                            <GridContainer>
                              <GridItem>
                                <List component="ul" className={classes.noPaddingList}>
                                  <ListItem>
                                    <ListItemText
                                      primary={
                                        <FormattedMessage
                                          {...messages.formExposedPorts}
                                        />
                                      }
                                    />
                                  </ListItem>
                                  {c.get('exposedPorts').map((p, j) => (
                                    <ListItem key={j}>
                                      <ListItemText>
                                        <ReadOnlyInput
                                          labelText={
                                            <FormattedMessage
                                              {...messages.formPortName}
                                            />
                                          }
                                          value={p.get('name')}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <ReadOnlyInput
                                          labelText={
                                            <FormattedMessage
                                              {...messages.formPortProtocol}
                                            />
                                          }
                                          value={p.get('protocol')}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <ReadOnlyInput
                                          labelText={
                                            <FormattedMessage
                                              {...messages.formPort}
                                            />
                                          }
                                          value={p.get('port')}
                                        />
                                      </ListItemText>
                                    </ListItem>
                                  ))}
                                </List>
                              </GridItem>
                            </GridContainer>
                          ) : null}
                        </ListItemText>
                      </ListItem>
                    </CardBody>
                  </Card>
                ))}
            </List>
          </CardBody>
        </Card>
      </GridItem>
    </Fragment>
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

export default compose(withConnect)(Job);
