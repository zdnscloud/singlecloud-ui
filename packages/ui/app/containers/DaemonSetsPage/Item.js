/**
 *
 * DaemonSet
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import list2str from '@gsmlg/utils/list2str';

import { FormattedMessage } from 'react-intl';
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
import * as actions from 'ducks/daemonSets/actions';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import { makeSelectConfigMaps } from 'ducks/configMaps/selectors';

import messages from './messages';
import useStyles from './styles';

/* eslint-disable react/prefer-stateless-function */
export const DaemonSet = ({
  updateDaemonSet,
  daemonSet,
  clusterID,
  namespaceID,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const replicas = daemonSet.get('replicas');
  const updateUrl = daemonSet.getIn(['links', 'update']);
  const typeMap = {
    configmap: intl.formatMessage(messages.formVolumeTypeConfigMap),
    secret: intl.formatMessage(messages.formVolumeTypeSecret),
    persistentVolume: intl.formatMessage(
      messages.formVolumeTypePersistentVolume
    ),
  };

  return (
    <GridContainer className={classes.grid}>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage {...messages.daemonSetDetail} />
            </h4>
          </CardHeader>
          <CardBody style={{ paddingLeft: 0, paddingRight: 0 }}>
            <GridItem xs={12} sm={12} md={12}>
              <GridContainer style={{ paddingLeft: 30, paddingRight: 30 }}>
                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formName} />}
                    name="name"
                    fullWidth
                    value={daemonSet.get('name')}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </CardBody>
        </Card>
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
              {daemonSet &&
               daemonSet.get('containers') &&
               daemonSet.get('containers').map((c, i) => (
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
                                 <FormattedMessage
                                   {...messages.formCommand}
                                 />
                               }
                               fullWidth
                               value={list2str(c.get('command'), ' ')}
                             />
                           </GridItem>
                           <GridItem xs={3} sm={3} md={3}>
                             <ReadOnlyInput
                               labelText={
                                 <FormattedMessage {...messages.formArgs} />
                               }
                               fullWidth
                               value={list2str(c.get('args'))}
                             />
                           </GridItem>
                         </GridContainer>
                         {c.get('env') ? (
                           <GridContainer>
                             <GridItem>
                               <List component="ul">
                                 <ListItem>
                                   <ListItemText
                                     primary={
                                       <FormattedMessage
                                         {...messages.formENV}
                                       />
                                     }
                                   />
                                 </ListItem>
                                 {c.get('env').map((p, i) => (
                                   <ListItem key={i}>
                                     <ListItemText>
                                       <GridContainer>
                                         <GridItem
                                           xs={3}
                                           sm={3}
                                           md={3}
                                           className={classes.formLine}
                                         >
                                           <ReadOnlyInput
                                             labelText={
                                               <FormattedMessage
                                                 {...messages.formENVName}
                                               />
                                             }
                                             value={p.get('name')}
                                           />
                                         </GridItem>
                                         <GridItem
                                           xs={3}
                                           sm={3}
                                           md={3}
                                           className={classes.formLine}
                                         >
                                           <ReadOnlyInput
                                             labelText={
                                               <FormattedMessage
                                                 {...messages.formENVValue}
                                               />
                                             }
                                             value={p.get('value')}
                                           />
                                         </GridItem>
                                       </GridContainer>
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
                                   <ListItemText
                                     primary={
                                       <FormattedMessage
                                         {...messages.formVolumes}
                                       />
                                     }
                                   />
                                 </ListItem>
                                 {c.get('volumes').map((p, i) => (
                                   <ListItem key={i}>
                                     <ListItemText>
                                       <GridContainer>
                                         <GridItem
                                           xs={3}
                                           sm={3}
                                           md={3}
                                           className={classes.formLine}
                                         >
                                           <ReadOnlyInput
                                             labelText={
                                               <FormattedMessage
                                                 {...messages.formVolumeType}
                                               />
                                             }
                                             value={typeMap[p.get('type')]}
                                           />
                                         </GridItem>
                                         <GridItem
                                           xs={3}
                                           sm={3}
                                           md={3}
                                           className={classes.formLine}
                                         >
                                           <ReadOnlyInput
                                             labelText={
                                               <FormattedMessage
                                                 {...messages.formVolumeName}
                                               />
                                             }
                                             value={p.get('name')}
                                           />
                                         </GridItem>
                                         <GridItem
                                           xs={3}
                                           sm={3}
                                           md={3}
                                           className={classes.formLine}
                                         >
                                           <ReadOnlyInput
                                             labelText={
                                               <FormattedMessage
                                                 {...messages.formMountPath}
                                               />
                                             }
                                             value={p.get('mountPath')}
                                           />
                                         </GridItem>
                                       </GridContainer>
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
                                   <ListItemText
                                     primary={
                                       <FormattedMessage
                                         {...messages.formExposedPorts}
                                       />
                                     }
                                   />
                                 </ListItem>
                                 {c.get('exposedPorts').map((p, i) => (
                                   <ListItem key={i}>
                                     <ListItemText>
                                       <GridContainer>
                                         <GridItem
                                           xs={3}
                                           sm={3}
                                           md={3}
                                           className={classes.formLine}
                                         >
                                           <ReadOnlyInput
                                             labelText={
                                               <FormattedMessage
                                                 {...messages.formPortName}
                                               />
                                             }
                                             value={p.get('name')}
                                           />
                                         </GridItem>
                                         <GridItem
                                           xs={3}
                                           sm={3}
                                           md={3}
                                           className={classes.formLine}
                                         >
                                           <ReadOnlyInput
                                             labelText={
                                               <FormattedMessage
                                                 {...messages.formPortProtocol}
                                               />
                                             }
                                             value={p.get('protocol')}
                                           />
                                         </GridItem>
                                         <GridItem
                                           xs={3}
                                           sm={3}
                                           md={3}
                                           className={classes.formLine}
                                         >
                                           <ReadOnlyInput
                                             labelText={
                                               <FormattedMessage
                                                 {...messages.formPort}
                                               />
                                             }
                                             value={p.get('port')}
                                           />
                                         </GridItem>
                                       </GridContainer>
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
      <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage {...messages.formServiceConfig} />
            </h4>
          </CardHeader>
          <CardBody>
            {daemonSet.get('advancedOptions') ? (
              <Fragment>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formReloadWhenConfigChange}
                        />
                      }
                      value={daemonSet.getIn([
                        'advancedOptions',
                        'reloadWhenConfigChange',
                      ])}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formExposedMetricPath}
                        />
                      }
                      value={daemonSet.getIn([
                        'advancedOptions',
                        'exposedMetric',
                        'path',
                      ])}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formExposedMeticPort}
                        />
                      }
                      value={daemonSet.getIn([
                        'advancedOptions',
                        'exposedMetric',
                        'port',
                      ])}
                    />
                  </GridItem>
                </GridContainer>
              </Fragment>
            ) : null}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card style={{ marginTop: 20, marginBottom: 0 }}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage {...messages.formVolumeClaimTemplate} />
            </h4>
          </CardHeader>
          <CardBody>
            {daemonSet.get('persistentVolumes') &&
             daemonSet.get('persistentVolumes').map((pv) => (
               <GridContainer>
                 <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                   <ReadOnlyInput
                     labelText={
                       <FormattedMessage
                         {...messages.formVolumeClaimTemplateName}
                       />
                     }
                     value={pv.get('name')}
                   />
                 </GridItem>
                 <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                   <ReadOnlyInput
                     labelText={
                       <FormattedMessage
                         {...messages.formVolumeClaimTemplateSize}
                       />
                     }
                     value={pv.get('size')}
                   />
                 </GridItem>
                 <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                   <ReadOnlyInput
                     labelText={
                       <FormattedMessage
                         {...messages.formVolumeClaimTemplateStorageClassName}
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
)(DaemonSet);
