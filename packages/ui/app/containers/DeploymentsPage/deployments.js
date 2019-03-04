/**
 *
 * ClustersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeSelectDeployments, makeSelectTableList } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class ClustersTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tableList: PropTypes.object.isRequired,
    deployments: PropTypes.object.isRequired,
  };

  render() {
    const { classes, tableList, deployments } = this.props;

    return (
      <Paper className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage {...messages.tableTitleName} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableList.map(id => (
              <TableRow key={id}>
                <TableCell>{deployments.getIn([id, 'name'])}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  deployments: makeSelectDeployments(),
  tableList: makeSelectTableList(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(ClustersTable);
