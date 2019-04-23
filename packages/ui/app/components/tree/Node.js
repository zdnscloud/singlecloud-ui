import React, { Fragment } from 'react';
import { Group } from '@vx/group';

// daemonset deployment statfulset
import IngressIcon from './icons/Ingress';
import PathIcon from './icons/Path';
import ServiceIcon from './icons/Service';
import PodIcon from './icons/Pod';
import DeploymentIcon from './icons/Deployment';
import DaemonSetIcon from './icons/DaemonSet';
import StatefulSetIcon from './icons/StatefulSet';

const separator = '$';

function Node({ node, onClick }) {
  const [type, name] = (node.data.name || '').split(separator);
  const { kind } = node.data;
  const width = 80;
  const height = 40;
  let color = '#40B7E8';
  let fcolor = '#40B7E8';
  let bgcolor = '#fff';
  let Icon = Fragment;
  switch (type) {
    case 'http':
    case 'port':
      Icon = IngressIcon;
      break;
    case 'path':
      Icon = PathIcon;
      break;
    case 'svc':
      Icon = ServiceIcon;
      break;
    case 'pod':
      Icon = PodIcon;
      break;
    case 'deploy':
      if (kind === 'Deployment')
        Icon = DeploymentIcon;
      if (kind === 'DaemonSet')
        Icon = DaemonSetIcon;
      if (kind === 'StatefulSet')
        Icon = StatefulSetIcon;
      break;
  }

  return (
    <Fragment>
      <rect
        height={height}
        width={width}
        y={-height / 2}
        x={-width / 2}
        fill={bgcolor}
        fillOpacity={1}
        stroke={color}
        strokeWidth={0}
        strokeOpacity={1}
        rx={0}
        onClick={onClick}
      />
      <Icon
        fill={fcolor}
        transform={`translate(${-width / 2 + 5}, ${-28/2}) scale(0.025)`}
      />
      <text
        x={-6}
        dy=".33em"
        fontSize={12}
        fontFamily="Arial"
        textAnchor="left"
        style={{ pointerEvents: 'none' }}
        fill={fcolor}
      >
        {type === 'path' ? name : type}
      </text>
    </Fragment>
  );
}

export default Node;
