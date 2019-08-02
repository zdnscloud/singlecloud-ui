/**
 *
 * ResourceQuota
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import * as cActions from 'ducks/configMaps/actions';
import * as actions from 'ducks/deployments/actions';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectConfigMaps } from 'ducks/configMaps/selectors';

import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export const ResourceQuota = (props) => {
  const { classes, resourceQuota, clusterID, namespaceID } = props;
  const reg = /^(\d+)([a-zA-Z]+)?$/;
  const cpu = resourceQuota.getIn(['limits', 'limits.cpu']);
  const memory = resourceQuota.getIn(['limits', 'limits.memory']);
  const storage = resourceQuota.getIn(['limits', 'requests.storage']);
  console.log(cpu);

  return (
    <GridContainer className={classes.grid}>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer style={{ paddingLeft: 30, paddingRight: 30 }}>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.formName} />}
              fullWidth
              value={namespaceID}
            />
          </GridItem>
        </GridContainer>
        <GridContainer style={{ paddingLeft: 30, paddingRight: 30 }}>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.CPUQuota} />}
              fullWidth
              inputProps={{
                endAdornment: (
                  <FormattedMessage {...messages.CPUQuotaEndAdornment} />
                ),
              }}
              value={(reg.exec(cpu) || [])[1]}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.memoryQuota} />}
              fullWidth
              inputProps={{
                endAdornment: (reg.exec(memory) || [])[2],
              }}
              value={(reg.exec(memory) || [])[1]}
            />
          </GridItem>
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.storageQuota} />}
              fullWidth
              inputProps={{
                endAdornment: (reg.exec(storage) || [])[2],
              }}
              value={(reg.exec(storage) || [])[1]}
            />
          </GridItem>
        </GridContainer>
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
  injectIntl,
  withConnect,
  withStyles(styles)
)(ResourceQuota);
