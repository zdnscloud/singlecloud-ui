import React from 'react';
import PropTypes from 'prop-types';
import { nodeShape } from '@data-ui/network';

import DeploymentIcon from '../TreeGraph/icons/Deployment';
import DaemonSetIcon from '../TreeGraph/icons/DaemonSet';
import StatefulSetIcon from '../TreeGraph/icons/StatefulSet';

const proptypes = {
  nodeStyles: PropTypes.object,
  node: nodeShape.isRequired,
  onMouseMove: PropTypes.func,
  onClick: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

const defaultProps = {
  nodeStyles: {
    fill: '#15aabf',
    stroke: 'none',
    strokeWidth: 0,
    opacity: 0.8,
    defaultSize: 20,
  },
  onMouseMove: null,
  onClick: null,
  onMouseLeave: null,
  onMouseEnter: null,
};

export default function WorkloadNode({
  nodeStyles: { stroke, strokeWidth, fill, opacity, defaultSize },
  node,
  onMouseMove,
  onClick,
  onMouseLeave,
  onMouseEnter,
}) {
  const nodeSize = node.size || defaultSize;
  let NodeComponent;
  let nodeProps = {
    transform: `scale(${0.03 * nodeSize}) translate(-35,-35)`,
  };
  switch (node.kind) {
    case 'Deployment':
      NodeComponent = DeploymentIcon;
      break;
    case 'DaemonSet':
      NodeComponent = DaemonSetIcon;
      break;
    case 'StatefulSet':
      NodeComponent = StatefulSetIcon;
      break;
    default:
      NodeComponent = 'circle';
      nodeProps = {
        r: nodeSize,
        fill: node.fill || fill,
        stroke: node.stroke || stroke,
        strokeWidth,
      };
  }

  return (
    <g opacity={node.opacity || opacity}>
      <NodeComponent
        {...nodeProps}
        onMouseMove={
          onMouseMove &&
          (event => {
            onMouseMove({
              event,
              index: node.index,
              id: node.id,
              data: node,
            });
          })
        }
        onMouseLeave={
          onMouseLeave &&
          (event => {
            onMouseLeave({
              event,
              index: node.index,
              id: node.id,
              data: node,
            });
          })
        }
        onMouseEnter={
          onMouseEnter &&
          (event => {
            onMouseEnter({
              event,
              index: node.index,
              id: node.id,
              data: node,
            });
          })
        }
        onClick={
          onClick &&
          (event => {
            onClick({
              event,
              index: node.index,
              id: node.id,
              data: node,
            });
          })
        }
      />
      <text textAnchor="middle" pointerEvents="none" y={2 * nodeSize}>
        {`${node.label}`}
      </text>
    </g>
  );
}

WorkloadNode.propTypes = proptypes;
WorkloadNode.defaultProps = defaultProps;
