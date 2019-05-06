/**
 *
 * Deployment
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
import * as actions from 'ducks/deployments/actions';
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
export class Deployment extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    deployment: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      scaleDeployment,
      deployment,
      clusterID,
      namespaceID,
    } = this.props;
    const replicas = deployment.get('replicas');
    const updateUrl = deployment.getIn(['links', 'update']);

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.deploymentDetail} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                      <CustomInput
                        labelText="Name"
                        name="name"
                        fullWidth
                        value={deployment.get('name')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                      <CustomInput
                        labelText="Replicas"
                        name="replicas"
                        fullWidth
                        value={deployment.get('replicas')}
                        inputProps={{
                          type: 'number',
                          autoComplete: 'username',
                          endAdornment: (
                            <InputAdornment position="end">
                              <ButtonBase
                                disabled={replicas === 1}
                                onClick={(evt) => {
                                  scaleDeployment({
                                    replicas: replicas - 1,
                                  }, {
                                    url: updateUrl,
                                    deployment,
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
                                  scaleDeployment({
                                    replicas: replicas + 1,
                                  }, {
                                    url: updateUrl,
                                    deployment,
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
                      <ListItemText primary="Containers" />
                    </ListItem>
                    {deployment.get('containers').map((c, i) => (
                      <Card key={i}>
                        <CardBody>
                          <ListItem key={i}>
                            <ListItemText>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText="Name"
                                    fullWidth
                                    value={c.get('name')}
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText="Image"
                                    fullWidth
                                    value={c.get('image')}
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText="Command"
                                    fullWidth
                                    value={c.get('command')}
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText="Args"
                                    fullWidth
                                    value={c.get('args')}
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText="Config Name"
                                    value={c.get('config_name')}
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                  <CustomInput
                                    labelText="Mount Path"
                                    value={c.get('mount_path')}
                                    fullWidth
                                  />
                                </GridItem>
                              </GridContainer>
                              {c.get('exposedPorts') ? (
                                <GridContainer>
                                  <GridItem>
                                    <List component="ul">
                                      <ListItem>
                                        <ListItemText primary="Expose Port" />
                                      </ListItem>
                                      {c.get('exposedPorts').map((p, i) => (
                                        <ListItem key={i}>
                                          <ListItemText>
                                            <CustomInput
                                              labelText="Name"
                                              value={p.get('name')}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <CustomInput
                                              labelText="Protocol"
                                              value={p.get('protocol')}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <CustomInput
                                              labelText="Port"
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
)(Deployment);
