/**
 *
 * Create Application Page
 *
 */

import React, { Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { loadConfigMaps } from 'ducks/configMaps/actions';
import { makeSelectConfigMaps } from 'ducks/configMaps/selectors';
import injectSaga from 'utils/injectSaga';

import messages from './messages';
import DeploymentsHelmet from './helmet';
import styles from './styles';
import ContainerForm from './ContainerForm';
import { makeSelectNamespaces } from '../NamespacesPage/selectors';

/* eslint-disable react/prefer-stateless-function */
export class CreateApplication extends React.PureComponent {
  static propTypes = {
    initCreateForm: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    formData: PropTypes.object.isRequired,
    updateForm: PropTypes.func.isRequired,
  };

  componentWillMount() {
    // this.props.initCreateForm(this.props.match);
    this.props.loadConfigMaps();
  }

  componentDidUpdate(prevProps) {
    const { clusterID, namespaces, namespaceID, history } = this.props;
    const {
      clusterID: prevClusterID,
      namespaces: prevNamespaces,
      namespaceID: prevNamespaceID,
      history: prevHistory,
    } = prevProps;
    if (namespaceID !== prevNamespaceID) {
      // this.props.initCreateForm(this.props.match);
      this.props.loadConfigMaps();
    }
  }

  render() {
    const {
      classes,
      formData,
      formPorts,
      configMaps,
      updateForm,
      namespaces,
      createApplication,
    } = this.props;

    return (
      <div className={classes.root}>
        <DeploymentsHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom component="h2">
                <FormattedMessage {...messages.applications} />
              </Typography>
              <Typography component="div" className={classes.appContainer}>
                <div>
                  <TextField
                    className={classNames(classes.margin, classes.textField)}
                    label="name"
                    value={formData.get('name')}
                    onChange={(evt) => updateForm('name', evt.target.value)}
                  />
                  <TextField
                    className={classNames(classes.margin, classes.textField)}
                    type="number"
                    label="replicas"
                    value={formData.get('replicas')}
                    onChange={(evt) =>
                      updateForm('replicas', Number(evt.target.value))
                    }
                  />
                </div>
                {formData.get('containers').map((item, index) => (
                  <ContainerForm
                    classes={classes}
                    index={index}
                    item={item}
                    configMaps={configMaps.toList()}
                    updateForm={updateForm}
                    key={index}
                  />
                ))}
                <Button
                  color="primary"
                  aria-label="add Container"
                  className={classes.addContainerButton}
                  style={{ marginTop: '5px' }}
                  onClick={(evt) => {
                    const { size } = formData.get('containers');
                    updateForm(
                      ['containers', size],
                      fromJS({
                        name: '',
                        image: '',
                        command: '',
                        args: '',
                        config_name: '',
                        mount_path: '',
                        exposedPorts: [],
                      })
                    );
                  }}
                >
                  <AddIcon />
                  add container
                </Button>
              </Typography>
              <Typography component="div" className={classes.advanceContainer}>
                <FormControlLabel
                  style={{ marginLeft: '-8px' }}
                  control={
                    <Switch
                      classes={{
                        switchBase: classes.iOSSwitchBase,
                        bar: classes.iOSBar,
                        icon: classes.iOSIcon,
                        iconChecked: classes.iOSIconChecked,
                        checked: classes.iOSChecked,
                      }}
                      disableRipple
                      checked={formData.get('enableAdvancedOptions')}
                      onChange={(evt) => {
                        updateForm(
                          'enableAdvancedOptions',
                          !formData.get('enableAdvancedOptions')
                        );
                      }}
                      value="advancedOptions"
                    />
                  }
                  label="Advanced Options"
                />
                <Collapse in={formData.get('enableAdvancedOptions')}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="exposed-service-type">
                      Exposed Service Type
                    </InputLabel>
                    <Select
                      value={formData.getIn([
                        'advancedOptions',
                        'exposedServiceType',
                      ])}
                      onChange={(evt) =>
                        updateForm(
                          ['advancedOptions', 'exposedServiceType'],
                          evt.target.value
                        )
                      }
                    >
                      <MenuItem value="clusterip">Cluster IP</MenuItem>
                      <MenuItem value="nodeport">Node Port</MenuItem>
                    </Select>
                  </FormControl>
                  {formPorts.map((port, index) => {
                    const svcs = formData.getIn([
                      'advancedOptions',
                      'exposedServices',
                    ]);
                    const current = svcs.find(
                      (svc) =>
                        svc.get('port') === port.get('port') &&
                        svc.get('protocol') === port.get('protocol')
                    );
                    const idx = svcs.findIndex((svc) => svc === current);
                    return (
                      <Paper
                        className={classNames(
                          classes.separateLine,
                          classes.padding10
                        )}
                      >
                        <Grid>
                          {port.get('name') ? (
                            <FormLabel
                              className={classNames(
                                classes.marginRight10,
                                classes.textField
                              )}
                            >
                              Name: {port.get('name')}
                            </FormLabel>
                          ) : null}
                          <FormLabel
                            className={classNames(
                              classes.marginRight10,
                              classes.textField
                            )}
                          >
                            Protocol: {port.get('protocol')}
                          </FormLabel>
                          <FormLabel
                            className={classNames(
                              classes.marginRight10,
                              classes.textField
                            )}
                          >
                            Port: {port.get('port')}
                          </FormLabel>
                        </Grid>
                        <Grid>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={!!current}
                                onChange={(evt) => {
                                  if (current) {
                                    updateForm(
                                      [
                                        'advancedOptions',
                                        'exposedServices',
                                        idx,
                                      ],
                                      null
                                    );
                                  } else {
                                    updateForm(
                                      [
                                        'advancedOptions',
                                        'exposedServices',
                                        svcs.size,
                                      ],
                                      port
                                    );
                                  }
                                }}
                                value
                                color="primary"
                              />
                            }
                            label="Auto Create Service"
                          />
                          <TextField
                            className={classNames(
                              classes.margin,
                              classes.textField
                            )}
                            type="number"
                            label="Servce Port"
                            disabled={!current}
                            value={
                              (current && current.get('servicePort')) || ''
                            }
                            onChange={(evt) => {
                              updateForm(
                                [
                                  'advancedOptions',
                                  'exposedServices',
                                  idx,
                                  'servicePort',
                                ],
                                Number(evt.target.value)
                              );
                            }}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                disabled={!current}
                                checked={
                                  current && current.get('autoCreateIngress')
                                }
                                onChange={(evt) => {
                                  updateForm(
                                    [
                                      'advancedOptions',
                                      'exposedServices',
                                      idx,
                                      'autoCreateIngress',
                                    ],
                                    !current.get('autoCreateIngress')
                                  );
                                }}
                                value
                                color="primary"
                              />
                            }
                            label="Auto Create Ingress"
                          />
                          <TextField
                            className={classNames(
                              classes.margin,
                              classes.textField
                            )}
                            label="Ingress Domain Name"
                            disabled={
                              !current || !current.get('autoCreateIngress')
                            }
                            value={
                              (current && current.get('ingressDomainName')) ||
                              ''
                            }
                            onChange={(evt) => {
                              updateForm(
                                [
                                  'advancedOptions',
                                  'exposedServices',
                                  idx,
                                  'ingressDomainName',
                                ],
                                evt.target.value
                              );
                            }}
                          />
                          <TextField
                            className={classNames(
                              classes.margin,
                              classes.textField
                            )}
                            label="Ingress Path"
                            disabled={
                              !current || !current.get('autoCreateIngress')
                            }
                            value={
                              (current && current.get('ingressPath')) || ''
                            }
                            onChange={(evt) => {
                              updateForm(
                                [
                                  'advancedOptions',
                                  'exposedServices',
                                  idx,
                                  'ingressPath',
                                ],
                                evt.target.value
                              );
                            }}
                          />
                        </Grid>
                      </Paper>
                    );
                  })}
                </Collapse>
              </Typography>
              <Typography component="div" className={classes.actionContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classNames(classes.margin, classes.button)}
                  onClick={(evt) => createApplication()}
                >
                  Create
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  configMaps: makeSelectConfigMaps(),
  namespaces: makeSelectNamespaces(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadConfigMaps,
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
)(CreateApplication);
