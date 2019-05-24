/**
 *
 * StatefulSet
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
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
import CustomInput from 'components/CustomInput/ReadOnlyInput';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import * as cActions from 'ducks/configMaps/actions';
import * as actions from 'ducks/statefulSets/actions';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import {
  makeSelectConfigMaps,
} from 'ducks/configMaps/selectors';

import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class StatefulSet extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    statefulSet: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      scaleStatefulSet,
      statefulSet,
      clusterID,
      namespaceID,
    } = this.props;
    const replicas = statefulSet.get('replicas');
    const updateUrl = statefulSet.getIn(['links', 'update']);

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.statefulSetDetail} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                      <CustomInput
                        labelText={<FormattedMessage {...messages.formName} />}
                        name="name"
                        fullWidth
                        value={statefulSet.get('name')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                      <CustomInput
                        labelText={<FormattedMessage {...messages.formReplicas} />}
                        name="replicas"
                        fullWidth
                        value={statefulSet.get('replicas')}
                        inputProps={{
                          type: 'number',
                          autoComplete: 'off',
                          endAdornment: (
                            <InputAdornment position="end">
                              <ButtonBase
                                disabled={replicas === 1}
                                onClick={(evt) => {
                                  scaleStatefulSet({
                                    replicas: replicas - 1,
                                  }, {
                                    url: updateUrl,
                                    statefulSet,
                                    clusterID,
                                    namespaceID,
                                  });
                                }}
                              >
                                <RemoveIcon />
                              </ButtonBase>
                              <ButtonBase
                                disabled={replicas >= 50}
                                onClick={(evt) => {
                                  scaleStatefulSet({
                                    replicas: replicas + 1,
                                  }, {
                                    url: updateUrl,
                                    statefulSet,
                                    clusterID,
                                    namespaceID,
                                  });
                                }}
                              >
                                <AddIcon />
                              </ButtonBase>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <List component="ul">
                    <ListItem>
                      <ListItemText primary={<FormattedMessage {...messages.formContainers} />} />
                    </ListItem>
                    {statefulSet && statefulSet.get('containers') && statefulSet.get('containers').map((c, i) => (
                      <Card key={i}>
                        <CardBody>
                          <ListItem key={i}>
                            <ListItemText>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText={<FormattedMessage {...messages.formContainerName} />}
                                    fullWidth
                                    value={c.get('name')}
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText={<FormattedMessage {...messages.formImage} />}
                                    fullWidth
                                    value={c.get('image')}
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText={<FormattedMessage {...messages.formCommand} />}
                                    fullWidth
                                    value={c.get('command')}
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText={<FormattedMessage {...messages.formArgs} />}
                                    fullWidth
                                    value={c.get('args')}
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText={<FormattedMessage {...messages.formConfigName} />}
                                    value={c.get('configName')}
                                    fullWidth
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText={<FormattedMessage {...messages.formMountPath} />}
                                    value={c.get('mountPath')}
                                    fullWidth
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
                                            <CustomInput
                                              labelText={<FormattedMessage {...messages.formENVName} />}
                                              value={p.get('name')}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <CustomInput
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
                                            <CustomInput
                                              labelText={<FormattedMessage {...messages.formPortName} />}
                                              value={p.get('name')}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <CustomInput
                                              labelText={<FormattedMessage {...messages.formPortProtocol} />}
                                              value={p.get('protocol')}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <CustomInput
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
  withConnect,
  withStyles(styles)
)(StatefulSet);
