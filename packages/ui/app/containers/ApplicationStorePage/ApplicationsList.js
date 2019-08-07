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
import * as actions from 'ducks/applicationStore/actions';
import {
  makeSelectCharts,
  makeSelectChartsList,
} from 'ducks/applicationStore/selectors';

import messages from './messages';
import styles from './styles';
import ApplicationTemplate from './application/applicationTemplate'


/* eslint-disable react/prefer-stateless-function */
export class ApplicationsList extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    charts: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      data,
      theme,
      filter
    } = this.props;
    let chartData = data.filter((item) => {
      let flag = true;
      if (filter.name) {
        flag = flag && item.get('name') === filter.name;
      }
      return flag;
    })
    return (
      <GridContainer>
          {chartData.map((item, key) => {
              return (
                <ApplicationTemplate
                  classes={classes}
                  key={key}
                  item={item}
                />
              );
            })}
      </GridContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  charts: makeSelectCharts(),
  data: makeSelectChartsList(),
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
