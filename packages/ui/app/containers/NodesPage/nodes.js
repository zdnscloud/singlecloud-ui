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
import { SimpleTable } from '@gsmlg/com';

import { makeSelectNodes, makeSelectTableList } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';

/*
                    <TableCell>{nodes.getIn([id, 'name'])}</TableCell>
                  <TableCell>{nodes.getIn([id, 'address'])}</TableCell>
                  <TableCell>{nodes.getIn([id, 'role'])}</TableCell>
                  <TableCell>{nodes.getIn([id, 'cpu'])}</TableCell>
                  <TableCell>{nodes.getIn([id, 'memory'])}</TableCell>
                  <TableCell>{nodes.getIn([id, 'operatingSystem'])}</TableCell>
                  <TableCell>
                    {nodes.getIn([id, 'operatingSystemImage'])}
                  </TableCell>
                  <TableCell>{nodes.getIn([id, 'podCount'])}</TableCell>
                  <TableCell>{nodes.getIn([id, 'dockerVersion'])}</TableCell>
                  <TableCell>
                    {nodes.getIn([id, 'creationTimestamp'])}
                  </TableCell>
                  <TableCell>
                    {JSON.stringify(nodes.getIn([id, 'labels']))}
                  </TableCell>
*/
const schema = [
  { id: 'name', label: 'name', },
  { id: 'address', label: 'address', },
  { id: 'role', label: 'role', },
  { id: 'cpu', label: 'cpu', },
  { id: 'memory', label: 'memory', },
  { id: 'operatingSystem', label: 'operatingSystem', },
  { id: 'operatingSystemImage', label: 'operatingSystemImage', },
  { id: 'podCount', label: 'podCount', },
  { id: 'dockerVersion', label: 'dockerVersion', },
  { id: 'creationTimestamp', label: 'creationTimestamp', },
  { id: 'labels', label: 'labels', },
];

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
        <SimpleTable
          className={classes.table}
          schema={schema}
          data={tableList.map(id => nodes.get(id))}
        />
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
