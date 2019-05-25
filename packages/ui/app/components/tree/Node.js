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
import RunningPodIcon from './icons/RunningPod';

const separator = '$';

function Node({ node, onClick }) {
  const [type, name] = (node.data.name || '').split(separator);
  const { kind, state } = node.data;
  const width = 80;
  const height = 70;
  let color = '#40B7E8';
  let fcolor = '#40B7E8';
  let bgcolor = '#fff';
  let Icon = Fragment;
  switch (type) {
    case 'ep':
      Icon = IngressIcon;
      break;
    case 'path':
      Icon = PathIcon;
      break;
    case 'svc':
      Icon = ServiceIcon;
      break;
    case 'pod':
      if (state === 'Running') Icon = RunningPodIcon;
      else Icon = PodIcon;
      break;
    case 'deploy':
      if (kind === 'Deployment') Icon = DeploymentIcon;
      if (kind === 'DaemonSet') Icon = DaemonSetIcon;
      if (kind === 'StatefulSet') Icon = StatefulSetIcon;
      break;
  }
  const l = 20;
  const lname = name.length > l ? `${name.slice(0, l)}...` : name;

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
        transform={`translate(${-width / 3}, ${-height / 2.3}) scale(.8)`}
      />
      <text
        x={-lname.length * 2}
        dy="3.1em"
        fontSize={12}
        fontFamily="Arial"
        textAnchor="center"
        style={{ pointerEvents: 'none' }}
        fill={fcolor}
      >
        {lname}
      </text>
    </Fragment>
  );
}

export default Node;
