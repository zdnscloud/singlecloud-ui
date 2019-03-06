/**
 *
 * ClustersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isImmutable } from 'immutable';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const schema = [
  {
    id: 'id',
    label: 'str',
  },
];

/* eslint-disable react/prefer-stateless-function */
export class SimpleTable extends React.PureComponent {
  static propTypes = {
    schema: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.tring.isRequired,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]).isRequired,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  getKey(data, key) {
    if (isImmutable(data)) {
      return data.get(key);
    }
    return data[key];
  }

  render() {
    const { schema, data, ...extras } = this.props;

    return (
      <Table {...extras}>
        <TableHead>
          <TableRow>
            {schema.map((column) => (
              <TableCell key={this.getKey(column, 'id')} component="th">
                {this.getKey(column, 'label')}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData, id) => (
            <TableRow key={id}>
              {schema.map((column) => {
                const CustomCell = this.getKey(column, 'component');
                const Cell = CustomCell ? CustomCell : TableCell;
                return (
                  <Cell key={this.getKey(column, 'id')} data={rowData} column={column}>
                    {'' + this.getKey(rowData, this.getKey(column, 'id'))}
                  </Cell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default SimpleTable;
