import React, { Fragment } from 'react';
import { Group } from '@vx/group';

const separator = '$';

function Node({ node, onClick }) {
  const n = (node.data.name || '').split(separator);
  const name = n[1];
  const nameLen = n[0].length;
  const width = 40;
  const height = 40;

  return (
    <Fragment>
      <rect
        height={height}
        width={width}
        y={-height / 2}
        x={-width / 2}
        fill="none"
        fillOpacity={0.5}
        stroke={'#f00'}
        strokeWidth={3}
        strokeDasharray={'2,2'}
        strokeOpacity={1}
        rx={0}
        onClick={onClick}
      />
      <text
        dy=".33em"
        fontSize={16}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={'blue'}
      >
        {name}
      </text>
    </Fragment>
  );
}

export default Node;
