/* eslint-disable no-unreachable */
/**
 *
 * User Quotas Table
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer';
import * as actions from 'ducks/applications/actions';
import {
  makeSelectApplications,
  makeSelectApplicationsList,
} from 'ducks/applications/selectors';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';

import messages from './messages';
import styles from './styles';
import ApplicationTemplate from './application/applicationTemplate';

/* eslint-disable react/prefer-stateless-function */
export class ApplicationsList extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    applications: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      data,
      removeApplication,
      theme,
      filter,
      clusterID,
      namespaceID,
    } = this.props;
    const appData = data.filter((item) => {
      let flag = true;
      if (filter.name) {
        flag = flag && item.get('name').includes(filter.name);
      }
      return flag;
    });
    return (
      <GridContainer>
        {appData.map((item, key) => (
          <ApplicationTemplate
            classes={classes}
            key={key}
            item={item}
            removeApplication={removeApplication}
            namespaceID={namespaceID}
            clusterID={clusterID}
          />
        ))}
      </GridContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  applications: makeSelectApplications(),
  data: makeSelectApplicationsList(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles, { withTheme: true })
)(ApplicationsList);
