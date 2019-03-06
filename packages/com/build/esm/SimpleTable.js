import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";

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
var schema = [{
  id: 'id',
  label: 'str'
}];
/* eslint-disable react/prefer-stateless-function */

export var SimpleTable =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SimpleTable, _React$PureComponent);

  function SimpleTable() {
    _classCallCheck(this, SimpleTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(SimpleTable).apply(this, arguments));
  }

  _createClass(SimpleTable, [{
    key: "getKey",
    value: function getKey(data, key) {
      if (isImmutable(data)) {
        return data.get(key);
      }

      return data[key];
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          schema = _this$props.schema,
          data = _this$props.data,
          extras = _objectWithoutProperties(_this$props, ["schema", "data"]);

      return React.createElement(Table, extras, React.createElement(TableHead, null, React.createElement(TableRow, null, schema.map(function (column) {
        return React.createElement(TableCell, {
          key: _this.getKey(column, 'id'),
          component: "th"
        }, _this.getKey(column, 'label'));
      }))), React.createElement(TableBody, null, data.map(function (rowData, id) {
        return React.createElement(TableRow, {
          key: id
        }, schema.map(function (column) {
          var CustomCell = _this.get(column, 'component');

          var Cell = CustomCell ? CustomCell : TableCell;
          return React.createElement(Cell, {
            key: _this.getKey(column, 'id'),
            data: rowData,
            column: column
          }, '' + _this.getKey(rowData, _this.getKey(column, 'id')));
        }));
      })));
    }
  }]);

  return SimpleTable;
}(React.PureComponent);
process.env.NODE_ENV !== "production" ? SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
} : void 0;
export default SimpleTable;