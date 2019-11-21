import 'whatwg-fetch';

import Message from 'components/Intl/Message';
import messages from '../messages';

import { metricsPropType, processSingleResourceRollup } from './util/MetricUtils.jsx';

import ErrorBanner from './ErrorBanner.jsx';
import MetricsTable from './MetricsTable.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from './util/Spinner.jsx';
import { apiErrorPropType } from './util/ApiHelpers.jsx';
import withREST from './util/withREST.jsx';

export class ResourceListBase extends React.Component {
  static defaultProps = {
    error: null
  }

  static propTypes = {
    data: PropTypes.arrayOf(metricsPropType.isRequired).isRequired,
    error: apiErrorPropType,
    loading: PropTypes.bool.isRequired,
    resource: PropTypes.string.isRequired,
  }

  banner = () => {
    const {error} = this.props;

    if (!error) {
      return;
    }

    return <ErrorBanner message={error} />;
  }

  content = () => {
    const {data, loading, error} = this.props;

    if (loading && !error) {
      return <Spinner />;
    }

    let processedMetrics = [];
    if (data.length === 1) {
      processedMetrics = processSingleResourceRollup(data[0], this.props.resource);
    }

    return (
      <React.Fragment>
        <MetricsTable
          resource={this.props.resource}
          metrics={processedMetrics}
          title={<Message messages={messages} keyName="titleHTTPmetrics" />} />

        {this.props.resource !== "trafficsplit" &&
        <MetricsTable
          resource={this.props.resource}
          isTcpTable={true}
          metrics={processedMetrics}
          title={<Message messages={messages} keyName="titleTCPmetrics" />} />
        }
      </React.Fragment>
    );
  }

  render() {

    return (
      <div className="page-content">
        <div>
          {this.banner()}
          {this.content()}
        </div>
      </div>
    );
  }
}

// When constructing a ResourceList for type "namespace", we query the API for metrics for all namespaces. For all other resource types, we limit our API query to the selectedNamespace.
export default withREST(
  ResourceListBase,
  ({ api, resource, selectedNamespace }) => [api.fetchMetrics(api.urlsForResource(resource, resource === "namespace" ? "all" : selectedNamespace, true))],
  {
    resetProps: ['resource', 'selectedNamespace'],
  },
);
