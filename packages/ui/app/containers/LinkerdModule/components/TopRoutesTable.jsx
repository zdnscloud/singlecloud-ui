import BaseTable from './BaseTable.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import SuccessRateMiniChart from './util/SuccessRateMiniChart.jsx';
import { metricToFormatter } from './util/Utils.js';
import Message from 'components/Intl/Message';
import messages from '../messages';

const routesColumns = [
  {
    title: <Message messages={messages} keyName="colRoute" />, //"Route",
    dataIndex: "route",
    filter: d => d.route,
    sorter: d => d.route
  },
  {
    title: <Message messages={messages} keyName="colService" />, //"Service",
    tooltip: "hostname:port used when communicating with this target",
    dataIndex: "authority",
    filter: d => d.authority,
    sorter: d => d.authority
  },
  {
    title: <Message messages={messages} keyName="colSuccessRate" />, //"Success Rate",
    dataIndex: "successRate",
    isNumeric: true,
    render: d => <SuccessRateMiniChart sr={d.successRate} />,
    sorter: d => d.successRate
  },
  {
    title: <Message messages={messages} keyName="colRPS" />, //"RPS",
    dataIndex: "requestRate",
    isNumeric: true,
    render: d => metricToFormatter["NO_UNIT"](d.requestRate),
    sorter: d => d.requestRate
  },
  {
    title: <Message messages={messages} keyName="colP50Latency" />, //"P50 Latency",
    dataIndex: "latency.P50",
    isNumeric: true,
    render: d => metricToFormatter["LATENCY"](d.latency.P50),
    sorter: d => d.latency.P50
  },
  {
    title: <Message messages={messages} keyName="colP95Latency" />, //"P95 Latency",
    dataIndex: "latency.P95",
    isNumeric: true,
    render: d => metricToFormatter["LATENCY"](d.latency.P95),
    sorter: d => d.latency.P95
  },
  {
    title: <Message messages={messages} keyName="colP99Latency" />, //"P99 Latency",
    dataIndex: "latency.P99",
    isNumeric: true,
    render: d => metricToFormatter["LATENCY"](d.latency.P99),
    sorter: d => d.latency.P99
  }
];

export default class TopRoutesTable extends React.Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.shape({}))
  };

  static defaultProps = {
    rows: []
  };

  render() {
    const { rows } = this.props;
    return (
      <BaseTable
        enableFilter={true}
        tableRows={rows}
        tableColumns={routesColumns}
        tableClassName="metric-table"
        defaultOrderBy="route"
        rowKey={r => r.route + r.authority}
        padding="dense" />
    );
  }
}
