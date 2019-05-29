import React, { createRef, useCallback, useState } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';

const Circle = (props) => {
  const { total, value, ...rest } = props;
  const [rect, setRect] = useState({ width: 300, height: 280 });
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  const { width, height } = rect;
  const radius = Math.min(width, height) * 0.8;
  const centerY = height / 2;
  const centerX = width / 2;
  const data = [
    { label: 'used', value: value },
    { label: 'free', value: total - value },
  ];
  const percent = Math.round(value / total * 100);

  return (
    <div ref={measuredRef} {...rest}>
      <svg width={width} height={height}>
        <Group top={centerY} left={centerX}>
          <Pie
            data={data}
            pieValue={(d) => d.value}
            outerRadius={radius * 0.5}
            innerRadius={radius * 0.42}
            cornerRadius={0}
            padAngle={0}
            pieSort={(n) => true}
          >
            {(pie) => {
              return pie.arcs.map((arc, i) => {
                const { label } = arc.data;
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const { startAngle, endAngle } = arc;
                const hasSpaceForLabel = endAngle - startAngle >= 0.1;
                const fillColor = label === 'used' ? '#40B7E8' : '#eee';
                return (
                  <g key={`usage-${label}-${i}`}>
                    <path d={pie.path(arc)} fill={fillColor} />
                  </g>
                );
              });
            }}
          </Pie>
          <text
            fill={'#40B7E8'}
            x={0}
            y={0}
            dy=".5em"
            fontSize={height / 10}
            textAnchor="middle"
          >
            {`${percent}%`}
          </text>
        </Group>
      </svg>
    </div>
  );
};

export default Circle;
