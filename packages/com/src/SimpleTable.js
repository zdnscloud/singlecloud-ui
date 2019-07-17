/**
 *
 * ClustersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export class SimpleTable extends React.PureComponent {
  static propTypes = {
    schema: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]).isRequired,
    })).isRequired,
    data: PropTypes.object.isRequired,
  };

  getKey(data, key) {
    if (data && data.get && typeof data.get === 'function') {
      return data.get(key);
    } else if (typeof data === 'object') {
      return data[key];
    }
    return null;
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
          {data.filter((d) => !!d).map((rowData, id) => (
            <TableRow key={id}>
              {schema.map((column) => {
                const CustomComponent = this.getKey(column, 'component');
                return (
                  <TableCell key={this.getKey(column, 'id')}>
                    {(CustomComponent != null) ? (
                      <CustomComponent
                        data={rowData}
                        column={column}
                        id={this.getKey(column, 'id')}
                        value={this.getKey(rowData, this.getKey(column, 'id'))}
                      />
                    ) : `${this.getKey(rowData, this.getKey(column, 'id'))}`}
                  </TableCell>
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
