import React from 'react';
import PropTypes from 'prop-types';
import { linkShape } from '@data-ui/network';

const proptypes = {
  linkStyles: PropTypes.object,
  link: linkShape.isRequired,
};

const defaultProps = {
  linkStyles: {
    stroke: '#F117A0',
    strokeWidth: 1,
    strokeOpacity: 0.5,
    radius: 4,
  },
};

export default function Link({
  linkStyles: { stroke, strokeWidth = 1, strokeOpacity = 1, radius = 4 },
  link,
}) {
  const id = `arrow-id${link.id}`;

  return (
    <g>
      <defs>
        <marker
          id={id}
          markerWidth={radius * 3 + 1}
          markerHeight={radius * 3 + 1}
          refX={radius * 3 + 1}
          refY={radius}
          orient="auto"
          markerUnits="strokeWidth"
        >
          {radius > 0 && (
            <path
              d={`M0,0 L0,${radius * 2} L${radius * 3},${radius} z`}
              fill={stroke}
              opacity={link.opacity || strokeOpacity}
            />
          )}
        </marker>
      </defs>
      <line
        x1={link.sourceX}
        y1={link.sourceY}
        x2={link.targetX}
        y2={link.targetY}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeOpacity={link.opacity || strokeOpacity}
        markerEnd={`url(#${id})`}
      />
    </g>
  );
}

Link.propTypes = proptypes;
Link.defaultProps = defaultProps;
