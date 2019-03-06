"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SimpleTable = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _immutable = require("immutable");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

/**
 *
 * ClustersPage
 *
 */
var schema = [{
  id: 'id',
  label: 'str'
}];
/* eslint-disable react/prefer-stateless-function */

var SimpleTable =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(SimpleTable, _React$PureComponent);

  function SimpleTable() {
    (0, _classCallCheck2.default)(this, SimpleTable);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SimpleTable).apply(this, arguments));
  }

  (0, _createClass2.default)(SimpleTable, [{
    key: "getKey",
    value: function getKey(data, key) {
      if ((0, _immutable.isImmutable)(data)) {
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
          extras = (0, _objectWithoutProperties2.default)(_this$props, ["schema", "data"]);
      return _react.default.createElement(_Table.default, extras, _react.default.createElement(_TableHead.default, null, _react.default.createElement(_TableRow.default, null, schema.map(function (column) {
        return _react.default.createElement(_TableCell.default, {
          key: _this.getKey(column, 'id'),
          component: "th"
        }, _this.getKey(column, 'label'));
      }))), _react.default.createElement(_TableBody.default, null, data.map(function (rowData, id) {
        return _react.default.createElement(_TableRow.default, {
          key: id
        }, schema.map(function (column) {
          var CustomCell = _this.get(column, 'component');

          var Cell = CustomCell ? CustomCell : _TableCell.default;
          return _react.default.createElement(Cell, {
            key: _this.getKey(column, 'id'),
            data: rowData,
            column: column
          }, '' + _this.getKey(rowData, _this.getKey(column, 'id')));
        }));
      })));
    }
  }]);
  return SimpleTable;
}(_react.default.PureComponent);

exports.SimpleTable = SimpleTable;
process.env.NODE_ENV !== "production" ? SimpleTable.propTypes = {
  classes: _propTypes.default.object.isRequired
} : void 0;
var _default = SimpleTable;
exports.default = _default;