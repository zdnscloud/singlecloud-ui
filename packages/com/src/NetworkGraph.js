import React from 'react';
import {
  Network, networkPropTypes,
  withScreenSize, withParentSize, ParentSize,
  nodeShape, linkShape,
  Node, Nodes,
  Link, Links,
  AtlasForceDirectedLayout,
  WithTooltip, withTooltipPropTypes,
} from '@data-ui/network';

import DirectedLink from './NetworkGraph/DirectedLink';
import WorkloadNode from './NetworkGraph/WorkloadNode';

export {
  Network, networkPropTypes,
  withScreenSize, withParentSize, ParentSize,
  nodeShape, linkShape,
  Node, Nodes,
  Link, Links,
  DirectedLink,
  AtlasForceDirectedLayout,
  WithTooltip, withTooltipPropTypes,
};

const NetworkGraph = ({
  graph,
  ...rest
}) => {

  return (
    <Network
      {...rest}
      graph={graph}
    />
  );
};

NetworkGraph.defaultProps = {
  renderNode: WorkloadNode,
  renderLink: DirectedLink,
  renderTooltip({ data }) {
    const { x, y, label } = data;

    return (
      <div>
        {label && (
          <div>
            <strong>{label}</strong>
          </div>
        )}
        <div>
          <strong> data </strong>
          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export default NetworkGraph;
