/**
 *
 * CronJob
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
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
import * as actions from 'ducks/cronJobs/actions';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import {
  makeSelectConfigMaps,
} from 'ducks/configMaps/selectors';

import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class CronJob extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cronJob: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      scaleCronJob,
      cronJob,
      clusterID,
      namespaceID,
      intl,
    } = this.props;
    const replicas = cronJob.get('replicas');
    const updateUrl = cronJob.getIn(['links', 'update']);
    const typeMap = {
      configmap: intl.formatMessage(messages.formVolumeTypeConfigMap),
      secret: intl.formatMessage(messages.formVolumeTypeSecret),
      persistentVolume: intl.formatMessage(messages.formVolumeTypePersistentVolume),
    };

    return (
      <GridContainer className={classes.grid}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.cronJobDetail} />
              </h4>
            </CardHeader>
            <CardBody style={{ paddingLeft: 0, paddingRight: 0 }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.formName} />}
                        name="name"
                        fullWidth
                        value={cronJob.get('name')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.formSchedule} />}
                        name="schedule"
                        fullWidth
                        value={cronJob.get('schedule')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.formRestartPolicy} />}
                        name="restartPolicy"
                        fullWidth
                        value={cronJob.get('restartPolicy')}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>
                        <FormattedMessage {...messages.formContainers} />
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <List component="ul">
                        {cronJob && cronJob.get('containers') && cronJob.get('containers').map((c, i) => (
                          <Card key={i}>
                            <CardBody>
                              <ListItem key={i}>
                                <ListItemText>
                                  <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                      <ReadOnlyInput
                                        labelText={<FormattedMessage {...messages.formContainerName} />}
                                        fullWidth
                                        value={c.get('name')}
                                      />
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={3}>
                                      <ReadOnlyInput
                                        labelText={<FormattedMessage {...messages.formImage} />}
                                        fullWidth
                                        value={c.get('image')}
                                      />
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer>
                                    <GridItem xs={3} sm={3} md={3}>
                                      <ReadOnlyInput
                                        labelText={<FormattedMessage {...messages.formCommand} />}
                                        fullWidth
                                        value={c.get('command')}
                                      />
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={3}>
                                      <ReadOnlyInput
                                        labelText={<FormattedMessage {...messages.formArgs} />}
                                        fullWidth
                                        value={c.get('args')}
                                      />
                                    </GridItem>
                                  </GridContainer>
                                  {c.get('env') ? (
                                    <GridContainer>
                                      <GridItem>
                                        <List component="ul">
                                          <ListItem>
                                            <ListItemText primary={<FormattedMessage {...messages.formENV} />} />
                                          </ListItem>
                                          {c.get('env').map((p, i) => (
                                            <ListItem key={i}>
                                              <ListItemText>
                                                <ReadOnlyInput
                                                  labelText={<FormattedMessage {...messages.formENVName} />}
                                                  value={p.get('name')}
                                                />
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <ReadOnlyInput
                                                  labelText={<FormattedMessage {...messages.formENVValue} />}
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
                                        <List component="ul">
                                          <ListItem>
                                            <ListItemText primary={<FormattedMessage {...messages.formVolumes} />} />
                                          </ListItem>
                                          {c.get('volumes').map((p, i) => (
                                            <ListItem key={i}>
                                              <ListItemText>
                                                <ReadOnlyInput
                                                  labelText={<FormattedMessage {...messages.formVolumeType} />}
                                                  value={typeMap[p.get('type')]}
                                                />
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <ReadOnlyInput
                                                  labelText={<FormattedMessage {...messages.formVolumeName} />}
                                                  value={p.get('name')}
                                                />
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <ReadOnlyInput
                                                  labelText={<FormattedMessage {...messages.formMountPath} />}
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
                                        <List component="ul">
                                          <ListItem>
                                            <ListItemText primary={<FormattedMessage {...messages.formExposedPorts} />} />
                                          </ListItem>
                                          {c.get('exposedPorts').map((p, i) => (
                                            <ListItem key={i}>
                                              <ListItemText>
                                                <ReadOnlyInput
                                                  labelText={<FormattedMessage {...messages.formPortName} />}
                                                  value={p.get('name')}
                                                />
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <ReadOnlyInput
                                                  labelText={<FormattedMessage {...messages.formPortProtocol} />}
                                                  value={p.get('protocol')}
                                                />
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <ReadOnlyInput
                                                  labelText={<FormattedMessage {...messages.formPort} />}
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
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  withStyles(styles)
)(CronJob);
