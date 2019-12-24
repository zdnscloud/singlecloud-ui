/**
 *
 * Metrics Table
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import { makeSelectLocation } from 'ducks/app/selectors';
import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/metrics/actions';

import messages from './messages';
import useStyles from './styles';

/* eslint-disable react/prefer-stateless-function */
const MetricsTable = ({ data, input }) => {
  const classes = useStyles();

  const onChange = (event) => {
    let val = input.value;
    const { checked, value } = event.target;

    if (checked) {
      val = val.push(value);
    } else {
      val = val.filter((v) => v !== value);
    }
    input.onChange(val);
  };

  return (
    <Fragment>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ width: 100 }}
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <Checkbox
                checked="false"
                onChange={onChange}
                value=""
                color="primary"
              />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.tableTitleName} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.tableTitleLabels} />
            </TableCell>
            <TableCell
              className={`${classes.tableCell} ${classes.tableHeadCell}`}
            >
              <FormattedMessage {...messages.tableTitleGauge} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MetricsTable);
