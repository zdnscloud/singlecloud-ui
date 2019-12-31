/**
 *
 * Metrics Table
 *
 */
import React, { Fragment, Children } from 'react';
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

import * as actions from 'ducks/metrics/actions';

import messages from './messages';
import useStyles from './styles';

/* eslint-disable react/prefer-stateless-function */
const MetricsTable = ({ data, setSelected, selected, type }) => {
  const classes = useStyles();

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.get('name_labels'));
      setSelected(newSelecteds.toJS());
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <Fragment>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {type !== 'daemonset' ? (
              <TableCell
                style={{ width: 100 }}
                className={`${classes.tableCell} ${classes.tableHeadCell}`}
              >
                <Checkbox
                  onChange={(event) => handleSelectAllClick(event)}
                  checked={selected.length === data.size}
                  color="primary"
                />
              </TableCell>
            ) : null}

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
              <FormattedMessage {...messages.tableTitleValue} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => {
            const isItemSelected = isSelected(row.get('name_labels'));
            return (
              <TableRow
                key={i}
                onClick={(event) => handleClick(event, row.get('name_labels'))}
              >
                {type !== 'daemonset' ? (
                  <TableCell className={classes.tableCell}>
                    <Checkbox checked={isItemSelected} color="primary" />
                  </TableCell>
                ) : null}
                <TableCell className={`${classes.tableCell}`}>
                  {row && row.get('name')}
                </TableCell>
                <TableCell
                  className={`${classes.tableCell}`}
                  style={{ wordBreak: 'break-all' }}
                >
                  <span>
                    {row
                      .get('labels')
                      .map((val, key) => (
                        <Chip key={key} label={`${key}=${val}`} />
                      ))
                      .toList()}
                  </span>
                </TableCell>
                <TableCell>{(row && row.get('value')) || '--'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
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
