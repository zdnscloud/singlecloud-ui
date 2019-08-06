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
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import * as actions from 'ducks/userQuotas/actions';
import {
  makeSelectApplications,
  makeSelectApplicationsList,
} from 'ducks/userQuotas/selectors';

import messages from './messages';
import styles from './styles';
import ApplicationTemplate from './application/applicationTemplate'


/* eslint-disable react/prefer-stateless-function */
export class ApplicationsList extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    // data: PropTypes.object.isRequired,
    // userQuotas: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      // data,
      // eslint-disable-next-line no-shadow
      // removeUserQuota,
      theme,
    } = this.props;
    return (
      <GridContainer>
          <ApplicationTemplate classes={classes}/>
      </GridContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // userQuotas: makeSelectApplications(),
  // data: makeSelectApplicationsList(),
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
