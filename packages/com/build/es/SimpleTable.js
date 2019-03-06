import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";

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
const schema = [{
  id: 'id',
  label: 'str'
}];
/* eslint-disable react/prefer-stateless-function */

export class SimpleTable extends React.PureComponent {
  getKey(data, key) {
    if (isImmutable(data)) {
      return data.get(key);
    }

    return data[key];
  }

  render() {
    const _this$props = this.props,
          {
      schema,
      data
    } = _this$props,
          extras = _objectWithoutPropertiesLoose(_this$props, ["schema", "data"]);

    return React.createElement(Table, extras, React.createElement(TableHead, null, React.createElement(TableRow, null, schema.map(column => React.createElement(TableCell, {
      key: this.getKey(column, 'id'),
      component: "th"
    }, this.getKey(column, 'label'))))), React.createElement(TableBody, null, data.map((rowData, id) => React.createElement(TableRow, {
      key: id
    }, schema.map(column => {
      const CustomCell = this.get(column, 'component');
      const Cell = CustomCell ? CustomCell : TableCell;
      return React.createElement(Cell, {
        key: this.getKey(column, 'id'),
        data: rowData,
        column: column
      }, '' + this.getKey(rowData, this.getKey(column, 'id')));
    })))));
  }

}
process.env.NODE_ENV !== "production" ? SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
} : void 0;
export default SimpleTable;