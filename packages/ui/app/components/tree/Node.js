import React, { Fragment } from 'react';
import { Group } from '@vx/group';

function Node({ node, onClick }) {
  const name = node.data.name;
  const nameLen = name.length;
  const width = nameLen * 12;
  const height = 40;

  return (
    <Fragment>
      <rect
        height={height}
        width={width}
        y={-height / 2}
        x={-width / 2}
        fill="#272b4d"
        stroke={node.data.children ? '#03c0dc' : '#26deb0'}
        strokeWidth={1}
        strokeDasharray={!node.data.children ? '2,2' : '0'}
        strokeOpacity={!node.data.children ? 0.6 : 1}
        rx={!node.data.children ? 10 : 0}
        onClick={onClick}
      />
      <text
        dy=".33em"
        fontSize={16}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={
          node.depth === 0 ? '#f1248e' : node.children ? 'white' : '#26deb0'
        }
      >
        {node.data.name}
      </text>
    </Fragment>
  );
}

export default Node;
