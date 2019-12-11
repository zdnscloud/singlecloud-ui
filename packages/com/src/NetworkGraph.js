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

export {
  Network, networkPropTypes,
  withScreenSize, withParentSize, ParentSize,
  nodeShape, linkShape,
  Node, Nodes,
  Link, Links,
  AtlasForceDirectedLayout,
  WithTooltip, withTooltipPropTypes,
}

const NetworkGraph = ({
  animated,
  ariaLabel,
  width,
  height,
  renderTooltip,
  margin,
  graph,
  onClick,
  renderNode,
  ...rest
}) => {

  return (
    <Network
      {...rest}
      renderTooltip={renderTooltip}
      width={width}
      height={height}
      margin={margin}
      animated={animated}
      ariaLabel={ariaLabel}
      graph={graph}
      onClick={onClick}
      renderNode={renderNode}
      renderLink={DirectedLink}
    />
  );
};

export default NetworkGraph;
