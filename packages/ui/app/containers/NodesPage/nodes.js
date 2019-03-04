/**
 *
 * NodesPage
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

import { makeSelectNodes, makeSelectTableList } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class NodesTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tableList: PropTypes.object.isRequired,
    nodes: PropTypes.object,
  };

  render() {
    const { classes, tableList, nodes } = this.props;

    return (
      <Paper className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage {...messages.tableTitleName} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.tableTitleAddress} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.tableTitleRole} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.tableTitleLabels} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes &&
              tableList.map(id => (
                <TableRow key={id}>
                  <TableCell>{nodes.getIn([id, 'name'])}</TableCell>
                  <TableCell>{nodes.getIn([id, 'address'])}</TableCell>
                  <TableCell>{nodes.getIn([id, 'role'])}</TableCell>
                  <TableCell>{nodes.getIn([id, 'labels']).map((v, k) => `${k}=${v}`).join(', ')}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodes(),
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
)(NodesTable);
