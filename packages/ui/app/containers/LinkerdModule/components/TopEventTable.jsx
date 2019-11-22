import { directionColumn, extractDisplayName, srcDstColumn, tapLink } from './util/TapUtils.jsx';
import { formatLatencySec, toShortResourceName } from './util/Utils.js';

import BaseTable from './BaseTable.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import SuccessRateMiniChart from './util/SuccessRateMiniChart.jsx';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';
import { withContext } from './util/AppContext.jsx';
import Message from 'components/Intl/Message';
import messages from '../messages';

const topColumns = (resourceType, ResourceLink, PrefixedLink) => [
  {
    title: " ",
    dataIndex: "direction",
    render: d => directionColumn(d.direction)
  },
  {
    title: <Message messages={messages} keyName="colName" />, //"Name",
    filter: d => {
      let [labels, display] = extractDisplayName(d);
      return _isEmpty(labels[resourceType]) ?
        display.str :
        toShortResourceName(resourceType) + "/" + labels[resourceType];
    },
    key: "src-dst",
    render: d => srcDstColumn(d, resourceType, ResourceLink)
  },
  {
    title: <Message messages={messages} keyName="colMethod" />, //"Method",
    dataIndex: "httpMethod",
    filter: d => d.httpMethod,
    sorter: d => d.httpMethod
  },
  {
    title: <Message messages={messages} keyName="colPath" />, //"Path",
    dataIndex: "path",
    filter: d => d.path,
    sorter: d => d.path
  },
  {
    title: <Message messages={messages} keyName="colCount" />, //"Count",
    dataIndex: "count",
    isNumeric: true,
    defaultSortOrder: "desc",
    sorter: d => d.count
  },
  {
    title: <Message messages={messages} keyName="colBest" />, //"Best",
    dataIndex: "best",
    isNumeric: true,
    render: d => formatLatencySec(d.best),
    sorter: d => d.best
  },
  {
    title: <Message messages={messages} keyName="colWorst" />, //"Worst",
    dataIndex: "worst",
    isNumeric: true,
    defaultSortOrder: "desc",
    render: d => formatLatencySec(d.worst),
    sorter: d => d.worst
  },
  {
    title: <Message messages={messages} keyName="colLast" />, //"Last",
    dataIndex: "last",
    isNumeric: true,
    render: d => formatLatencySec(d.last),
    sorter: d => d.last
  },
  {
    title: <Message messages={messages} keyName="colSuccessRate" />, //"Success Rate",
    dataIndex: "successRate",
    isNumeric: true,
    render: d => _isNil(d) || _isNil(d.successRate) ? "---" :
    <SuccessRateMiniChart sr={d.successRate.get()} />,
    sorter: d => d.successRate.get()
  },
  {
    title: <Message messages={messages} keyName="colTap" />, //"Tap",
    key: "tap",
    isNumeric: true,
    render: d => tapLink(d, resourceType, PrefixedLink)
  }
];

class TopEventTable extends React.Component {
  static propTypes = {
    api: PropTypes.shape({
      PrefixedLink: PropTypes.func.isRequired,
    }).isRequired,
    resourceType: PropTypes.string.isRequired,
    tableRows: PropTypes.arrayOf(PropTypes.shape({}))
  };
  static defaultProps = {
    tableRows: []
  };

  render() {
    const { tableRows, resourceType, api } = this.props;
    let columns = topColumns(resourceType, api.ResourceLink, api.PrefixedLink);
    return (
      <BaseTable
        enableFilter={true}
        tableRows={tableRows}
        tableColumns={columns}
        tableClassName="metric-table"
        defaultOrderBy="count"
        defaultOrder="desc"
        size="small" />
    );
  }
}

export default withContext(TopEventTable);
