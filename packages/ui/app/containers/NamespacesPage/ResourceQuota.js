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
export class ResourceQuota extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    resourceQuota: PropTypes.object.isRequired,
  };

  render() {
    const { classes, resourceQuota, clusterID, namespaceID } = this.props;
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
                value={resourceQuota.getIn(['limits', 'limits.cpu'])}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <ReadOnlyInput
                labelText={<FormattedMessage {...messages.memoryQuota} />}
                fullWidth
                inputProps={{
                  endAdornment: 'Gi',
                }}
                value={resourceQuota.getIn(['limits', 'limits.memory'])}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
              <ReadOnlyInput
                labelText={<FormattedMessage {...messages.storageQuota} />}
                fullWidth
                inputProps={{
                  endAdornment: 'Gi',
                }}
                value={resourceQuota.getIn(['limits', 'requests.cpu'])}
              />
            </GridItem>
          </GridContainer>
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
)(ResourceQuota);
