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

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import * as actions from 'ducks/userQuotas/actions';
import {
  makeSelectUserQuotas,
  makeSelectUserQuotasList,
} from 'ducks/userQuotas/selectors';

import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

import messages from './messages';
import styles from './styles';
import schema from './adminTableSchema';

/* eslint-disable react/prefer-stateless-function */
export class AdminUserQuotasTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    userQuotas: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      data,
      // eslint-disable-next-line no-shadow
      removeUserQuota,
      filter,
      theme,
    } = this.props;
    const mergedSchema = schema
      .map((sch) => {
        if (sch.id === 'actions') {
          return {
            ...sch,
            props: { classes, removeUserQuota},
          };
        }
        return sch;
      })
      .map((s) => ({
        ...s,
        label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
      }));

    return (
      <Paper className={classes.tableWrapper}>
        <SimpleTable
          className={classes.table}
          schema={mergedSchema}
          data={data.filter((item) => {
            let flag = true;
            if (filter.userName) {
              flag = flag && item.get('userName') === filter.userName;
            }
            if (filter.status && filter.status !== 'all') {
              flag = flag && item.get('status') === filter.status;
            }
            return flag;
          })}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userQuotas: makeSelectUserQuotas(),
  data: makeSelectUserQuotasList(),
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
)(AdminUserQuotasTable);
